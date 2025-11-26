/**
 * Download Report PDF API Route
 * GET /api/download-report-pdf?reportId=xxx
 * Generates PDF from existing saved report and returns as file download
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import { generatePdfBuffer } from '@/lib/pdf/generatePdf';

export async function GET(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Vui lòng đăng nhập để tải báo cáo' },
        { status: 401 }
      );
    }

    // 2. Get reportId from query params
    const searchParams = request.nextUrl.searchParams;
    const reportId = searchParams.get('reportId');

    if (!reportId) {
      return NextResponse.json(
        { error: 'Thiếu mã báo cáo' },
        { status: 400 }
      );
    }

    // 3. Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        isPremium: true,
        premiumUntil: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      );
    }

    // 4. Check Premium status
    const isPremiumActive = Boolean(user.isPremium) || (user.premiumUntil && new Date(user.premiumUntil) > new Date());

    if (!isPremiumActive) {
      return NextResponse.json(
        {
          error: 'Bạn cần nâng cấp Premium để tải báo cáo PDF',
          code: 'PREMIUM_REQUIRED',
        },
        { status: 402 }
      );
    }

    // 5. Fetch the report (ensure it belongs to this user)
    const report = await prisma.report.findUnique({
      where: {
        id: reportId,
      },
    });

    if (!report || report.userId !== user.id) {
      return NextResponse.json(
        { error: 'Không tìm thấy báo cáo hoặc bạn không có quyền truy cập' },
        { status: 404 }
      );
    }

    // 6. Extract data from report
    const inputData = report.inputData as any;
    const fullName = inputData.fullName || inputData.name || 'Khách hàng';
    const birthDate = inputData.birthDate || '';
    
    // Map report type to reading type
    const readingTypeMap: Record<string, string> = {
      'numerology': 'thansohoc',
      'horoscope': 'tuvi',
    };
    const readingType = readingTypeMap[report.type] || 'thansohoc';

    // 7. Generate PDF from report content
    console.log('📄 Generating PDF for report:', reportId);
    
    // Split content into logical sections for better PDF readability
    const contentText = report.content;
    const paragraphs = contentText.split(/\n\n+/);
    
    // Group paragraphs into sections (every 3-4 paragraphs = 1 section)
    const sections: any[] = [];
    let currentSection: string[] = [];
    let sectionCount = 1;
    
    for (let i = 0; i < paragraphs.length; i++) {
      currentSection.push(paragraphs[i]);
      
      // Create a section every 3-4 paragraphs or at the end
      if (currentSection.length >= 3 || i === paragraphs.length - 1) {
        if (currentSection.length > 0) {
          sections.push({
            heading: sectionCount === 1 
              ? 'Phân Tích Tổng Quan' 
              : `Phân Tích Chi Tiết - Phần ${sectionCount}`,
            content: currentSection.join('\n\n'),
          });
          currentSection = [];
          sectionCount++;
        }
      }
    }
    
    // If no sections were created (very short content), create one default section
    if (sections.length === 0) {
      sections.push({
        heading: 'Phân Tích Toàn Diện',
        content: contentText,
      });
    }
    
    // Get result data for additional insights
    const resultData = report.result as any;
    
    // Extract strengths and weaknesses from result if available
    const strengths = resultData?.strengths || [];
    const weaknesses = resultData?.weaknesses || [];
    const career = resultData?.career || [];
    
    // Convert string content to PremiumReadingOutput format
    const contentObject = {
      title: report.type === 'numerology' ? 'Báo Cáo Thần Số Học Premium' : 'Báo Cáo Tử Vi Premium',
      subtitle: `Phân tích chuyên sâu dành riêng cho ${fullName}`,
      sections: sections,
      summary: {
        strengths: strengths.length > 0 ? strengths.slice(0, 5) : [
          'Có khả năng phân tích và tư duy logic tốt',
          'Tiềm năng phát triển trong lĩnh vực chuyên môn',
          'Khả năng thích nghi với môi trường mới'
        ],
        weaknesses: weaknesses.length > 0 ? weaknesses.slice(0, 5) : [
          'Cần cải thiện kỹ năng quản lý thời gian',
          'Đôi khi quá cầu toàn trong công việc',
          'Nên học cách cân bằng giữa công việc và cuộc sống'
        ],
        recommendations: career.length > 0 
          ? [`Các ngành nghề phù hợp: ${career.slice(0, 3).join(', ')}`, 'Tập trung phát triển kỹ năng chuyên môn', 'Xây dựng mạng lưới quan hệ trong lĩnh vực']
          : [
            'Tập trung phát triển điểm mạnh của bản thân',
            'Học hỏi và cải thiện các điểm yếu một cách kiên trì',
            'Luôn giữ thái độ tích cực và cởi mở với cơ hội mới'
          ],
      },
      forecast: {
        year: new Date().getFullYear().toString(),
        predictions: [
          'Năm nay là thời điểm tốt để phát triển bản thân',
          'Có thể gặp nhiều cơ hội mới trong công việc và cuộc sống',
          'Hãy chú ý đến sức khỏe và cân bằng trong mọi khía cạnh'
        ],
      },
      personalizedAdvice: [
        'Hãy tin tưởng vào bản thân và khả năng của mình',
        'Đặt mục tiêu rõ ràng và có kế hoạch cụ thể để đạt được',
        'Luôn học hỏi và phát triển không ngừng',
        'Xây dựng các mối quan hệ tích cực xung quanh bạn'
      ],
    };
    
    const pdfBuffer = await generatePdfBuffer({
      fullName,
      birthDate,
      readingType,
      content: contentObject,
    });

    // 8. Return PDF as downloadable file
    const fileName = `${readingType}_${fullName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
    
    // Convert Buffer to Uint8Array for NextResponse
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error: any) {
    console.error('❌ Download report PDF error:', error);

    return NextResponse.json(
      {
        error: 'Có lỗi xảy ra khi tạo file PDF',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
