/**
 * Premium Payment Form Component
 * Show QR code and payment confirmation form
 */

'use client';

import { useState, useEffect } from 'react';
import { generateBankQR, generateTransferNote, getBankConfig, PREMIUM_PRICES, PremiumPlan } from '@/lib/vietqr';
import Image from 'next/image';
import { AlertTriangle } from 'lucide-react';

interface PremiumPaymentFormProps {
  userId: string;
}

export default function PremiumPaymentForm({ userId }: PremiumPaymentFormProps) {
  const [selectedPlan, setSelectedPlan] = useState<PremiumPlan>('monthly');
  const [qrData, setQrData] = useState<ReturnType<typeof generateBankQR> | null>(null);
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  
  // Form state
  const [transactionId, setTransactionId] = useState('');
  const [transactionTime, setTransactionTime] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Generate QR code when plan changes
  useEffect(() => {
    const bankConfig = getBankConfig();
    const transferNote = generateTransferNote(userId);
    const amount = PREMIUM_PRICES[selectedPlan];

    const qr = generateBankQR({
      bankId: bankConfig.bankId,
      accountNumber: bankConfig.accountNumber,
      accountName: bankConfig.accountName,
      amount,
      transferNote,
    });

    setQrData(qr);
  }, [selectedPlan, userId]);

  // Set default transaction time to now
  useEffect(() => {
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    setTransactionTime(localDateTime);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!qrData) {
        throw new Error('Thông tin thanh toán không hợp lệ');
      }

      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId,
          transactionTime: new Date(transactionTime).toISOString(),
          transferNote: qrData.transferNote,
          amount: qrData.amount,
          plan: selectedPlan,
          screenshotUrl: screenshotUrl || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Đã xảy ra lỗi');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-4">
          Yêu Cầu Đã Được Gửi!
        </h3>
        <p className="text-green-800 mb-6">
          Chúng tôi đã nhận được yêu cầu thanh toán của bạn. Admin sẽ xác nhận trong vòng 5-10 phút.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Về Dashboard
          </a>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Gửi Yêu Cầu Khác
          </button>
        </div>
      </div>
    );
  }

  if (!qrData) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Plan Selection */}
      <div className="bg-white border-2 border-purple-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Chọn Gói Premium</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`p-6 border-2 rounded-xl transition-all ${
              selectedPlan === 'monthly'
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-gray-900">1 Tháng</span>
              <span className="text-2xl font-bold text-purple-600">
                {PREMIUM_PRICES.monthly.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <p className="text-sm text-gray-600">Dùng thử 1 tháng</p>
          </button>

          <button
            onClick={() => setSelectedPlan('yearly')}
            className={`p-6 border-2 rounded-xl transition-all relative ${
              selectedPlan === 'yearly'
                ? 'border-green-600 bg-green-50'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              TIẾT KIỆM 40%
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-gray-900">12 Tháng</span>
              <span className="text-2xl font-bold text-green-600">
                {PREMIUM_PRICES.yearly.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <p className="text-sm text-gray-600">Chỉ 99,917đ/tháng</p>
          </button>
        </div>
      </div>

      {/* QR Code Display */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">
          Bước 1: Quét Mã QR Để Thanh Toán
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* QR Code */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-2xl shadow-lg mb-4">
              <Image
                src={qrData.qrImageUrl}
                alt="QR Code Thanh Toán"
                width={300}
                height={300}
                className="rounded-lg"
                unoptimized
              />
            </div>
            <p className="text-sm text-purple-700 text-center font-medium">
              Mở app Ngân hàng → Quét QR → Xác nhận
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ngân hàng:</p>
              <p className="text-lg font-bold text-gray-900">{qrData.bankName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Số tài khoản:</p>
              <p className="text-lg font-bold text-gray-900 font-mono">{qrData.accountNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Chủ tài khoản:</p>
              <p className="text-lg font-bold text-gray-900">{qrData.accountName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Số tiền:</p>
              <p className="text-2xl font-bold text-purple-600">
                {qrData.amount.toLocaleString('vi-VN')} VNĐ
              </p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
              <p className="text-sm font-semibold text-yellow-900 mb-2">
                <AlertTriangle className="w-4 h-4 inline-block mr-1" />
                Nội dung chuyển khoản (BẮT BUỘC):
              </p>
              <p className="text-base font-bold text-yellow-900 font-mono break-all">
                {qrData.transferNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Form */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Bước 2: Xác Nhận Đã Chuyển Khoản
        </h3>

        {!showConfirmForm ? (
          <div className="text-center">
            <button
              onClick={() => setShowConfirmForm(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Tôi Đã Chuyển Khoản
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã giao dịch <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="VD: FT24325XXXXXX"
              />
              <p className="text-xs text-gray-500 mt-1">
                Mã giao dịch hiển thị trong lịch sử chuyển khoản của bạn
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian chuyển khoản <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                required
                value={transactionTime}
                onChange={(e) => setTransactionTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link ảnh chụp màn hình (không bắt buộc)
              </label>
              <input
                type="url"
                value={screenshotUrl}
                onChange={(e) => setScreenshotUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://imgur.com/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload ảnh lên Imgur hoặc dịch vụ khác và dán link vào đây
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Nội dung đã chuyển khoản:</strong> {qrData.transferNote}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang gửi...' : 'Xác Nhận Thanh Toán'}
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmForm(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
