/**
 * Horoscope (Tử vi) Page
 * Trang xem Tử vi và cung hoàng đạo
 */

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import HoroscopeForm from '@/components/forms/HoroscopeForm';
import ReportCard from '@/components/ui/ReportCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { HoroscopeInput, HoroscopeResult, ApiResponse } from '@/types';
import { Sparkles } from 'lucide-react';

export default function HoroscopePage() {
  const { data: session } = useSession();
  const isPremium = session?.user ? (session.user as any).isPremium || false : false;
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    data: HoroscopeResult;
    content: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: HoroscopeInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/horoscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data: ApiResponse<{ data: HoroscopeResult; content: string }> =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Có lỗi xảy ra khi xem tử vi');
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
            Xem Tử Vi & Cung Hoàng Đạo
          </h1>
          <p className="text-lg text-[#a1a1aa] max-w-3xl mx-auto">
            Khám phá vận mệnh, tình yêu, sự nghiệp qua Tử vi và cung hoàng đạo. Nhận dự đoán chi
            tiết về năm nay và lời khuyên từ chuyên gia.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-lg p-6 lg:sticky lg:top-24">
              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">Nhập Thông Tin</h2>
              <HoroscopeForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-3">
            {isLoading && (
              <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-lg p-12">
                <LoadingSpinner message="Đang xem tử vi cho bạn... Vui lòng đợi trong giây lát." />
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
                  type="horoscope"
                  data={result.data}
                  content={result.content}
                  isPremium={isPremium}
                />
              </div>
            )}

            {!result && !isLoading && !error && (
              <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-12 h-12 text-[#8B5CF6]" />
                </div>
                <h3 className="text-2xl font-bold text-[#fafafa] mb-3">
                  Bắt đầu xem tử vi của bạn
                </h3>
                <p className="text-[#a1a1aa] max-w-md mx-auto">
                  Điền thông tin vào form bên trái để nhận tử vi miễn phí chi tiết về cung hoàng
                  đạo, con giáp và vận mệnh của bạn.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Zodiac Signs Info */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-[#fafafa] mb-8">
            12 Cung Hoàng Đạo
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Bạch Dương', icon: '♈', dates: '21/3 - 19/4' },
              { name: 'Kim Ngưu', icon: '♉', dates: '20/4 - 20/5' },
              { name: 'Song Tử', icon: '♊', dates: '21/5 - 20/6' },
              { name: 'Cự Giải', icon: '♋', dates: '21/6 - 22/7' },
              { name: 'Sư Tử', icon: '♌', dates: '23/7 - 22/8' },
              { name: 'Xử Nữ', icon: '♍', dates: '23/8 - 22/9' },
              { name: 'Thiên Bình', icon: '♎', dates: '23/9 - 22/10' },
              { name: 'Hổ Cáp', icon: '♏', dates: '23/10 - 21/11' },
              { name: 'Nhân Mã', icon: '♐', dates: '22/11 - 21/12' },
              { name: 'Ma Kết', icon: '♑', dates: '22/12 - 19/1' },
              { name: 'Bảo Bình', icon: '♒', dates: '20/1 - 18/2' },
              { name: 'Song Ngư', icon: '♓', dates: '19/2 - 20/3' },
            ].map((sign: { name: string; icon: string; dates: string }) => (
              <div
                key={sign.name}
                className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-2">{sign.icon}</div>
                <div className="font-semibold text-[#fafafa] text-sm">{sign.name}</div>
                <div className="text-xs text-[#a1a1aa] mt-1">{sign.dates}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
