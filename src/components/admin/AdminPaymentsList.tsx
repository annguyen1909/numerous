/**
 * Admin Payments List Component
 * Display and manage payment requests
 */

'use client';

import { useState, useEffect } from 'react';
import PremiumBadge from '../ui/PremiumBadge';
import { ClipboardList } from 'lucide-react';

interface Payment {
  id: string;
  userId: string;
  amount: number;
  transactionId: string | null;
  transactionTime: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  verifiedAt: string | null;
  verifiedBy: string | null;
  user: {
    id: string;
    email: string;
    name: string | null;
    isPremium: boolean;
    premiumUntil: string | null;
  };
}

export default function AdminPaymentsList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState<'pending' | 'verified' | 'rejected' | 'all'>('pending');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/payments?status=${filter}`);
      if (!response.ok) throw new Error('Không thể tải dữ liệu');
      const data = await response.json();
      setPayments(data.payments || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [filter]);

  const handleAction = async (paymentId: string, action: 'approve' | 'reject') => {
    if (!confirm(`Bạn có chắc muốn ${action === 'approve' ? 'duyệt' : 'từ chối'} thanh toán này?`)) {
      return;
    }

    setActionLoading(paymentId);
    setError('');

    try {
      const response = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, action }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Đã xảy ra lỗi');
      }

      alert(data.message);
      fetchPayments(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    } as const;

    const labels = {
      pending: '⏳ Chờ duyệt',
      verified: '✓ Đã duyệt',
      rejected: '✗ Từ chối',
    } as const;

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const parseNotes = (notes: string | null) => {
    try {
      return JSON.parse(notes || '{}');
    } catch {
      return {};
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-2">
          {(['pending', 'verified', 'rejected', 'all'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab === 'pending' && 'Chờ duyệt'}
              {tab === 'verified' && 'Đã duyệt'}
              {tab === 'rejected' && 'Từ chối'}
              {tab === 'all' && 'Tất cả'}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Payments List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Đang tải...</p>
        </div>
      ) : payments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <ClipboardList className="w-16 h-16 mb-4 mx-auto text-[#6B4BFF]" />
          <p className="text-gray-600">Không có yêu cầu nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => {
            const notes = parseNotes(payment.notes);
            return (
              <div key={payment.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Payment Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">
                        Thông Tin Thanh Toán
                      </h3>
                      {getStatusBadge(payment.status)}
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Số tiền:</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {payment.amount.toLocaleString('vi-VN')} VNĐ
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Gói:</p>
                      <p className="font-semibold text-gray-900">
                        {notes.plan === 'yearly' ? '12 Tháng' : '1 Tháng'}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Mã giao dịch:</p>
                      <p className="font-mono font-semibold text-gray-900">
                        {payment.transactionId || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Thời gian chuyển khoản:</p>
                      <p className="text-gray-900">
                        {payment.transactionTime
                          ? new Date(payment.transactionTime).toLocaleString('vi-VN')
                          : 'N/A'}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Nội dung CK:</p>
                      <p className="font-mono text-sm text-gray-900 break-all">
                        {notes.transferNote || 'N/A'}
                      </p>
                    </div>

                    {notes.screenshotUrl && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Ảnh chụp màn hình:</p>
                        <a
                          href={notes.screenshotUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Xem ảnh →
                        </a>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-600">Ngày tạo:</p>
                      <p className="text-gray-900">
                        {new Date(payment.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      Thông Tin Người Dùng
                    </h3>

                    <div>
                      <p className="text-sm text-gray-600">Email:</p>
                      <p className="font-semibold text-gray-900">{payment.user.email}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Tên:</p>
                      <p className="text-gray-900">{payment.user.name || 'Chưa có'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">User ID:</p>
                      <p className="font-mono text-sm text-gray-900">{payment.user.id}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Trạng thái Premium:</p>
                      <div className="flex items-center space-x-2">
                        {payment.user.isPremium ? (
                          <>
                            <PremiumBadge size="sm" />
                            {payment.user.premiumUntil && (
                              <span className="text-sm text-gray-600">
                                đến {new Date(payment.user.premiumUntil).toLocaleDateString('vi-VN')}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-600">Chưa Premium</span>
                        )}
                      </div>
                    </div>

                    {payment.verifiedBy && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">Duyệt bởi:</p>
                          <p className="text-gray-900">{payment.verifiedBy}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Thời gian duyệt:</p>
                          <p className="text-gray-900">
                            {payment.verifiedAt
                              ? new Date(payment.verifiedAt).toLocaleString('vi-VN')
                              : 'N/A'}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Action Buttons */}
                    {payment.status === 'pending' && (
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => handleAction(payment.id, 'approve')}
                          disabled={actionLoading === payment.id}
                          className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {actionLoading === payment.id ? '...' : '✓ Duyệt'}
                        </button>
                        <button
                          onClick={() => handleAction(payment.id, 'reject')}
                          disabled={actionLoading === payment.id}
                          className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          {actionLoading === payment.id ? '...' : '✗ Từ chối'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
