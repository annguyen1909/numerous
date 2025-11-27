/**
 * API Route: Horoscope Calculation
 * Tính toán và phân tích Tử vi
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateHoroscope } from '@/lib/utils/horoscope';
import { generateHoroscopeAnalysis } from '@/lib/utils/openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import { assertWithinDailyQuota, computeEntitlements } from '@/lib/auth/entitlements';

// Validation schema
const horoscopeInputSchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Get user session and entitlements
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id as string | undefined;
    let isPremium = false;
    if (userId) {
      try {
        const ent = await computeEntitlements(userId);
        isPremium = ent.isPremiumActive;
        await assertWithinDailyQuota(userId);
      } catch (e: any) {
        if (e?.code === 'FREE_DAILY_LIMIT_REACHED') {
          return NextResponse.json(
            {
              success: false,
              error: 'Bạn đã dùng hết lượt tạo miễn phí hôm nay.',
              code: e.code,
            },
            { status: 429 }
          );
        }
        throw e;
      }
    }

    // Parse and validate input
    const body = await request.json();
    const input = horoscopeInputSchema.parse(body);

    // Calculate horoscope
    const result = calculateHoroscope(input);

    // Generate AI analysis (premium or free based on user status)
    const content = await generateHoroscopeAnalysis(
      input.birthDate,
      result,
      isPremium
    );

    // Save report to database if user is logged in
    let reportId = null;
    if (session?.user) {
      try {
        const report = await prisma.report.create({
          data: {
            userId: (session.user as any).id,
            type: 'horoscope',
            reportType: isPremium ? 'premium' : 'free',
            inputData: input as any,
            result: result as any,
            content: content,
          },
        });
        reportId = report.id;
      } catch (error) {
        console.error('Error saving report:', error);
        // Continue even if save fails
      }
    }

    // Return results
    return NextResponse.json({
      success: true,
      data: {
        data: result,
        content,
        reportId,
      },
    });
  } catch (error) {
    console.error('Horoscope API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dữ liệu không hợp lệ',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại sau.',
      },
      { status: 500 }
    );
  }
}
