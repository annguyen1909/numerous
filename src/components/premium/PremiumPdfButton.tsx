/**
 * Premium PDF Button Component
 * Button to export premium PDF reports with loading state
 */

'use client';

import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import PremiumUpgradeModal from './PremiumUpgradeModal';

interface PremiumPdfButtonProps {
  fullName: string;
  birthDate: string;
  readingType: 'thansohoc' | 'tuvi' | 'chieusinh' | 'tinhcach';
  isPremium?: boolean;
  className?: string;
}

export default function PremiumPdfButton({
  fullName,
  birthDate,
  readingType,
  isPremium = false,
  className = '',
}: PremiumPdfButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExportPdf = async () => {
    // If not premium, show upgrade modal
    if (!isPremium) {
      setShowUpgradeModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          birthDate,
          readingType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if it's a premium requirement error
        if (response.status === 402 || data.code === 'PREMIUM_REQUIRED') {
          setShowUpgradeModal(true);
          return;
        }

        throw new Error(data.error || 'Có lỗi xảy ra khi tạo PDF');
      }

      // Success - download the PDF
      if (data.downloadUrl) {
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.fileName || 'bao-cao-premium.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success message
        alert('Báo cáo PDF đã được tạo thành công! Đang tải xuống...');
      }
    } catch (err: any) {
      console.error('Export error:', err);
      setError(err.message || 'Không thể tạo PDF. Vui lòng thử lại.');
      alert(`Lỗi: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleExportPdf}
        disabled={isLoading}
        className={`
          inline-flex items-center justify-center gap-2
          px-6 py-3 
          bg-linear-to-r from-purple-600 to-blue-600 
          text-white font-medium rounded-lg 
          hover:from-purple-700 hover:to-blue-700 
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all shadow-lg hover:shadow-xl
          ${className}
        `}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Đang tạo PDF...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Tải Báo Cáo PDF</span>
            {!isPremium && <span className="text-xs">(Premium)</span>}
          </>
        )}
      </button>

      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Upgrade Modal */}
      <PremiumUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}
