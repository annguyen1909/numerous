/**
 * HTML-based PDF generation using headless Chromium (puppeteer-core + @sparticuz/chromium)
 * Produces a full HTML-styled report with proper typography, spacing, and page breaks.
 */

import type { PremiumReadingOutput } from '../openai/generatePremiumReading';
import fs from 'fs';
import os from 'os';
import path from 'path';

export interface PdfGeneratorInput {
  fullName: string;
  birthDate: string;
  readingType: string;
  content: PremiumReadingOutput;
  // Optional: minimum total pages target (A4). Premium default: 8
  minPages?: number;
  // Optional brand note in header/footer
  brandName?: string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function paragraphize(text: string): string {
  if (!text) return '';
  const blocks = text.split(/\n\n+/);
  const html: string[] = [];
  for (const block of blocks) {
    const lines = block.split('\n').filter((l) => l.trim().length > 0);
    const isList = lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l.trim()));
    if (isList) {
      html.push('<ul>');
      for (const l of lines) {
        const item = l.replace(/^[-*]\s+/, '');
        html.push(`<li>${escapeHtml(item)}</li>`);
      }
      html.push('</ul>');
    } else {
      const safe = escapeHtml(lines.join(' '));
      html.push(`<p>${safe}</p>`);
    }
  }
  return html.join('\n');
}

function countWords(text: string): number {
  if (!text) return 0;
  return (text.match(/\b\w+\b/g) || []).length;
}

