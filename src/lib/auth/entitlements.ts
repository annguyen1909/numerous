import { prisma } from '@/lib/db/prisma';

export const FREE_DAILY_LIMIT = 3;

export interface Entitlements {
  isPremiumActive: boolean;
  dailyLimit: number | null; // null means unlimited
  usedToday: number;
  remainingToday: number | null; // null means unlimited
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function computeEntitlements(userId: string): Promise<Entitlements> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isPremium: true, premiumUntil: true },
  });

  const isPremiumActive = !!(user?.isPremium || (user?.premiumUntil && new Date(user.premiumUntil) > new Date()));

  let usedToday = 0;
  if (userId) {
    usedToday = await prisma.report.count({
      where: {
        userId,
        createdAt: { gte: startOfToday() },
      },
    });
  }

  if (isPremiumActive) {
    return {
      isPremiumActive,
      dailyLimit: null,
      usedToday,
      remainingToday: null,
    };
  }

  const remaining = Math.max(0, FREE_DAILY_LIMIT - usedToday);
  return {
    isPremiumActive,
    dailyLimit: FREE_DAILY_LIMIT,
    usedToday,
    remainingToday: remaining,
  };
}

export async function assertWithinDailyQuota(userId: string) {
  const ent = await computeEntitlements(userId);
  if (!ent.isPremiumActive && ent.dailyLimit !== null && ent.usedToday >= ent.dailyLimit) {
    const err: any = new Error('FREE_DAILY_LIMIT_REACHED');
    err.code = 'FREE_DAILY_LIMIT_REACHED';
    err.status = 429;
    err.remainingToday = 0;
    return Promise.reject(err);
  }
  return ent;
}
