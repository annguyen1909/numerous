/**
 * Numerology Calculator Page
 * Trang tính Thần số học
 */

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import CalculatorForm from '@/components/forms/CalculatorForm';
import ReportCard from '@/components/ui/ReportCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { FormSkeleton } from '@/components/ui/LoadingSkeleton';
import { NumerologyInput, NumerologyResult, ApiResponse } from '@/types';
import { BarChart3, Target, Lock, Zap } from 'lucide-react';

export default function CalculatorPage() {
  const { data: session } = useSession();
  const isPremium = session?.user ? (session.user as any).isPremium || false : false;
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    data: NumerologyResult;
    content: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: NumerologyInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/numerology', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data: ApiResponse<{ data: NumerologyResult; content: string }> =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Có lỗi xảy ra khi tính toán');
      }

      if (data.data) {
        setResult(data.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra. Vui lòng thử lại.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4">
            Tính Thần Số Học
          </h1>
          <p className="text-lg text-[#a1a1aa] max-w-3xl mx-auto">
            Khám phá bí mật cuộc đời qua các con số. Nhập thông tin của bạn để nhận báo cáo chi
            tiết về tính cách, điểm mạnh, điểm yếu, và con đường phù hợp.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-lg p-6 lg:sticky lg:top-24">
              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">Nhập Thông Tin</h2>
              {isLoading ? (
                <FormSkeleton />
              ) : (
                <CalculatorForm onSubmit={handleSubmit} isLoading={isLoading} />
              )}
              <p className="mt-4 text-sm text-[#a1a1aa]">
                Lưu ý: Tên đầy đủ không dấu, ngày sinh định dạng YYYY-MM-DD.
              </p>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-3">
            {isLoading && (
              <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-lg p-12">
                <LoadingSpinner message="Đang phân tích thông tin của bạn... Vui lòng đợi trong giây lát." />
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-red-400 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-red-300 mb-2">Có lỗi xảy ra</h3>
                    <p className="text-red-200">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Thử lại
                    </button>
                  </div>
                </div>
              </div>
            )}

            {result && !isLoading && (
              <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-lg p-6">
                <ReportCard
                  type="numerology"
                  data={result.data}
                  content={result.content}
                  isPremium={isPremium}
                />
              </div>
            )}

            {!result && !isLoading && !error && (
              <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 bg-[#6B4BFF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-12 h-12 text-[#6B4BFF]" />
                </div>
                <h3 className="text-2xl font-bold text-[#fafafa] mb-3">
                  Bắt đầu phân tích của bạn
                </h3>
                <p className="text-[#a1a1aa] max-w-md mx-auto">
                  Điền thông tin vào form bên trái để nhận báo cáo Thần số học miễn phí chi tiết về
                  con số và cuộc đời của bạn.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-[#6B4BFF]/20 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-[#6B4BFF]" />
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-2">Chính Xác Cao</h3>
            <p className="text-sm text-[#a1a1aa]">
              Sử dụng phương pháp Pythagorean chuẩn quốc tế kết hợp với AI để phân tích chi tiết.
            </p>
          </div>

          <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-[#6B4BFF]/20 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-[#6B4BFF]" />
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-2">Bảo Mật</h3>
            <p className="text-sm text-[#a1a1aa]">
              Thông tin của bạn được mã hóa và bảo mật tuyệt đối. Chúng tôi không chia sẻ với bên
              thứ ba.
            </p>
          </div>

          <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-[#FFAC33]/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#FFAC33]" />
            </div>
            <h3 className="text-lg font-bold text-[#fafafa] mb-2">Nhanh Chóng</h3>
            <p className="text-sm text-[#a1a1aa]">
              Nhận kết quả ngay lập tức. AI phân tích và tạo báo cáo trong vài giây.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
