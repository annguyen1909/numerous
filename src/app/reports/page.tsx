/**
 * All Reports Page
 * Trang hiển thị tất cả báo cáo của người dùng
 */

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import Link from 'next/link';
import PremiumBadge from '@/components/ui/PremiumBadge';
import { Hash, Star, ClipboardList } from 'lucide-react';

export default async function ReportsPage() {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/auth/login?message=login-required&callbackUrl=/reports');
  }

  const user = session.user as any;

  // Fetch all user reports
  const reportsData = await prisma.report.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  // Convert dates to serializable format
  const reports = reportsData.map((report: any) => ({
    ...report,
    createdAt: report.createdAt.toISOString(),
  }));

  const userData = await prisma.user.findUnique({
    where: { email: user.email },
    select: { isPremium: true },
  });

  const isPremium = userData?.isPremium || false;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#fafafa]">Tất Cả Báo Cáo</h1>
              <p className="text-[#a1a1aa] mt-2">Xem và quản lý các báo cáo đã lưu của bạn</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-[#6B4BFF] text-white rounded-lg font-medium hover:bg-[#8B5CF6] transition-colors"
            >
              ← Dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md p-6">
            <p className="text-sm text-[#a1a1aa] mb-1">Tổng Báo Cáo</p>
            <p className="text-3xl font-bold text-[#6B4BFF]">{reports.length}</p>
          </div>
          <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md p-6">
            <p className="text-sm text-[#a1a1aa] mb-1">Thần Số Học</p>
            <p className="text-3xl font-bold text-[#8B5CF6]">
                {reports.filter((r: any) => r.type === 'numerology').length}
            </p>
          </div>
          <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md p-6">
            <p className="text-sm text-[#a1a1aa] mb-1">Tử Vi</p>
            <p className="text-3xl font-bold text-[#FFAC33]">
              {reports.filter((r: any) => r.type === 'horoscope').length}
            </p>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md p-6">
          {reports.length > 0 ? (
            <div className="space-y-3">
              {reports.map((report: any) => (
                <div
                  key={report.id}
                  className="p-4 border border-[#3f3f46]/40 rounded-lg hover:border-[#6B4BFF] hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">
                          {report.type === 'numerology' ? <Hash className="w-5 h-5" /> : <Star className="w-5 h-5" fill="currentColor" />}
                        </span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-[#fafafa]">
                              {report.type === 'numerology' ? 'Thần Số Học' : 'Tử Vi'}
                            </span>
                            {report.reportType === 'premium' && <PremiumBadge size="sm" />}
                          </div>
                          <p className="text-sm text-[#a1a1aa]">
                            {new Date(report.createdAt).toLocaleString('vi-VN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      {/* Show preview of input data */}
                      <div className="text-xs text-[#a1a1aa]/70 mt-2">
                        {report.type === 'numerology' && report.inputData && (() => {
                          const data = typeof report.inputData === 'string' 
                            ? JSON.parse(report.inputData) 
                            : report.inputData;
                          return <span>Tên: {(data as any).fullName || 'N/A'}</span>;
                        })()}
                        {report.type === 'horoscope' && report.inputData && (() => {
                          const data = typeof report.inputData === 'string' 
                            ? JSON.parse(report.inputData) 
                            : report.inputData;
                          return <span>Ngày sinh: {(data as any).birthDate || 'N/A'}</span>;
                        })()}
                      </div>
                    </div>
                    <Link
                      href={`/reports/${report.id}`}
                      className="px-4 py-2 bg-[#6B4BFF] text-white rounded-lg font-medium hover:bg-[#8B5CF6] transition-colors text-sm"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ClipboardList className="w-16 h-16 mb-4 mx-auto text-[#6B4BFF]" />
              <p className="text-[#a1a1aa] mb-4">Bạn chưa có báo cáo nào</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/calculator"
                  className="inline-block px-6 py-3 bg-[#6B4BFF] text-white rounded-lg font-semibold hover:bg-[#8B5CF6] transition-colors"
                >
                  Tạo báo cáo Thần Số Học
                </Link>
                <Link
                  href="/tu-vi"
                  className="inline-block px-6 py-3 bg-[#8B5CF6] text-white rounded-lg font-semibold hover:bg-[#6B4BFF] transition-colors"
                >
                  Tạo báo cáo Tử Vi
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* CTA for non-premium users */}
        {!isPremium && reports.length > 0 && (
          <div className="mt-8 bg-linear-to-r from-[#FFAC33] to-amber-500 rounded-2xl shadow-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Nâng Cấp Premium Ngay Hôm Nay
            </h3>
            <p className="text-white/90 mb-6">
              Nhận phân tích AI chi tiết hơn, dự đoán 12 tháng và nhiều tính năng khác
            </p>
            <Link
              href="/premium"
              className="inline-block px-8 py-4 bg-white text-[#FFAC33] rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Xem Gói Premium
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
