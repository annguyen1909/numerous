/**
 * Admin Premium Management Page
 * View and approve/reject premium payment requests
 */

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminPaymentsList from '@/components/admin/AdminPaymentsList';

// Admin email list
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'admin@example.com').split(',');

async function checkIsAdmin(email: string): Promise<boolean> {
  return ADMIN_EMAILS.includes(email);
}

export default async function AdminPremiumPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/auth/login?callbackUrl=/admin/premium');
  }

  const isAdmin = await checkIsAdmin(session.user.email);
  if (!isAdmin) {
    redirect('/?error=unauthorized');
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#fafafa]" style={{ fontFamily: 'var(--font-playfair)' }}>Quản Lý Premium</h1>
              <p className="text-[#a1a1aa] mt-2">
                Duyệt và quản lý các yêu cầu nâng cấp Premium
              </p>
            </div>
            <a
              href="/dashboard"
              className="px-4 py-2 bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 text-[#fafafa] rounded-lg font-medium hover:bg-[#27272a]/50 transition-colors"
            >
              ← Quay lại
            </a>
          </div>
        </div>

        {/* Admin Payments List */}
        <AdminPaymentsList />
      </div>
    </div>
  );
}
