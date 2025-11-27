/**
 * Export PDF API Route
 * POST /api/export-pdf
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import { generatePremiumReading } from '@/lib/openai/generatePremiumReading';
import { generatePdfBuffer } from '@/lib/pdf/generatePdf';
import { uploadPdfToSupabase } from '@/lib/supabase/storage';
import { logPdfExport } from '@/lib/supabase/database';
import { z } from 'zod';

export const runtime = 'nodejs';
export const maxDuration = 60;

// Input validation schema
const ExportPdfSchema = z.object({
  fullName: z.string().min(1, 'Họ tên không được để trống'),
  birthDate: z.string().min(1, 'Ngày sinh không được để trống'),
  readingType: z.enum(['thansohoc', 'tuvi', 'chieusinh', 'tinhcach'], {
    message: 'Loại báo cáo không hợp lệ',
  }),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Vui lòng đăng nhập để sử dụng tính năng này' },
        { status: 401 }
      );
    }

    // 2. Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
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

    // 3. Check Premium status
    // Treat user as premium if either `isPremium` is true OR `premiumUntil` is in the future
    const isPremiumActive = Boolean(user.isPremium) || (user.premiumUntil && new Date(user.premiumUntil) > new Date());

    if (!isPremiumActive) {
      return NextResponse.json(
        {
          error: 'Bạn cần nâng cấp Premium để tải báo cáo PDF chuyên sâu',
          code: 'PREMIUM_REQUIRED',
        },
        { status: 402 } // Payment Required
      );
    }

    // 4. Parse and validate request body
    const body = await request.json();
    const validation = ExportPdfSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Dữ liệu không hợp lệ',
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { fullName, birthDate, readingType } = validation.data;

    // 5. Generate premium reading content using OpenAI
    console.log('🤖 Generating premium reading content...');
    const premiumContent = await generatePremiumReading({
      fullName,
      birthDate,
      readingType,
    });

    // 6. Generate PDF from content
    console.log('📄 Generating PDF...');
    if (process.env.PDF_DEBUG === '1') {
      const sec = Array.isArray(premiumContent.sections) ? premiumContent.sections.length : 0;
      const heads = (premiumContent.sections || []).slice(0, 6).map((s: any, i: number) => `${i+1}. ${(s.heading||'').toString().slice(0,60)}`);
      console.log('[PDF_DEBUG] content sections=', sec, 'headings=', heads);
    }
    const pdfBuffer = await generatePdfBuffer({
      fullName,
      birthDate,
      readingType,
      content: premiumContent,
      minPages: 8,
      brandName: 'Numerous Premium'
    });

    // 7. Upload PDF to Supabase Storage
    console.log('☁️ Uploading to Supabase Storage...');
    const { fileUrl, filePath } = await uploadPdfToSupabase(
      pdfBuffer,
      user.id,
      readingType
    );

    // 8. Log export to database
    console.log('💾 Logging to database...');
    await logPdfExport({
      user_id: user.id,
      reading_type: readingType,
      file_url: fileUrl,
      file_path: filePath,
      full_name: fullName,
      birth_date: birthDate,
    });

    // 9. Return download URL
    return NextResponse.json({
      success: true,
      downloadUrl: fileUrl,
      fileName: `${readingType}_${fullName}_${Date.now()}.pdf`,
      message: 'Báo cáo PDF đã được tạo thành công',
    });
  } catch (error: any) {
    console.error('❌ Export PDF error:', error);

    // Handle specific errors
    if (error.message?.includes('OpenAI')) {
      return NextResponse.json(
        { error: 'Lỗi khi tạo nội dung báo cáo. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    if (error.message?.includes('Supabase') || error.message?.includes('upload')) {
      return NextResponse.json(
        { error: 'Lỗi khi lưu trữ file. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Có lỗi xảy ra khi tạo báo cáo PDF',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// GET method to retrieve user's PDF export history
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Vui lòng đăng nhập' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Không tìm thấy người dùng' },
        { status: 404 }
      );
    }

    // Get user's PDF exports from Supabase
    const { getUserPdfExports } = await import('@/lib/supabase/database');
    const exports = await getUserPdfExports(user.id);

    return NextResponse.json({
      success: true,
      exports,
    });
  } catch (error: any) {
    console.error('Get exports error:', error);
    return NextResponse.json(
      { error: 'Không thể lấy danh sách báo cáo' },
      { status: 500 }
    );
  }
}
