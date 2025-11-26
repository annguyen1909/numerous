/**
 * Example: PDF Export Test Page
 * Test the premium PDF export functionality
 */

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import PremiumPdfButton from '@/components/premium/PremiumPdfButton';

export default async function PdfExportTestPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/test-pdf-export');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      isPremium: true,
      premiumUntil: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  // Treat user as premium if either `isPremium` is true or `premiumUntil` is in the future
  const isPremiumActive = Boolean(user.isPremium) || (user.premiumUntil && new Date(user.premiumUntil) > new Date());

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔮 Tải Báo Cáo Premium PDF
          </h1>
          <p className="text-lg text-gray-600">
            Xuất báo cáo chuyên sâu dạng PDF với thiết kế chuyên nghiệp
          </p>
        </div>

        {/* User Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user.name || 'Người dùng'}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              {isPremiumActive ? (
                <span className="px-4 py-2 bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 font-semibold rounded-full">
                  ✨ Premium Active
                </span>
              ) : (
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                  Free Account
                </span>
              )}
            </div>
          </div>

          {isPremiumActive && user.premiumUntil && (
            <p className="text-sm text-gray-500">
              Premium đến: {new Date(user.premiumUntil).toLocaleDateString('vi-VN')}
            </p>
          )}
        </div>

        {/* Export Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Thần Số Học */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
            <div className="text-4xl mb-4 text-center">🔢</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Thần Số Học
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Phân tích số học, đường đời, sứ mệnh
            </p>
            <PremiumPdfButton
              fullName={user.name || 'Người dùng'}
              birthDate="15/08/1990"
              readingType="thansohoc"
              isPremium={isPremiumActive || undefined}
              className="w-full"
            />
          </div>

          {/* Tử Vi */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
            <div className="text-4xl mb-4 text-center">⭐</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Tử Vi
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Luận giải tử vi, vận mệnh, hung cát
            </p>
            <PremiumPdfButton
              fullName={user.name || 'Người dùng'}
              birthDate="15/08/1990"
              readingType="tuvi"
              isPremium={isPremiumActive || undefined}
              className="w-full"
            />
          </div>

          {/* Chiêu Sinh */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
            <div className="text-4xl mb-4 text-center">🌟</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Chiêu Sinh
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Phân tích ngày sinh, đặc điểm riêng
            </p>
            <PremiumPdfButton
              fullName={user.name || 'Người dùng'}
              birthDate="15/08/1990"
              readingType="chieusinh"
              isPremium={isPremiumActive || undefined}
              className="w-full"
            />
          </div>

          {/* Tính Cách */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-100">
            <div className="text-4xl mb-4 text-center">💫</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Tính Cách
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Phân tích tính cách, điểm mạnh yếu
            </p>
            <PremiumPdfButton
              fullName={user.name || 'Người dùng'}
              birthDate="15/08/1990"
              readingType="tinhcach"
              isPremium={isPremiumActive || undefined}
              className="w-full"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <span>ℹ️</span>
            Lưu ý quan trọng:
          </h4>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Tính năng này chỉ dành cho tài khoản Premium</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Báo cáo PDF sẽ được tạo bằng AI (GPT-4) với nội dung chi tiết</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>File PDF sẽ được lưu trữ vĩnh viễn trên Supabase Storage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Thời gian tạo: 10-30 giây tuỳ độ dài nội dung</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Bạn có thể tải lại báo cáo bất cứ lúc nào từ lịch sử</span>
            </li>
          </ul>
        </div>

        {/* CTA for non-premium users */}
        {!isPremiumActive && (
          <div className="mt-8 text-center">
            <a
              href="/premium"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              <span>✨</span>
              <span>Nâng Cấp Premium Ngay</span>
              <span>→</span>
            </a>
            <p className="text-sm text-gray-600 mt-4">
              Chỉ từ 199.000₫/tháng
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
