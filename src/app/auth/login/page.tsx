/**
 * Login Page
 * Trang đăng nhập
 */

'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  
  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'login-required') {
      setInfoMessage('Vui lòng đăng nhập để tiếp tục');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const callbackUrl = searchParams.get('callbackUrl') || '/';
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-[#6B4BFF] to-[#8B5CF6] rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">TS</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-[#fafafa]">Đăng Nhập</h2>
          <p className="mt-2 text-[#a1a1aa]">Chào mừng bạn quay trở lại!</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-xl p-8">
          {infoMessage && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">{infoMessage}</p>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#fafafa] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#27272a] border border-[#3f3f46] text-[#fafafa] rounded-lg focus:ring-2 focus:ring-[#6B4BFF] focus:border-transparent transition-all"
                placeholder="example@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#fafafa] mb-2">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#27272a] border border-[#3f3f46] text-[#fafafa] rounded-lg focus:ring-2 focus:ring-[#6B4BFF] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-linear-to-r from-[#6B4BFF] to-[#8B5CF6] text-white font-semibold rounded-lg hover:from-[#8B5CF6] hover:to-[#6B4BFF] focus:outline-none focus:ring-2 focus:ring-[#6B4BFF] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#3f3f46]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1a1a1f] text-[#a1a1aa]">Hoặc</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#a1a1aa]">
              Chưa có tài khoản?{' '}
              <Link href="/auth/register" className="font-medium text-[#6B4BFF] hover:text-[#8B5CF6]">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-[#a1a1aa] hover:text-[#fafafa]">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
