/**
 * Premium Upgrade Modal
 * Shows when non-premium users try to export PDF
 */

'use client';

import { useState } from 'react';
import { Sparkles, FileText, Bot, Lightbulb, CreditCard, Cloud } from 'lucide-react';

interface PremiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumUpgradeModal({ isOpen, onClose }: PremiumUpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8 text-white">
          <div className="text-center">
            <Sparkles className="w-12 h-12 mb-4 mx-auto text-white" />
            <h2 className="text-2xl font-bold mb-2">
              Nâng Cấp Premium
            </h2>
            <p className="text-purple-100">
              Mở khóa tính năng tải báo cáo PDF chuyên sâu
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-900 text-lg">
              Tính năng Premium bao gồm:
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6" />
                <div>
                  <div className="font-medium text-gray-900">Báo Cáo PDF Chuyên Nghiệp</div>
                  <div className="text-sm text-gray-600">
                    Thiết kế đẹp, bố cục tối ưu, in ấn chất lượng cao
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Bot className="w-6 h-6" />
                <div>
                  <div className="font-medium text-gray-900">AI Phân Tích Chuyên Sâu</div>
                  <div className="text-sm text-gray-600">
                    Nội dung chi tiết, cá nhân hóa từ GPT-4
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6" />
                <div>
                  <div className="font-medium text-gray-900">Dự Báo Chi Tiết</div>
                  <div className="text-sm text-gray-600">
                    Vận mệnh, sự nghiệp, tình cảm, tài chính 2025-2026
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6" />
                <div>
                  <div className="font-medium text-gray-900">Lời Khuyên Cá Nhân</div>
                  <div className="text-sm text-gray-600">
                    Hướng dẫn cụ thể phát triển bản thân
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Cloud className="w-6 h-6 text-blue-500" />
                <div>
                  <div className="font-medium text-gray-900">Lưu Trữ Vĩnh Viễn</div>
                  <div className="text-sm text-gray-600">
                    Tải lại bất cứ lúc nào, không giới hạn
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 mb-6 border-2 border-purple-200">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Chỉ từ</div>
              <div className="text-3xl font-bold text-purple-600">
                199.000₫
                <span className="text-sm font-normal text-gray-600">/tháng</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                hoặc 1.199.000₫/năm (tiết kiệm 40%)
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Để sau
            </button>
            <a
              href="/premium"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl text-center"
            >
              Nâng Cấp Ngay
            </a>
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            <CreditCard className="w-5 h-5 inline-block mr-2" />
            Thanh toán dễ dàng qua QR Code Banking
          </p>
        </div>
      </div>
    </div>
  );
}
