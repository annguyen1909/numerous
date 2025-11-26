/**
 * TypeScript Type Definitions
 * Định nghĩa các kiểu dữ liệu cho dự án Thần số học và Tử vi
 */

// ============================================
// NUMEROLOGY TYPES - Kiểu dữ liệu Thần số học
// ============================================

export interface NumerologyInput {
  fullName: string;      // Họ và tên đầy đủ
  birthDate: string;     // Ngày sinh (YYYY-MM-DD)
}

export interface NumerologyNumbers {
  lifePathNumber: number;      // Số đường đời
  expressionNumber: number;    // Số biểu đạt
  soulUrgeNumber: number;      // Số linh hồn
  personalityNumber: number;   // Số tính cách
  birthdayNumber: number;      // Số ngày sinh
}

export interface NumerologyResult extends NumerologyNumbers {
  luckyNumbers: number[];      // Các số may mắn
  luckyColors: string[];       // Màu sắc may mắn
  strengths: string[];         // Điểm mạnh
  weaknesses: string[];        // Điểm yếu
  career: string[];            // Nghề nghiệp phù hợp
  relationships: string;       // Mối quan hệ
}

export interface NumerologyReport {
  id: string;
  userId: string;
  type: 'numerology';
  reportType: 'free' | 'premium';
  inputData: NumerologyInput;
  result: NumerologyResult;
  content: string;             // Nội dung phân tích từ AI
  predictions?: string;        // Dự đoán 6-12 tháng (chỉ premium)
  compatibility?: string;      // Tính tương thích (chỉ premium)
  detailedAnalysis?: string;   // Phân tích chi tiết (chỉ premium)
  createdAt: Date;
}

// ============================================
// HOROSCOPE TYPES - Kiểu dữ liệu Tử vi
// ============================================

export interface HoroscopeInput {
  birthDate: string;           // Ngày sinh (YYYY-MM-DD)
  birthTime?: string;          // Giờ sinh (HH:mm)
  birthPlace?: string;         // Nơi sinh
  gender?: 'male' | 'female';  // Giới tính
}

export interface HoroscopeResult {
  zodiacSign: string;          // Cung hoàng đạo
  chineseZodiac: string;       // Con giáp
  element: string;             // Ngũ hành
  luckyPeriods: string[];      // Thời kỳ may mắn
  challenges: string[];        // Thách thức
  advice: string[];            // Lời khuyên
}

export interface HoroscopeReport {
  id: string;
  userId: string;
  type: 'horoscope';
  reportType: 'free' | 'premium';
  inputData: HoroscopeInput;
  result: HoroscopeResult;
  content: string;             // Nội dung phân tích từ AI
  daily?: string;              // Tử vi hàng ngày
  weekly?: string;             // Tử vi hàng tuần
  monthly?: string;            // Tử vi hàng tháng
  yearly?: string;             // Tử vi cả năm (chỉ premium)
  pdfUrl?: string;             // Link download PDF (chỉ premium)
  createdAt: Date;
}

// ============================================
// USER & AUTH TYPES - Kiểu dữ liệu người dùng
// ============================================

export interface User {
  id: string;
  email: string;
  name?: string;
  isPremium: boolean;
  premiumUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

// ============================================
// PAYMENT TYPES - Kiểu dữ liệu thanh toán
// ============================================

export interface PaymentInput {
  amount: number;
  bankName?: string;
  transactionId?: string;
  transactionTime?: Date;
  notes?: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  bankName?: string;
  transactionId?: string;
  transactionTime?: Date;
  status: 'pending' | 'verified' | 'rejected';
  notes?: string;
  verifiedAt?: Date;
  verifiedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

// ============================================
// BLOG TYPES - Kiểu dữ liệu blog
// ============================================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category?: 'numerology' | 'horoscope' | 'tips';
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category?: string;
  published?: boolean;
}

// ============================================
// API RESPONSE TYPES - Kiểu dữ liệu API
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface OpenAIRequest {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface OpenAIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// ============================================
// UI COMPONENT TYPES - Kiểu dữ liệu UI
// ============================================

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface FormError {
  field: string;
  message: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}
