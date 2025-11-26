/**
 * Report Detail Page
 * Xem chi tiết báo cáo đã lưu với giao diện đẹp và đầy đủ thông tin
 */

import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import Link from 'next/link';
import ReportCard from '@/components/ui/ReportCard';
import { NumerologyResult, HoroscopeResult } from '@/types';
import { Hash, Star, Sparkles, BarChart3, FileText } from 'lucide-react';

export default async function ReportDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/auth/login');
  }

  const userId = (session.user as any).id;

  // Fetch the report
  const reportData = await prisma.report.findUnique({
    where: { 
      id,
      userId, // Ensure user can only view their own reports
    },
  });

  if (!reportData) {
    notFound();
  }

  // Convert dates to serializable format
  const report = {
    ...reportData,
    createdAt: reportData.createdAt.toISOString(),
  };

  const inputData = report.inputData as any;
  const isPremium = report.reportType === 'premium';

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-[#6B4BFF] hover:text-[#8B5CF6] mb-8 group transition-all"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-semibold">Quay lại Dashboard</span>
        </Link>

        {/* Report Header */}
        <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <div>
                {report.type === 'numerology' ? <Hash className="w-12 h-12 text-[#8B5CF6]" /> : <Star className="w-12 h-12 text-[#FFAC33]" fill="currentColor" />}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#6B4BFF] to-[#8B5CF6] bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {report.type === 'numerology' ? 'Báo Cáo Thần Số Học' : 'Báo Cáo Tử Vi'}
                </h1>
                <p className="text-[#a1a1aa] mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
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
          </div>

          {/* Input Data - Beautiful Display */}
          <div className="bg-linear-to-br from-[#6B4BFF]/10 to-[#8B5CF6]/10 rounded-2xl p-6 border border-[#3f3f46]/40">
            <h3 className="text-lg font-bold text-[#fafafa] mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Thông Tin Của Bạn
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {report.type === 'numerology' && (
                <>
                  <div className="bg-[#27272a]/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-[#3f3f46]/30">
                    <p className="text-xs text-[#8B5CF6] font-semibold mb-1">HỌ VÀ TÊN</p>
                    <p className="font-bold text-[#fafafa] text-lg">{inputData.fullName}</p>
                  </div>
                  <div className="bg-[#27272a]/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-[#3f3f46]/30">
                    <p className="text-xs text-[#8B5CF6] font-semibold mb-1">NGÀY SINH</p>
                    <p className="font-bold text-[#fafafa] text-lg">
                      {new Date(inputData.birthDate).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </>
              )}
              {report.type === 'horoscope' && (
                <>
                  <div className="bg-[#27272a]/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-[#3f3f46]/30">
                    <p className="text-xs text-[#8B5CF6] font-semibold mb-1">NGÀY SINH</p>
                    <p className="font-bold text-[#fafafa] text-lg">
                      {new Date(inputData.birthDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  {inputData.birthTime && (
                    <div className="bg-[#27272a]/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-[#3f3f46]/30">
                      <p className="text-xs text-[#8B5CF6] font-semibold mb-1">GIỜ SINH</p>
                      <p className="font-bold text-[#fafafa] text-lg">{inputData.birthTime}</p>
                    </div>
                  )}
                  {inputData.birthPlace && (
                    <div className="bg-[#27272a]/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-[#3f3f46]/30">
                      <p className="text-xs text-[#8B5CF6] font-semibold mb-1">NƠI SINH</p>
                      <p className="font-bold text-[#fafafa] text-lg">{inputData.birthPlace}</p>
                    </div>
                  )}
                  {inputData.gender && (
                    <div className="bg-[#27272a]/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-[#3f3f46]/30">
                      <p className="text-xs text-[#8B5CF6] font-semibold mb-1">GIỚI TÍNH</p>
                      <p className="font-bold text-[#fafafa] text-lg">
                        {inputData.gender === 'male' ? 'Nam' : 'Nữ'}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Report Content - Using ReportCard Component */}
        <ReportCard
          type={report.type as 'numerology' | 'horoscope'}
          data={report.result as unknown as NumerologyResult | HoroscopeResult}
          content={report.content}
          isPremium={isPremium}
        />

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            href={report.type === 'numerology' ? '/calculator' : '/tu-vi'}
            className="px-8 py-4 bg-linear-to-r from-[#6B4BFF] to-[#8B5CF6] text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(107,75,255,0.4)] transition-all shadow-lg transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5 inline-block mr-2" />
            Tạo Báo Cáo Mới
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-[#1a1a1f]/50 backdrop-blur-sm text-[#fafafa] rounded-xl font-bold hover:bg-[#1a1a1f]/70 transition-all shadow-lg border border-[#3f3f46]/40"
          >
            <BarChart3 className="w-5 h-5 inline-block mr-2" />
            Quay Lại Dashboard
          </Link>
          {isPremium && (
            <Link
              href={`/api/download-report-pdf?reportId=${id}`}
              className="px-8 py-4 bg-linear-to-r from-[#FFAC33] to-[#FF8C33] text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(255,172,51,0.4)] transition-all shadow-lg transform hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-5 h-5 inline-block mr-2" />
              Tải PDF
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
