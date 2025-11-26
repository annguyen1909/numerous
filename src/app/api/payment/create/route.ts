/**
 * Create Payment Request API
 * User submits payment confirmation after bank transfer
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const paymentSchema = z.object({
  transactionId: z.string().min(1, 'Mã giao dịch không được để trống'),
  transactionTime: z.string().datetime('Thời gian giao dịch không hợp lệ'),
  transferNote: z.string().min(1, 'Nội dung chuyển khoản không được để trống'),
  amount: z.number().positive('Số tiền phải lớn hơn 0'),
  plan: z.enum(['monthly', 'yearly']),
  screenshotUrl: z.string().url().optional().or(z.literal('')),
});

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Vui lòng đăng nhập để tiếp tục' },
        { status: 401 }
      );
    }

    const user = session.user as any;

    // Check if user is already premium
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { isPremium: true, premiumUntil: true },
    });

    if (userData?.isPremium && userData.premiumUntil && userData.premiumUntil > new Date()) {
      return NextResponse.json(
        { error: 'Bạn đã là thành viên Premium' },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = paymentSchema.parse(body);

    // Check for duplicate transaction ID
    const existingPayment = await prisma.payment.findFirst({
      where: {
        transactionId: validatedData.transactionId,
        status: { in: ['pending', 'verified'] },
      },
    });

    if (existingPayment) {
      return NextResponse.json(
        { error: 'Mã giao dịch này đã được sử dụng' },
        { status: 400 }
      );
    }

    // Verify transfer note contains user ID
    const expectedNote = `PREMIUM-${user.id.substring(0, 8).toUpperCase()}`;
    if (!validatedData.transferNote.includes(user.id.substring(0, 8).toUpperCase())) {
      return NextResponse.json(
        { error: 'Nội dung chuyển khoản không chính xác. Vui lòng sử dụng nội dung được cung cấp.' },
        { status: 400 }
      );
    }

    // Create payment request
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        transactionId: validatedData.transactionId,
        transactionTime: new Date(validatedData.transactionTime),
        amount: validatedData.amount,
        bankName: 'Chuyển khoản QR',
        status: 'pending',
        notes: JSON.stringify({
          plan: validatedData.plan,
          transferNote: validatedData.transferNote,
          screenshotUrl: validatedData.screenshotUrl || null,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Yêu cầu thanh toán đã được gửi. Chúng tôi sẽ xác nhận trong vòng 5-10 phút.',
      paymentId: payment.id,
    });
  } catch (error) {
    console.error('Payment creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
