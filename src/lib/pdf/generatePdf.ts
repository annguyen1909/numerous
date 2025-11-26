/**
 * PDF Template Generator using PDFKit
 * Creates beautiful, professional PDF reports
 */

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs/promises';
// fontkit is required by pdf-lib to embed custom TTF fonts
// install with: npm install @pdf-lib/fontkit
import fontkit from '@pdf-lib/fontkit';
import type { PremiumReadingOutput } from '../openai/generatePremiumReading';

export interface PdfGeneratorInput {
  fullName: string;
  birthDate: string;
  readingType: string;
  content: PremiumReadingOutput;
}

function splitLines(text: string, maxChars = 95) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxChars) {
      lines.push(current.trim());
      current = w;
    } else {
      current = (current + ' ' + w).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

export async function generatePdfBuffer(input: PdfGeneratorInput): Promise<Buffer> {
  const { fullName, birthDate, readingType, content } = input;

  const pdfDoc = await PDFDocument.create();

  // register fontkit so pdf-lib can embed custom TTF fonts
  try {
    pdfDoc.registerFontkit(fontkit as any);
  } catch (err) {
    throw new Error('pdf-lib fontkit registration failed. Ensure @pdf-lib/fontkit is installed: npm install @pdf-lib/fontkit');
  }

  // Attempt to embed a Unicode TTF (recommended for Vietnamese).
  // Try local fonts first, otherwise fetch from remote GitHub fonts.
  async function loadFontBytes(localPath: string, remoteUrl: string) {
    try {
      const b = await fs.readFile(localPath);
      return b;
    } catch (e) {
      // fallback to fetch remote
      try {
        const res = await fetch(remoteUrl);
        if (!res.ok) throw new Error(`Failed to fetch font: ${res.status}`);
        const ab = await res.arrayBuffer();
        return Buffer.from(ab);
      } catch (err) {
        return null;
      }
    }
  }

  let fontRegular: any;
  let fontBold: any;

  const regularBytes = await loadFontBytes(
    './src/lib/pdf/fonts/NotoSans-Regular.ttf',
    'https://raw.githubusercontent.com/google/fonts/main/ofl/notosans/NotoSans-Regular.ttf'
  );
  const boldBytes = await loadFontBytes(
    './src/lib/pdf/fonts/NotoSans-Bold.ttf',
    'https://raw.githubusercontent.com/google/fonts/main/ofl/notosans/NotoSans-Bold.ttf'
  );

  if (!regularBytes || !boldBytes) {
    throw new Error('Missing Unicode TTF fonts for PDF generation. Add NotoSans TTFs to src/lib/pdf/fonts or allow outbound fetch to GitHub.');
  }

  try {
    fontRegular = await pdfDoc.embedFont(regularBytes);
    fontBold = await pdfDoc.embedFont(boldBytes);
  } catch (e) {
    throw new Error('Failed to embed Unicode fonts into PDF: ' + String(e));
  }

  // Page sizes (A4 in points)
  const pageWidth = 595.28;
  const pageHeight = 841.89;

  // Helper to add a new page with white background
  function addPage(): any {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: rgb(1, 1, 1) });
    return page;
  }

  // --- Professional Cover Page ---
  const cover = addPage();
  const brandColor = rgb(0.36, 0.18, 0.85); // deep purple

  // Large centered title block
  const title = content.title || `${readingType.toUpperCase()} Report`;
  const subtitle = content.subtitle || `Dành riêng cho ${fullName}`;

  cover.drawRectangle({ x: 0, y: pageHeight - 220, width: pageWidth, height: 220, color: brandColor });
  cover.drawText(title.toUpperCase(), { x: 60, y: pageHeight - 100, size: 32, font: fontBold, color: rgb(1, 1, 1), maxWidth: pageWidth - 120 });
  cover.drawText(subtitle, { x: 60, y: pageHeight - 138, size: 14, font: fontRegular, color: rgb(0.95, 0.95, 0.95) });

  // Small info block
  cover.drawText(`Người nhận: ${fullName}`, { x: 60, y: pageHeight - 170, size: 12, font: fontRegular, color: rgb(0.95, 0.95, 0.95) });
  cover.drawText(`Ngày sinh: ${birthDate}`, { x: 60, y: pageHeight - 188, size: 12, font: fontRegular, color: rgb(0.95, 0.95, 0.95) });

  // Add a tasteful divider and created date
  cover.drawRectangle({ x: 60, y: pageHeight - 202, width: pageWidth - 120, height: 1, color: rgb(0.85, 0.85, 0.85) });
  cover.drawText(`Báo cáo được tạo: ${new Date().toLocaleDateString('vi-VN')}`, { x: 60, y: 40, size: 10, font: fontRegular, color: rgb(0.6, 0.6, 0.6) });

  // --- Placeholder TOC (we will insert real TOC after building content) ---
  const tocPage = addPage();
  tocPage.drawText('Mục Lục', { x: 60, y: pageHeight - 80, size: 20, font: fontBold, color: brandColor });
  // keep entries array to fill later
  const tocEntries: { title: string; pageIndex: number }[] = [];

  // --- Content Pages ---
  let page = addPage();
  let y = pageHeight - 60;

  function ensureSpace(lines = 1) {
    if (y - lines * 18 < 80) {
      page = addPage();
      y = pageHeight - 60;
    }
  }

  // Draw section helper
  function drawSectionHeading(p: any, heading: string) {
    ensureSpace(2);
    p.drawText(heading, { x: 60, y: y, size: 18, font: fontBold, color: brandColor });
    y -= 26;
  }

  function drawParagraph(p: any, text: string) {
    if (!text || text.trim() === '') return;
    
    // Split by double newlines for paragraphs, single newlines for sentences
    const paras = text.split(/\n\n+/);
    for (const para of paras) {
      if (!para.trim()) continue;
      
      // Handle single newlines within paragraph
      const sentences = para.split('\n').filter((s: string) => s.trim());
      for (const sentence of sentences) {
        const lines = splitLines(sentence, 85);
        for (const line of lines) {
          ensureSpace(1);
          p.drawText(line, { x: 60, y: y, size: 11, font: fontRegular, color: rgb(0.08, 0.12, 0.15), maxWidth: pageWidth - 120 });
          y -= 16;
        }
      }
      // Extra spacing between paragraphs
      y -= 6;
    }
  }

  // Track page numbers for sections
  if (content.sections && content.sections.length > 0) {
    for (const section of content.sections) {
      // Record TOC entry (page index is zero-based)
      const currentPageIndex = pdfDoc.getPageCount();
      tocEntries.push({ title: section.heading, pageIndex: currentPageIndex });

      ensureSpace(3);
      drawSectionHeading(page, section.heading);
      drawParagraph(page, section.content || '');

      if (section.highlights && section.highlights.length > 0) {
        ensureSpace(section.highlights.length + 2);
        y -= 6;
        for (const h of section.highlights) {
          const hLines = splitLines(`• ${h}`, 80);
          for (const hLine of hLines) {
            ensureSpace(1);
            page.drawText(hLine, { x: 72, y: y, size: 11, font: fontBold, color: rgb(0.28, 0.06, 0.55) });
            y -= 16;
          }
        }
        y -= 6;
      }

      y -= 12;
    }
  }

  // Summary page with two columns (only if there's real data)
  const hasStrengths = content.summary?.strengths && content.summary.strengths.length > 0 && content.summary.strengths[0] !== 'Xem chi tiết trong báo cáo';
  const hasWeaknesses = content.summary?.weaknesses && content.summary.weaknesses.length > 0 && content.summary.weaknesses[0] !== 'Xem chi tiết trong báo cáo';
  const hasRecommendations = content.summary?.recommendations && content.summary.recommendations.length > 0 && content.summary.recommendations[0] !== 'Xem chi tiết trong báo cáo';
  const hasForecast = content.forecast?.predictions && content.forecast.predictions.length > 0 && content.forecast.predictions[0] !== 'Xem chi tiết trong báo cáo web';
  const hasAdvice = content.personalizedAdvice && content.personalizedAdvice.length > 0 && content.personalizedAdvice[0] !== 'Tham khảo nội dung phân tích chi tiết trong báo cáo';

  if (hasStrengths || hasWeaknesses || hasRecommendations || hasForecast || hasAdvice) {
    page = addPage();
    y = pageHeight - 80;
    page.drawText('Bảng Tổng Hợp', { x: 60, y: y, size: 20, font: fontBold, color: brandColor });
    y -= 30;

    const leftX = 60;
    const rightX = pageWidth / 2 + 10;

    // strengths on left
    if (hasStrengths) {
      page.drawText('Điểm Mạnh', { x: leftX, y: y, size: 14, font: fontBold, color: rgb(0, 0.45, 0.3) });
      let sy = y - 22;
      for (const s of content.summary.strengths) {
        const sLines = splitLines(`✓ ${s}`, 45);
        for (const sLine of sLines) {
          page.drawText(sLine, { x: leftX + 10, y: sy, size: 11, font: fontRegular, color: rgb(0.08, 0.12, 0.15) });
          sy -= 15;
        }
      }
    }

    // weaknesses on right
    if (hasWeaknesses) {
      page.drawText('Điểm Yếu', { x: rightX, y: y, size: 14, font: fontBold, color: rgb(0.7, 0.15, 0.15) });
      let wy = y - 22;
      for (const w of content.summary.weaknesses) {
        const wLines = splitLines(`• ${w}`, 45);
        for (const wLine of wLines) {
          page.drawText(wLine, { x: rightX + 10, y: wy, size: 11, font: fontRegular, color: rgb(0.08, 0.12, 0.15) });
          wy -= 15;
        }
      }
    }

    y -= 180;

    // Forecast section
    if (hasForecast) {
      if (y < 150) { page = addPage(); y = pageHeight - 80; }
      page.drawText(`Dự Báo ${content.forecast.year}`, { x: 60, y: y, size: 14, font: fontBold, color: rgb(0.1, 0.35, 0.8) });
      y -= 22;
      for (const ptext of content.forecast.predictions) {
        const pLines = splitLines(`→ ${ptext}`, 80);
        for (const pLine of pLines) {
          page.drawText(pLine, { x: 72, y: y, size: 11, font: fontRegular, color: rgb(0.08, 0.12, 0.15) });
          y -= 15;
          if (y < 100) { page = addPage(); y = pageHeight - 80; }
        }
      }
      y -= 12;
    }

    // Recommendations and personalized advice
    if (hasRecommendations) {
      if (y < 100) { page = addPage(); y = pageHeight - 80; }
      page.drawText('Lời Khuyên', { x: 60, y: y, size: 14, font: fontBold, color: rgb(0.48, 0.29, 0.88) });
      y -= 20;
      for (const r of content.summary.recommendations) {
        const rLines = splitLines(`★ ${r}`, 80);
        for (const rLine of rLines) {
          page.drawText(rLine, { x: 72, y: y, size: 11, font: fontRegular, color: rgb(0.08, 0.12, 0.15) });
          y -= 15;
          if (y < 100) { page = addPage(); y = pageHeight - 80; }
        }
      }
      y -= 12;
    }

    if (hasAdvice) {
      if (y < 100) { page = addPage(); y = pageHeight - 80; }
      for (const a of content.personalizedAdvice) {
        const aLines = splitLines(`» ${a}`, 80);
        for (const aLine of aLines) {
          page.drawText(aLine, { x: 72, y: y, size: 11, font: fontRegular, color: rgb(0.08, 0.12, 0.15) });
          y -= 15;
          if (y < 100) { page = addPage(); y = pageHeight - 80; }
        }
      }
    }
  }

  // Thank you page
  const thank = addPage();
  thank.drawText('Cảm Ơn Bạn', { x: 60, y: pageHeight - 240, size: 28, font: fontBold, color: brandColor });
  thank.drawText('Hy vọng báo cáo này mang lại giá trị và hướng đi cho bạn.', { x: 60, y: pageHeight - 280, size: 12, font: fontRegular, color: rgb(0.2, 0.25, 0.33) });

  // --- Fill TOC page with entries and page numbers ---
  if (tocEntries.length > 0) {
    const tocPdfPage = pdfDoc.getPage(1);
    let tocY = pageHeight - 120;
    for (const e of tocEntries) {
      const entryText = `${e.title}`;
      tocPdfPage.drawText(entryText, { x: 70, y: tocY, size: 12, font: fontRegular, color: rgb(0.08, 0.12, 0.15) });
      const pageNumText = String(e.pageIndex + 1);
      tocPdfPage.drawText(pageNumText, { x: pageWidth - 80, y: tocY, size: 12, font: fontRegular, color: rgb(0.5, 0.5, 0.5) });
      tocY -= 18;
      if (tocY < 100) break; // Avoid overflow
    }
  } else {
    // If no sections, add a note on TOC page
    const tocPdfPage = pdfDoc.getPage(1);
    tocPdfPage.drawText('Nội dung báo cáo bắt đầu từ trang tiếp theo', { x: 70, y: pageHeight - 120, size: 12, font: fontRegular, color: rgb(0.5, 0.5, 0.5) });
  }

  // --- Page numbers footer for all pages ---
  const total = pdfDoc.getPageCount();
  for (let i = 0; i < total; i++) {
    const p = pdfDoc.getPage(i);
    p.drawText(`${i + 1} / ${total}`, { x: pageWidth - 100, y: 30, size: 10, font: fontRegular, color: rgb(0.6, 0.6, 0.6) });
  }

  const uint8Array = await pdfDoc.save();
  return Buffer.from(uint8Array);
}