function buildHtml(input: PdfGeneratorInput): string {
  const { fullName, birthDate, readingType, content } = input;
  const title = content.title || `${readingType.toUpperCase()} Report`;
  const subtitle = content.subtitle || `Dành riêng cho ${fullName}`;

  // Ensure we have enough sections to reach ~8 pages total
  // Pages: cover(1) + TOC(1) + summary(1) + thank-you(1) + sections(N)
  const MIN_TOTAL_PAGES = Math.max(4, input.minPages ?? 8);
  const BASE_PAGES = 4; // cover, toc, summary, thank-you
  const requiredSections = Math.max(3, MIN_TOTAL_PAGES - BASE_PAGES);

  function expandSections(sections: { heading?: string; content?: string; highlights?: string[] }[]): { heading: string; content: string; highlights?: string[] }[] {
    const result: { heading: string; content: string; highlights?: string[] }[] = [];
    const safeSections = sections && sections.length > 0 ? sections : [{ heading: 'Phân Tích Tổng Quan', content: '' }];
    // Collect all text
    const allText = safeSections.map((s) => s.content || '').join('\n\n');
    const paragraphs = allText.split(/\n\n+/).filter((p) => p.trim().length > 0);

    // Seed existing sections first
    for (const s of safeSections) {
      result.push({ heading: s.heading || 'Phân Tích', content: s.content || '', highlights: s.highlights });
    }

    // Derive additional sections by grouping paragraphs into chunks
    let idx = 0;
    const themes = [
      'Chi Tiết Tính Cách',
      'Mối Quan Hệ & Giao Tiếp',
      'Sự Nghiệp & Định Hướng',
      'Sức Khỏe & Cân Bằng',
      'Tài Chính & Kế Hoạch',
      'Phát Triển Bản Thân',
      'Mục Tiêu Dài Hạn',
    ];
    while (result.length < requiredSections) {
      const chunk = paragraphs.slice(idx, idx + 3);
      idx += 3;
      if (chunk.length === 0) {
        // If we ran out, reuse earlier paragraphs in smaller slices
        const reuse = paragraphs.slice(0, Math.min(2, paragraphs.length));
        if (reuse.length === 0) reuse.push('Nội dung bổ sung: phân tích chi tiết dựa trên dữ liệu hiện có.');
        const theme = themes[(result.length - safeSections.length) % themes.length];
        result.push({ heading: theme, content: reuse.join('\n\n') });
      } else {
        const theme = themes[(result.length - safeSections.length) % themes.length];
        result.push({ heading: theme, content: chunk.join('\n\n') });
      }
    }
    return result;
  }

  const preparedSections = expandSections(content.sections || []);

  // Filler generator to improve depth and continuity
  const fillerBase = `Phân tích mở rộng: Từ góc độ thực hành, mỗi con số và đặc điểm cá nhân đều mang một phổ ảnh hưởng đa chiều trong cuộc sống. Khi bạn áp dụng hiểu biết này một cách chủ động, bạn sẽ nhận thấy các mô thức lặp lại, cơ hội tăng trưởng và cách cân bằng nội lực để tiến xa hơn. Hãy ghi chú lại các điểm chính, thử nghiệm từng bước nhỏ và phản tư định kỳ để điều chỉnh chiến lược phù hợp với thực tế của bạn.`;
  let fillerSeq = 1;
  const makeFillerParagraph = () => {
    const n = fillerSeq++;
    return `${fillerBase}\n\nGợi ý thực hành ${n}: Xác định một thói quen cốt lõi có ảnh hưởng lan tỏa (ví dụ: quản lý thời gian, giao tiếp chủ động, hoặc ưu tiên giấc ngủ). Theo dõi tiến trình trong 14 ngày, đo lường 2-3 chỉ số thực tế (năng lượng, tập trung, kết quả) và rút ra bài học điều chỉnh.`;
  };

  // 1) First, ensure the first few core sections are not too short
  const MIN_WORDS_FIRST_SECTIONS = 320; // target depth for early sections
  const FIRST_SECTIONS_TO_ENSURE = Math.min(4, preparedSections.length);
  for (let i = 0; i < FIRST_SECTIONS_TO_ENSURE; i++) {
    let w = countWords(preparedSections[i].content || '');
    while (w < MIN_WORDS_FIRST_SECTIONS) {
      const add = makeFillerParagraph();
      preparedSections[i].content = `${preparedSections[i].content ? preparedSections[i].content + '\n\n' : ''}${add}`;
      w = countWords(preparedSections[i].content || '');
    }
  }

  // 2) Then ensure minimum total words to better meet minPages visually.
  // Approx words per A4 page (with margins, headings, lists): ~550.
  const targetWords = Math.max(0, (MIN_TOTAL_PAGES - BASE_PAGES)) * 550;
  let currentWords = countWords(preparedSections.map(s => s.content || '').join(' '));
  if (currentWords < targetWords) {
    const extraSections: { heading: string; content: string }[] = [];
    let extraIndex = 1;
    while (currentWords < targetWords && extraIndex <= 24) {
      const contentText = [makeFillerParagraph(), makeFillerParagraph(), makeFillerParagraph()].join('\n\n');
      extraSections.push({ heading: `Phân Tích Mở Rộng ${extraIndex}`, content: contentText });
      currentWords += countWords(contentText);
      extraIndex++;
    }
    if (extraSections.length === 1) {
      // If only a single extra section, remove the numeric suffix
      extraSections[0].heading = 'Phân Tích Mở Rộng';
    }
    if (extraSections.length) {
      preparedSections.push(...extraSections);
    }
  }

  // If a section is about personalized advice but empty/short, populate from advice list
  const ADVICE_KEYWORDS = [/lời khuyên/i, /cá nhân hóa/i, /ca nhan hoa/i];
  for (let i = 0; i < preparedSections.length; i++) {
    const h = preparedSections[i].heading || '';
    const isAdviceSection = ADVICE_KEYWORDS.some((re) => re.test(h));
    if (isAdviceSection) {
      const w = countWords(preparedSections[i].content || '');
      if (w < 60) {
        // Build bullet list from advice array we compute below
        // We'll convert bullets to text; paragraphize will render as <ul>
        // Placeholder; content replaced after advice array is defined
        preparedSections[i].content = '__INJECT_ADVICE__';
      }
    }
  }

  let sectionsHtml = '';
  // sectionsHtml is built after advice computation below so we can inject advice list

  const summary = content.summary || { strengths: [], weaknesses: [], recommendations: [] };
  const forecast = content.forecast || { year: '', predictions: [] };
  let advice = content.personalizedAdvice || [];
  // Ensure personalized advice has enough items for a premium feel
  const adviceFallbackPool = [
    'Thiết lập thói quen phản tư 10 phút mỗi ngày để tối ưu quyết định.',
    'Xây dựng hệ thống theo dõi tiến trình với chỉ số đơn giản và nhất quán.',
    'Dành thời gian bảo dưỡng năng lượng: ngủ đủ, vận động nhẹ, thư giãn chủ động.',
    'Gắn mục tiêu dài hạn với các mốc ngắn hạn đo đếm được theo tuần.',
    'Áp dụng nguyên tắc 80/20: tập trung vào việc tạo tác động lớn nhất.',
    'Giữ nhật ký học hỏi để biến trải nghiệm thành tri thức có thể tái sử dụng.',
  ];
  while (advice.length < 6 && adviceFallbackPool.length) {
    advice.push(adviceFallbackPool.shift()!);
  }

  const summaryHtml = `
    <section class="page-break">
      <h2>Bảng Tổng Hợp</h2>
      <div class="grid two">
        <div>
          <h3 class="green">Điểm Mạnh</h3>
          <ul>${(summary.strengths || []).map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
        </div>
        <div>
          <h3 class="red">Điểm Yếu</h3>
          <ul>${(summary.weaknesses || []).map((w) => `<li>${escapeHtml(w)}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="grid one">
        <div>
          <h3 class="purple">Lời Khuyên</h3>
          <ul>${(summary.recommendations || []).map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
        </div>
      </div>
      ${forecast.predictions && forecast.predictions.length > 0
        ? `<div class="grid one"><div><h3 class="blue">Dự Báo ${escapeHtml(forecast.year || '')}</h3><ul>${forecast.predictions
            .map((p) => `<li>${escapeHtml(p)}</li>`) 
            .join('')}</ul></div></div>`
        : ''}
      ${advice.length > 0
        ? `<div class="grid one"><div><h3>Cá Nhân Hóa</h3><ul>${advice
            .map((a) => `<li>${escapeHtml(a)}</li>`) 
            .join('')}</ul></div></div>`
        : ''}
    </section>`;

  const tocHtml = (preparedSections || [])
    .map((s, i) => `<li><span class="dot"></span> ${escapeHtml(s.heading || `Mục ${i + 1}`)}</li>`)
    .join('');

  // Try to load external CSS; fallback to minimal internal if missing
  let externalCss = '';
  try {
    const cssPath = path.join(process.cwd(), 'src', 'lib', 'pdf', 'styles', 'premium.css');
    if (fs.existsSync(cssPath)) {
      externalCss = fs.readFileSync(cssPath, 'utf8');
    }
  } catch {}

  return `<!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Lora:wght@500;600;700&display=swap" rel="stylesheet" />
    <style>${externalCss}</style>
    <title>${escapeHtml(title)}</title>
  </head>
  <body>
    <div class="container">
      <div class="cover">
        <div class="hero">
          <h1 class="title">${escapeHtml(title)}</h1>
          <div class="subtitle">${escapeHtml(subtitle)}</div>
          <div class="meta">Người nhận: ${escapeHtml(fullName)} • Ngày sinh: ${escapeHtml(birthDate)}</div>
          <div class="meta">Tạo ngày: ${escapeHtml(new Date().toLocaleDateString('vi-VN'))}</div>
        </div>
      </div>
      <section class="toc">
        <h2>Mục Lục</h2>
        <ul class="toc-list">${tocHtml}</ul>
      </section>
      ${(() => {
        // Now that we have advice array, replace any placeholders
        const injectAdviceText = advice.length
          ? advice.map((a) => `- ${a}`).join('\n')
          : '- Thiết lập thói quen phản tư ngắn mỗi ngày.\n- Theo dõi tiến trình với chỉ số đơn giản.\n- Bảo dưỡng năng lượng: ngủ, vận động, thư giãn.';
        const finalSections = preparedSections.map((s, idx) => {
          const contentText = (s.content === '__INJECT_ADVICE__') ? injectAdviceText : (s.content || '');
          return `
            <section class="section avoid-break spaced">
              <h2>${escapeHtml(s.heading || `Mục ${idx + 1}`)}</h2>
              <div class="prose">${paragraphize(contentText)}</div>
              ${s.highlights && s.highlights.length > 0
                ? `<div class="card spaced"><h3>Điểm nổi bật</h3><ul>${s.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ul></div>`
                : ''}
            </section>`;
        }).join('\n');
        return finalSections;
      })()}
      ${summaryHtml}
      <section class="page-break">
        <h2>Cảm Ơn Bạn</h2>
        <div class="card spaced">
          <p>Hy vọng báo cáo này mang lại giá trị và hướng đi cho bạn.</p>
          <div class="muted">© ${new Date().getFullYear()} Numerous — Premium Insights</div>
        </div>
      </section>
    </div>
  </body>
  </html>`;
}

export async function generatePdfBuffer(input: PdfGeneratorInput): Promise<Buffer> {
  const html = buildHtml(input);

  // Dynamically import to avoid bundling on edge
  const { default: chromium } = await import('@sparticuz/chromium');
  const { default: puppeteer } = await import('puppeteer-core');

  function exists(p: string | undefined) {
    return p && typeof p === 'string' && fs.existsSync(p) ? p : undefined;
  }

  function resolveLocalExecutable(): string | undefined {
    if (process.env.PUPPETEER_EXECUTABLE_PATH) return exists(process.env.PUPPETEER_EXECUTABLE_PATH);
    if (process.env.CHROME_PATH) return exists(process.env.CHROME_PATH);
    const platform = process.platform;
    if (platform === 'win32') {
      const candidates = [
        'C\\\u005c\u005cProgram Files\\\u005c\u005cGoogle\\\u005c\u005cChrome\\\u005c\u005cApplication\\\u005c\u005cchrome.exe'.replace(/\\\\/g, '\\\\'),
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      ];
      for (const c of candidates) {
        if (fs.existsSync(c)) return c;
      }
      return undefined;
    }
    if (platform === 'darwin') {
      const candidates = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      ];
      for (const c of candidates) {
        if (fs.existsSync(c)) return c;
      }
      return undefined;
    }
    // linux
    const candidates = [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) return c;
    }
    return undefined;
  }

  const isServerless = Boolean(process.env.AWS_REGION || process.env.VERCEL);
  const PDF_DEBUG = process.env.PDF_DEBUG === '1';
  let launchOptions: any;

  if (isServerless) {
    const exec = await chromium.executablePath();
    launchOptions = {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: exec,
      headless: chromium.headless,
    };
  } else {
    const localExec = resolveLocalExecutable();
    if (!localExec) {
      throw new Error('Could not find a local Chrome/Chromium executable. Set CHROME_PATH or PUPPETEER_EXECUTABLE_PATH.');
    }
    launchOptions = {
      executablePath: localExec,
      headless: 'new',
    };
  }

  if (PDF_DEBUG) {
    try {
      const tmpDir = os.tmpdir();
      const htmlPath = path.join(tmpDir, `pdf-debug-${Date.now()}.html`);
      fs.writeFileSync(htmlPath, html, 'utf8');
      // Log a concise summary to help diagnose missing content
      const sectionCount = (input.content?.sections || []).length;
      const words = html.split(/\s+/).length;
      console.log(`[PDF_DEBUG] minPages=${input.minPages ?? 8} sectionsIn=${sectionCount} htmlWords≈${words} htmlFile=${htmlPath}`);
    } catch (e) {
      console.warn('[PDF_DEBUG] Failed to write debug HTML:', e);
    }
  }

  const browser = await puppeteer.launch(launchOptions);

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const brand = input.brandName || 'Numerous Premium';
    const headerTemplate = `
      <div style="width:100%; font-family: Inter, Arial, sans-serif; font-size:10px; color:#6b7280; padding:4mm 8mm; display:flex; justify-content:space-between; align-items:center;">
        <span>${brand}</span>
        <span></span>
      </div>`;
    const footerTemplate = `
      <div style="width:100%; font-family: Inter, Arial, sans-serif; font-size:10px; color:#6b7280; padding:4mm 8mm; display:flex; justify-content:space-between; align-items:center;">
        <span>© ${new Date().getFullYear()} Numerous</span>
        <span class="pageNumber"></span>/<span class="totalPages"></span>
      </div>`;

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '16mm', bottom: '16mm', left: '12mm', right: '12mm' },
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
      preferCSSPageSize: true,
    });
    const buffer = Buffer.from(pdf);
    if (PDF_DEBUG && !isServerless) {
      try {
        const tmpDir = os.tmpdir();
        const pdfPath = path.join(tmpDir, `pdf-debug-${Date.now()}.pdf`);
        fs.writeFileSync(pdfPath, buffer);
        console.log(`[PDF_DEBUG] pdfSize=${buffer.length} bytes pdfFile=${pdfPath}`);
      } catch (e) {
        console.warn('[PDF_DEBUG] Failed to write debug PDF:', e);
      }
    }
    return buffer;
  } finally {
    await browser.close();
  }
}
