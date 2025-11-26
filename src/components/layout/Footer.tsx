/**
 * Footer Component
 * Chân trang với thông tin liên hệ, thông tin chuyển khoản và social links
 */

import Link from 'next/link';
import Image from 'next/image';
import { Lightbulb } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Thông tin ngân hàng (sẽ lấy từ env)
  const bankInfo = {
    bankName: process.env.NEXT_PUBLIC_BANK_NAME || 'Vietcombank',
    accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || '1234567890',
    accountHolder: process.env.NEXT_PUBLIC_BANK_ACCOUNT_HOLDER || 'NGUYEN VAN A',
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Về chúng tôi */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/logo.png" alt="Thần Số Học" width={80} height={80} className="w-20 h-20 object-contain shrink-0" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Khám phá bí mật cuộc đời qua Thần số học và Tử vi. Nhận báo cáo chi tiết và tư vấn
              chuyên sâu từ chuyên gia.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-purple-400 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Thần số học
                </Link>
              </li>
              <li>
                <Link href="/tu-vi" className="text-sm hover:text-purple-400 transition-colors">
                  Tử vi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-sm hover:text-purple-400 transition-colors">
                  Gói Premium
                </Link>
              </li>
            </ul>
          </div>

          {/* Thông tin thanh toán */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Thông tin thanh toán</h4>
            <div className="bg-gray-800 rounded-lg p-4 space-y-2">
              <div>
                <p className="text-xs text-gray-400">Ngân hàng:</p>
                <p className="text-sm font-medium text-white">{bankInfo.bankName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Số tài khoản:</p>
                <p className="text-sm font-medium text-white font-mono">{bankInfo.accountNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Chủ tài khoản:</p>
                <p className="text-sm font-medium text-white">{bankInfo.accountHolder}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              <Lightbulb className="w-4 h-4 inline-block mr-1" />
              Ghi nội dung CK: Email + Số điện thoại
            </p>
          </div>

          {/* Liên hệ & Social */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-400 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:nguyentruongan0919@gmail.com"
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  nguyentruongan0919@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-400 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm">0905941752</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="text-white font-semibold mb-3 text-sm">Theo dõi chúng tôi</h5>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="Zalo"
                >
                  <span className="text-xs font-bold">Z</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Thần Số Học. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-purple-400">
                Chính sách bảo mật
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-purple-400">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
