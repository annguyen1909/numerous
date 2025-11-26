/**
 * Register Page
 * Trang đăng ký tài khoản mới
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Đăng ký thất bại');
      }

      // Try to sign in automatically after registering
      try {
        const signInResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        } as any);

        // If sign in succeeded, go to dashboard
        if (signInResult && (signInResult as any).ok) {
          router.push('/dashboard');
          return;
        }
      } catch (err) {
        // ignore and fallback to login page
      }

      // Fallback: Redirect to login page
      router.push('/auth/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
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
          <h2 className="text-3xl font-bold text-[#fafafa]">Đăng Ký</h2>
          <p className="mt-2 text-[#a1a1aa]">Tạo tài khoản để bắt đầu hành trình khám phá</p>
        </div>

        {/* Register Form */}
        <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#fafafa] mb-2">
                Họ và tên
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#27272a] border border-[#3f3f46] text-[#fafafa] rounded-lg focus:ring-2 focus:ring-[#6B4BFF] focus:border-transparent transition-all"
                placeholder="Nguyễn Văn A"
              />
            </div>

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
              <p className="mt-1 text-xs text-[#a1a1aa]">Tối thiểu 6 ký tự</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#fafafa] mb-2">
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? 'Đang đăng ký...' : 'Đăng Ký'}
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

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#a1a1aa]">
              Đã có tài khoản?{' '}
              <Link href="/auth/login" className="font-medium text-[#6B4BFF] hover:text-[#8B5CF6]">
                Đăng nhập
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
