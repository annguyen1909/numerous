/**
 * Admin Payment Management API
 * List, approve, and reject payment requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import { calculatePremiumExpiry, PremiumPlan } from '@/lib/vietqr';

// Admin email list (should be in env variable in production)
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'admin@example.com').split(',');

async function checkIsAdmin(session: any): Promise<boolean> {
  if (!session?.user?.email) return false;
  return ADMIN_EMAILS.includes(session.user.email);
}

// GET: List all payment requests
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(await checkIsAdmin(session))) {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'pending';

    const payments = await prisma.payment.findMany({
      where: status === 'all' ? {} : { status },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            isPremium: true,
            premiumUntil: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    // Convert dates to ISO strings
    const serializedPayments = payments.map((payment: any) => ({
      ...payment,
      createdAt: payment.createdAt.toISOString(),
      updatedAt: payment.updatedAt.toISOString(),
      transactionTime: payment.transactionTime?.toISOString() || null,
      verifiedAt: payment.verifiedAt?.toISOString() || null,
      user: {
        ...payment.user,
        premiumUntil: payment.user.premiumUntil?.toISOString() || null,
      },
    }));

    return NextResponse.json({ payments: serializedPayments });
  } catch (error) {
    console.error('Admin payment list error:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

// POST: Approve or reject payment
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(await checkIsAdmin(session))) {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 });
    }

    const body = await req.json();
    const { paymentId, action } = body; // action: 'approve' or 'reject'

    if (!paymentId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Yêu cầu không hợp lệ' }, { status: 400 });
    }

    // Get payment details
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { user: true },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Không tìm thấy thanh toán' }, { status: 404 });
    }

    if (payment.status !== 'pending') {
      return NextResponse.json(
        { error: 'Thanh toán này đã được xử lý' },
        { status: 400 }
      );
    }

    if (action === 'approve') {
      // Parse payment notes to get plan
      let plan: PremiumPlan = 'monthly';
      try {
        const notes = JSON.parse(payment.notes || '{}');
        plan = notes.plan || 'monthly';
      } catch (e) {
        // Default to monthly if parsing fails
      }

      // Calculate premium expiry
      const premiumUntil = calculatePremiumExpiry(plan);

      // Update user to premium and mark payment as verified
      await prisma.$transaction([
        prisma.user.update({
          where: { id: payment.userId },
          data: {
            isPremium: true,
            premiumUntil,
          },
        }),
        prisma.payment.update({
          where: { id: paymentId },
          data: {
            status: 'verified',
            verifiedAt: new Date(),
            verifiedBy: session.user.email,
          },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: 'Đã duyệt thanh toán. Người dùng đã được nâng cấp lên Premium.',
      });
    } else {
      // Reject payment
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: 'rejected',
          verifiedAt: new Date(),
          verifiedBy: session.user.email,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Đã từ chối thanh toán.',
      });
    }
  } catch (error) {
    console.error('Admin payment action error:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
