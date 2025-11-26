/**
 * VietQR Utility
 * Generate QR code for Vietnamese bank transfer
 */

interface BankQRConfig {
  bankId: string; // 970422 for MB Bank, 970436 for Vietcombank, etc.
  accountNumber: string;
  accountName: string;
  amount: number;
  transferNote: string;
}

interface QRResult {
  qrImageUrl: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  transferNote: string;
  bankId: string;
}

/**
 * Generate VietQR payment QR code
 * Using VietQR API: https://api.vietqr.io
 */
export function generateBankQR(config: BankQRConfig): QRResult {
  const { bankId, accountNumber, accountName, amount, transferNote } = config;

  // Encode transfer note for URL
  const encodedNote = encodeURIComponent(transferNote);

  // Generate VietQR image URL
  // Format: https://img.vietqr.io/image/{BANK_ID}-{ACCOUNT_NO}-{TEMPLATE}.png?amount={AMOUNT}&addInfo={NOTE}&accountName={NAME}
  const qrImageUrl = `https://img.vietqr.io/image/BIDV-5611211895-compact.png?amount=${amount}&addInfo=${encodedNote}&accountName=${encodeURIComponent(accountName)}`;

  // Map common bank IDs to names
  const bankNames: Record<string, string> = {
    '970422': 'MB Bank (Ngân hàng Quân Đội)',
    '970436': 'Vietcombank',
    '970415': 'Vietinbank',
    '970418': 'BIDV',
    '970405': 'Agribank',
    '970403': 'Sacombank',
    '970407': 'Techcombank',
    '970416': 'ACB',
    '970432': 'VPBank',
    '970423': 'TPBank',
  };

  return {
    qrImageUrl,
    bankName: bankNames[bankId] || 'Ngân hàng',
    accountNumber,
    accountName,
    amount,
    transferNote,
    bankId,
  };
}

/**
 * Generate unique transfer note for user
 */
export function generateTransferNote(userId: string): string {
  return `PREMIUM-${userId.substring(0, 8).toUpperCase()}`;
}

/**
 * Bank configuration from environment variables
 */
export function getBankConfig() {
  return {
    bankId: process.env.NEXT_PUBLIC_BANK_ID || '970422', // Default to MB Bank
    accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || '0123456789',
    accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_HOLDER || 'NGUYEN VAN A',
  };
}

/**
 * Premium pricing
 */
export const PREMIUM_PRICES = {
  monthly: 199000,
  yearly: 1199000,
} as const;

export type PremiumPlan = 'monthly' | 'yearly';

/**
 * Get premium duration in months
 */
export function getPremiumDuration(plan: PremiumPlan): number {
  return plan === 'monthly' ? 1 : 12;
}

/**
 * Calculate premium expiry date
 */
export function calculatePremiumExpiry(plan: PremiumPlan, fromDate: Date = new Date()): Date {
  const months = getPremiumDuration(plan);
  const expiryDate = new Date(fromDate);
  expiryDate.setMonth(expiryDate.getMonth() + months);
  return expiryDate;
}
