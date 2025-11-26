/**
 * API Route: Numerology Calculation
 * Tính toán và phân tích Thần số học
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateNumerologyResult } from '@/lib/utils/numerology';
import { generateNumerologyAnalysis } from '@/lib/utils/openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';

// Validation schema
const numerologyInputSchema = z.object({
  fullName: z.string().min(2).max(100),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function POST(request: NextRequest) {
  try {
    // Get user session to check premium status
    const session = await getServerSession(authOptions);
    const isPremium = session?.user ? (session.user as any).isPremium || false : false;

    // Parse and validate input
    const body = await request.json();
    const input = numerologyInputSchema.parse(body);

    // Calculate numerology numbers
    const result = generateNumerologyResult(input);

    // Generate AI analysis (premium or free based on user status)
    const content = await generateNumerologyAnalysis(
      input.fullName,
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
            type: 'numerology',
            reportType: isPremium ? 'premium' : 'free',
            inputData: input,
            result: result,
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
    console.error('Numerology API Error:', error);

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
