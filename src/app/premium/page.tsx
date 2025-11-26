/**
 * Premium Page
 * Trang giới thiệu gói Premium và hướng dẫn thanh toán với QR code
 */

import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import PremiumPaymentForm from '@/components/premium/PremiumPaymentForm';
import { AlertTriangle } from 'lucide-react';

export default async function PremiumPage() {
  const session = await getServerSession(authOptions);
  let userId: string | null = null;
  
  // If user is logged in, check if they're already premium
  if (session?.user) {
    const user = session.user as any;
    userId = user.id;
    
    const userData = await prisma.user.findUnique({
      where: { email: user.email },
      select: { isPremium: true, premiumUntil: true },
    });
    
    // Redirect premium users to dashboard
    if (userData?.isPremium && userData.premiumUntil && userData.premiumUntil > new Date()) {
      redirect('/dashboard?message=already-premium');
    }
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-[#FFAC33] via-amber-500 to-[#FFAC33] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              PREMIUM
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nâng Cấp Lên Premium
          </h1>
          <p className="text-xl md:text-2xl text-amber-50 mb-8">
            Mở khóa toàn bộ tính năng và nhận báo cáo phân tích sâu nhất
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 -mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#fafafa] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>Miễn Phí</h3>
              <p className="text-[#a1a1aa] mb-6">Dùng thử cơ bản</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#fafafa]">0đ</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Tính Thần số học cơ bản
                </li>
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Xem tử vi tổng quan
                </li>
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Phân tích AI ngắn gọn
                </li>
                <li className="flex items-start text-sm text-gray-400">
                  <svg className="w-5 h-5 text-gray-300 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Không có dự đoán 12 tháng
                </li>
                <li className="flex items-start text-sm text-gray-400">
                  <svg className="w-5 h-5 text-gray-300 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Không có file PDF
                </li>
              </ul>
              <Link
                href="/calculator"
                className="block text-center px-6 py-3 border-2 border-[#3f3f46]/40 text-[#fafafa] rounded-lg font-semibold hover:bg-[#27272a]/50 transition-colors"
              >
                Dùng miễn phí
              </Link>
            </div>

            {/* Premium Monthly */}
            <div className="bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-xs font-bold">
                  PHỔ BIẾN NHẤT
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium 1 Tháng</h3>
              <p className="text-purple-100 mb-6">Trải nghiệm đầy đủ</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">199,000đ</span>
                <span className="text-purple-100">/tháng</span>
              </div>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-yellow-300 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Tất cả tính năng Free</strong>
                </li>
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-yellow-300 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Phân tích AI siêu chi tiết (2000+ từ)
                </li>
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-yellow-300 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Dự đoán 12 tháng tới
                </li>
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-yellow-300 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Phân tích tương thích
                </li>
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-yellow-300 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Download PDF chuyên nghiệp
                </li>
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-yellow-300 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Lưu trữ không giới hạn
                </li>
              </ul>
              <a
                href="#payment"
                className="block text-center px-6 py-4 bg-yellow-400 text-purple-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg"
              >
                Chọn gói này
              </a>
            </div>

            {/* Premium Yearly */}
            <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border-2 border-[#FFAC33] rounded-2xl shadow-lg p-8">
              <div className="inline-block mb-2">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                  TIẾT KIỆM 40%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#fafafa] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>Premium 1 Năm</h3>
              <p className="text-[#a1a1aa] mb-6">Giá trị tốt nhất</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#fafafa]">1,199,000đ</span>
                <span className="text-[#a1a1aa]">/năm</span>
                <div className="text-sm text-green-600 font-medium mt-1">
                  Chỉ 99,917đ/tháng
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Tất cả tính năng Premium</strong>
                </li>
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Hỗ trợ ưu tiên 24/7
                </li>
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cập nhật nội dung mới
                </li>
                <li className="flex items-start text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Tư vấn 1-1 với chuyên gia
                </li>
              </ul>
              <a
                href="#payment"
                className="block text-center px-6 py-3 bg-linear-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-bold hover:from-yellow-500 hover:to-orange-600 transition-all shadow-lg"
              >
                Chọn gói này
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Instructions */}
      <section id="payment" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Thanh Toán Qua QR Code
            </h2>
            <p className="text-lg text-[#a1a1aa]">
              Quét mã QR để thanh toán tự động - Nhanh chóng và tiện lợi
            </p>
          </div>
          
          {/* Payment Form Component */}
          {userId ? (
            <PremiumPaymentForm userId={userId} />
          ) : (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-8 text-center">
              <p className="text-lg font-semibold text-yellow-900 mb-4">
                Vui lòng đăng nhập để tiếp tục thanh toán
              </p>
              <Link
                href="/auth/login?callbackUrl=/premium"
                className="inline-block px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg"
              >
                Đăng Nhập Ngay
              </Link>
            </div>
          )}
          
          <div className="text-center mb-12 mt-8">
            <h3 className="text-2xl font-bold text-[#fafafa] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Hoặc Chuyển Khoản Thủ Công
            </h3>
            <p className="text-[#a1a1aa]">
              Nếu không quét được QR, bạn có thể chuyển khoản theo thông tin dưới đây
            </p>
          </div>

          <div className="bg-linear-to-br from-[#6B4BFF]/10 to-[#8B5CF6]/10 rounded-2xl p-8 border border-[#3f3f46]/40 mb-8">
            <h3 className="text-2xl font-bold text-[#fafafa] mb-6 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
              Thông Tin Chuyển Khoản
            </h3>
            <div className="bg-[#27272a]/50 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-[#3f3f46]/30">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#a1a1aa] mb-1">Ngân hàng:</p>
                  <p className="text-lg font-bold text-[#fafafa]">
                    {process.env.NEXT_PUBLIC_BANK_NAME || 'Vietcombank'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#a1a1aa] mb-1">Số tài khoản:</p>
                  <p className="text-lg font-bold text-[#fafafa] font-mono">
                    {process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || '1234567890'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-[#a1a1aa] mb-1">Chủ tài khoản:</p>
                  <p className="text-lg font-bold text-[#fafafa]">
                    {process.env.NEXT_PUBLIC_BANK_ACCOUNT_HOLDER || 'NGUYEN VAN A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
              <p className="text-sm font-semibold text-yellow-900 mb-2">
                <AlertTriangle className="w-4 h-4 inline-block mr-1" />
                Nội dung chuyển khoản:
              </p>
              <p className="text-base font-bold text-yellow-900 font-mono">
                PREMIUM [Email của bạn] [Số điện thoại]
              </p>
              <p className="text-xs text-yellow-800 mt-2">
                Ví dụ: PREMIUM email@example.com 0123456789
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#6B4BFF] to-[#8B5CF6] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-[#fafafa] mb-2">Chuyển khoản</h4>
                <p className="text-[#a1a1aa]">
                  Chuyển khoản theo thông tin trên với nội dung chính xác
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#6B4BFF] to-[#8B5CF6] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-[#fafafa] mb-2">Đăng nhập/Đăng ký</h4>
                <p className="text-[#a1a1aa]">
                  Đăng nhập hoặc đăng ký tài khoản với email đã dùng khi chuyển khoản
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-linear-to-br from-[#6B4BFF] to-[#8B5CF6] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-[#fafafa] mb-2">Chờ xác nhận</h4>
                <p className="text-[#a1a1aa]">
                  Chúng tôi sẽ xác nhận và kích hoạt tài khoản Premium trong vòng 5-10 phút
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-[#fafafa] mb-2">Hoàn tất!</h4>
                <p className="text-[#a1a1aa]">
                  Sử dụng toàn bộ tính năng Premium và nhận báo cáo chi tiết
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/auth/register"
              className="inline-block px-8 py-4 bg-linear-to-r from-[#6B4BFF] to-[#8B5CF6] text-white rounded-lg font-bold text-lg hover:shadow-[0_0_20px_rgba(107,75,255,0.4)] transition-all shadow-lg"
            >
              Đăng Ký Ngay
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#fafafa] mb-12" style={{ fontFamily: 'var(--font-playfair)' }}>
            Câu Hỏi Thường Gặp
          </h2>
          <div className="space-y-6">
            <details className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-lg p-6 shadow-md">
              <summary className="font-bold text-[#fafafa] cursor-pointer">
                Tôi có thể hủy Premium bất cứ lúc nào không?
              </summary>
              <p className="mt-3 text-[#a1a1aa]">
                Có, bạn có thể hủy bất cứ lúc nào. Tuy nhiên, chúng tôi không hoàn tiền cho thời gian chưa sử dụng.
              </p>
            </details>

            <details className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-lg p-6 shadow-md">
              <summary className="font-bold text-[#fafafa] cursor-pointer">
                Mất bao lâu để tài khoản được kích hoạt?
              </summary>
              <p className="mt-3 text-[#a1a1aa]">
                Thường trong vòng 5-10 phút sau khi chuyển khoản thành công. Nếu quá 30 phút, vui lòng liên hệ hỗ trợ.
              </p>
            </details>

            <details className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-lg p-6 shadow-md">
              <summary className="font-bold text-[#fafafa] cursor-pointer">
                Premium khác gì so với miễn phí?
              </summary>
              <p className="mt-3 text-[#a1a1aa]">
                Premium cung cấp phân tích AI chi tiết gấp 3-4 lần, dự đoán 12 tháng, phân tích tương thích, và file PDF chuyên nghiệp.
              </p>
            </details>

            <details className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-lg p-6 shadow-md">
              <summary className="font-bold text-[#fafafa] cursor-pointer">
                Tôi có thể sử dụng cho nhiều người không?
              </summary>
              <p className="mt-3 text-[#a1a1aa]">
                Một tài khoản Premium có thể tạo báo cáo cho nhiều người khác nhau không giới hạn.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
