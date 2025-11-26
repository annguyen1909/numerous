/**
 * User Dashboard
 * Bảng điều khiển người dùng - xem báo cáo đã lưu và thông tin tài khoản
 */

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import Link from 'next/link';
import PremiumBadge from '@/components/ui/PremiumBadge';
import LogoutButton from '@/components/ui/LogoutButton';
import { Hash, Star, Sparkles, BookOpen, Crown, ClipboardList } from 'lucide-react';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/auth/login');
  }
  
  const params = await searchParams;
  const message = params.message;
  
  // Check if user has pending payments
  const hasPendingPayment = await prisma.payment.findFirst({
    where: {
      userId: (session.user as any).id,
      status: 'pending',
    },
  });

  const user = session.user as any;

  // Fetch user data from database
  const userDataRaw = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      reports: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      payments: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });

  if (!userDataRaw) {
    redirect('/auth/login');
  }

  // Convert dates to serializable format
  const userData = {
    ...userDataRaw,
    createdAt: userDataRaw.createdAt.toISOString(),
    updatedAt: userDataRaw.updatedAt.toISOString(),
    premiumUntil: userDataRaw.premiumUntil?.toISOString() || null,
    reports: userDataRaw.reports.map((r: { createdAt: { toISOString: () => any; }; }) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    })),
    payments: userDataRaw.payments.map((p: any) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      transactionTime: p.transactionTime?.toISOString() || null,
      verifiedAt: p.verifiedAt?.toISOString() || null,
    })),
  };

  // Stats
  const totalReports = await prisma.report.count({
    where: { userId: userData.id },
  });

  const numerologyReports = await prisma.report.count({
    where: { userId: userData.id, type: 'numerology' },
  });

  const horoscopeReports = await prisma.report.count({
    where: { userId: userData.id, type: 'horoscope' },
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#fafafa]">Bảng Điều Khiển</h1>
          <p className="text-[#a1a1aa] mt-2">Quản lý tài khoản và xem báo cáo của bạn</p>
        </div>

        {/* Premium User Message */}
        {message === 'already-premium' && (
          <div className="mb-6 p-4 bg-green-500/10 border-2 border-green-500/30 rounded-lg flex items-center space-x-3">
            <span className="text-2xl">✓</span>
            <div>
              <p className="font-semibold text-green-300">Bạn đã là thành viên Premium!</p>
              <p className="text-sm text-green-200">
                Bạn đang sử dụng đầy đủ tất cả tính năng Premium của chúng tôi.
              </p>
            </div>
          </div>
        )}
        
        {/* Pending Payment Notification */}
        {hasPendingPayment && (
          <div className="mb-6 p-4 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg flex items-center space-x-3">
            <span className="text-2xl">⏳</span>
            <div className="flex-1">
              <p className="font-semibold text-blue-300">Yêu cầu thanh toán đang chờ xử lý</p>
              <p className="text-sm text-blue-200">
                Chúng tôi đang xác minh thanh toán của bạn. Bạn sẽ được nâng cấp lên Premium trong vòng 5-10 phút.
              </p>
            </div>
          </div>
        )}

        {/* User Info Card */}
        <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-linear-to-br from-[#6B4BFF] to-[#8B5CF6] rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {userData.name?.charAt(0).toUpperCase() || userData.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#fafafa]">{userData.name || 'Người dùng'}</h2>
                <p className="text-[#a1a1aa]">{userData.email}</p>
                <div className="mt-2 flex items-center space-x-2">
                  {userData.isPremium ? (
                    <>
                      <PremiumBadge size="md" />
                      {userData.premiumUntil && (
                        <span className="text-sm text-[#a1a1aa]">
                          Đến {new Date(userData.premiumUntil).toLocaleDateString('vi-VN')}
                        </span>
                      )}
                    </>
                  ) : (
                    <Link
                      href="/premium"
                      className="px-4 py-2 bg-linear-to-r from-[#FFAC33] to-amber-500 text-white rounded-lg font-semibold hover:from-amber-500 hover:to-amber-600 transition-all shadow-md text-sm"
                    >
                      Nâng cấp Premium
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#a1a1aa] mb-1">Tổng Báo Cáo</p>
                <p className="text-3xl font-bold text-[#6B4BFF]">{totalReports}</p>
              </div>
              <div className="w-12 h-12 bg-[#6B4BFF]/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#6B4BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#a1a1aa] mb-1">Thần Số Học</p>
                <p className="text-3xl font-bold text-[#8B5CF6]">{numerologyReports}</p>
              </div>
              <div className="w-12 h-12 bg-[#8B5CF6]/20 rounded-lg flex items-center justify-center">
                <Hash className="w-6 h-6 text-[#8B5CF6]" />
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#a1a1aa] mb-1">Tử Vi</p>
                <p className="text-3xl font-bold text-[#FFAC33]">{horoscopeReports}</p>
              </div>
              <div className="w-12 h-12 bg-[#FFAC33]/20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-[#FFAC33]" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-[#fafafa] mb-4">Thao Tác Nhanh</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/calculator"
              className="p-4 border-2 border-[#3f3f46]/40 rounded-lg hover:border-[#6B4BFF] hover:bg-[#6B4BFF]/10 transition-all group"
            >
              <Sparkles className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform text-[#6B4BFF]" />
              <p className="font-bold text-[#fafafa]">Thần Số Học</p>
              <p className="text-xs text-[#a1a1aa] mt-1">Tính toán mới</p>
            </Link>

            <Link
              href="/tu-vi"
              className="p-4 border-2 border-[#3f3f46]/40 rounded-lg hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all group"
            >
              <Star className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform text-[#FFAC33]" fill="currentColor" />
              <p className="font-bold text-[#fafafa]">Tử Vi</p>
              <p className="text-xs text-[#a1a1aa] mt-1">Xem tử vi mới</p>
            </Link>

            <Link
              href="/blog"
              className="p-4 border-2 border-[#3f3f46]/40 rounded-lg hover:border-[#FFAC33] hover:bg-[#FFAC33]/10 transition-all group"
            >
              <BookOpen className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform text-[#8B5CF6]" />
              <p className="font-semibold text-[#fafafa]">Blog</p>
              <p className="text-xs text-[#a1a1aa] mt-1">Đọc bài viết</p>
            </Link>

            {!userData.isPremium ? (
              <Link
                href="/premium"
                className="p-4 border-2 border-[#FFAC33] bg-[#FFAC33]/10 rounded-lg hover:bg-[#FFAC33]/20 transition-all group"
              >
                <Star className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform text-[#FFAC33]" fill="currentColor" />
                <p className="font-semibold text-[#fafafa]">Premium</p>
                <p className="text-xs text-[#a1a1aa] mt-1">Nâng cấp tài khoản</p>
              </Link>
            ) : (
              <div className="p-4 border-2 border-[#6B4BFF] bg-[#6B4BFF]/10 rounded-lg">
                <Crown className="w-8 h-8 mb-2 text-[#FFAC33]" />
                <p className="font-semibold text-[#fafafa]">Premium Active</p>
                <p className="text-xs text-[#a1a1aa] mt-1">Bạn đã là thành viên Premium</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-[#fafafa] mb-4">Báo Cáo Gần Đây</h3>
          {userData.reports.length > 0 ? (
            <div className="space-y-3">
              {userData.reports.map((report: any) => (
                <div
                  key={report.id}
                  className="p-4 border border-[#3f3f46]/40 rounded-lg hover:border-[#6B4BFF] hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xl">
                          {report.type === 'numerology' ? <Hash className="w-5 h-5" /> : <Star className="w-5 h-5" fill="currentColor" />}
                        </span>
                        <span className="font-semibold text-[#fafafa]">
                          {report.type === 'numerology' ? 'Thần Số Học' : 'Tử Vi'}
                        </span>
                        {report.reportType === 'premium' && <PremiumBadge size="sm" />}
                      </div>
                      <p className="text-sm text-[#a1a1aa]">
                        {new Date(report.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                    <Link
                      href={`/reports/${report.id}`}
                      className="px-4 py-2 bg-[#6B4BFF] text-white rounded-lg font-medium hover:bg-[#8B5CF6] transition-colors text-sm"
                    >
                      Xem lại
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ClipboardList className="w-16 h-16 mb-4 mx-auto text-[#6B4BFF]" />
              <p className="text-[#a1a1aa] mb-4">Bạn chưa có báo cáo nào</p>
              <Link
                href="/calculator"
                className="inline-block px-6 py-3 bg-[#6B4BFF] text-white rounded-lg font-semibold hover:bg-[#8B5CF6] transition-colors"
              >
                Tạo báo cáo đầu tiên
              </Link>
            </div>
          )}
        </div>

        {/* Payment History (if any) */}
        {userData.payments.length > 0 && (
          <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-[#fafafa] mb-4">Lịch Sử Thanh Toán</h3>
            <div className="space-y-3">
              {userData.payments.map((payment: any) => (
                <div
                  key={payment.id}
                  className="p-4 border border-[#3f3f46]/40 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-[#fafafa]">
                      {payment.amount.toLocaleString('vi-VN')} VNĐ
                    </p>
                    <p className="text-sm text-[#a1a1aa]">
                      {new Date(payment.createdAt).toLocaleString('vi-VN')}
                    </p>
                    {payment.transactionId && (
                      <p className="text-xs text-[#a1a1aa]/70 mt-1">
                        Mã GD: {payment.transactionId}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      payment.status === 'verified'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {payment.status === 'verified'
                      ? '✓ Đã xác nhận'
                      : payment.status === 'rejected'
                      ? '✗ Từ chối'
                      : '⏳ Đang xử lý'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
