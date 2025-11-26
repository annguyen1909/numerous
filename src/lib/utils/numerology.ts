/**
 * Numerology Calculation Utilities
 * Các hàm tính toán Thần số học
 */

import { NumerologyNumbers, NumerologyInput, NumerologyResult } from '@/types';

/**
 * Bảng chuyển đổi chữ cái sang số theo hệ Pythagorean
 */
const LETTER_VALUES: { [key: string]: number } = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  // Hỗ trợ tiếng Việt - loại bỏ dấu trước khi tính
};

/**
 * Loại bỏ dấu tiếng Việt
 */
export function removeVietnameseTones(str: string): string {
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  return str;
}

/**
 * Rút gọn số về 1 chữ số (trừ master numbers 11, 22, 33)
 */
export function reduceToSingleDigit(num: number): number {
  // Giữ nguyên master numbers
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }
  
  while (num > 9) {
    num = num
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
    
    // Check lại master numbers sau khi rút gọn
    if (num === 11 || num === 22 || num === 33) {
      return num;
    }
  }
  
  return num;
}

/**
 * Chuyển chữ cái sang số
 */
export function letterToNumber(letter: string): number {
  const upperLetter = removeVietnameseTones(letter.toUpperCase());
  return LETTER_VALUES[upperLetter] || 0;
}

/**
 * Tính Life Path Number (Số đường đời)
 * Dựa trên ngày tháng năm sinh
 */
export function calculateLifePathNumber(birthDate: string): number {
  // birthDate format: YYYY-MM-DD
  const [year, month, day] = birthDate.split('-').map(Number);
  
  // Rút gọn từng thành phần
  const reducedDay = reduceToSingleDigit(day);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedYear = reduceToSingleDigit(year);
  
  // Cộng tất cả và rút gọn
  const sum = reducedDay + reducedMonth + reducedYear;
  return reduceToSingleDigit(sum);
}

/**
 * Tính Expression Number (Số biểu đạt)
 * Dựa trên tên đầy đủ
 */
export function calculateExpressionNumber(fullName: string): number {
  const cleanName = removeVietnameseTones(fullName.replace(/[^a-zA-Z\s]/g, ''));
  
  const sum = cleanName
    .split('')
    .filter((char: string) => char !== ' ')
    .reduce((total, char: string) => total + letterToNumber(char), 0);
  
  return reduceToSingleDigit(sum);
}

/**
 * Tính Soul Urge Number (Số linh hồn)
 * Dựa trên các nguyên âm trong tên
 */
export function calculateSoulUrgeNumber(fullName: string): number {
  const vowels = 'AEIOU';
  const cleanName = removeVietnameseTones(fullName.toUpperCase().replace(/[^A-Z]/g, ''));
  
  const sum = cleanName
    .split('')
    .filter((char: string) => vowels.includes(char))
    .reduce((total, char: string) => total + letterToNumber(char), 0);
  
  return reduceToSingleDigit(sum);
}

/**
 * Tính Personality Number (Số tính cách)
 * Dựa trên các phụ âm trong tên
 */
export function calculatePersonalityNumber(fullName: string): number {
  const vowels = 'AEIOU';
  const cleanName = removeVietnameseTones(fullName.toUpperCase().replace(/[^A-Z]/g, ''));
  
  const sum = cleanName
    .split('')
    .filter((char: string) => !vowels.includes(char))
    .reduce((total, char: string) => total + letterToNumber(char), 0);
  
  return reduceToSingleDigit(sum);
}

/**
 * Tính Birthday Number (Số ngày sinh)
 */
export function calculateBirthdayNumber(birthDate: string): number {
  const [, , day] = birthDate.split('-').map(Number);
  return reduceToSingleDigit(day);
}

/**
 * Tính tất cả các số Thần số học
 */
export function calculateNumerologyNumbers(input: NumerologyInput): NumerologyNumbers {
  return {
    lifePathNumber: calculateLifePathNumber(input.birthDate),
    expressionNumber: calculateExpressionNumber(input.fullName),
    soulUrgeNumber: calculateSoulUrgeNumber(input.fullName),
    personalityNumber: calculatePersonalityNumber(input.fullName),
    birthdayNumber: calculateBirthdayNumber(input.birthDate),
  };
}

/**
 * Lấy các số may mắn dựa trên các số chính
 */
export function getLuckyNumbers(numbers: NumerologyNumbers): number[] {
  const { lifePathNumber, expressionNumber, soulUrgeNumber } = numbers;
  
  // Kết hợp các số chính và tạo danh sách số may mắn
  const luckySet = new Set<number>([
    lifePathNumber,
    expressionNumber,
    soulUrgeNumber,
    (lifePathNumber + expressionNumber) % 9 || 9,
    (expressionNumber + soulUrgeNumber) % 9 || 9,
  ]);
  
  return Array.from(luckySet).sort((a, b) => a - b);
}

/**
 * Lấy màu sắc may mắn dựa trên Life Path Number
 */
export function getLuckyColors(lifePathNumber: number): string[] {
  const colorMap: { [key: number]: string[] } = {
    1: ['Đỏ', 'Cam', 'Vàng'],
    2: ['Xanh lá nhạt', 'Trắng', 'Kem'],
    3: ['Vàng', 'Tím', 'Hồng'],
    4: ['Xanh dương', 'Xám', 'Nâu'],
    5: ['Xanh lá', 'Xanh dương nhạt', 'Bạc'],
    6: ['Hồng', 'Xanh lá', 'Trắng'],
    7: ['Tím', 'Trắng', 'Xám'],
    8: ['Nâu', 'Đen', 'Vàng đồng'],
    9: ['Đỏ', 'Vàng', 'Cam'],
    11: ['Trắng', 'Bạc', 'Xanh dương nhạt'],
    22: ['Nâu đất', 'Xanh lá sẫm', 'Vàng'],
    33: ['Vàng kim', 'Xanh ngọc', 'Tím'],
  };
  
  return colorMap[lifePathNumber] || ['Trắng', 'Xám'];
}

/**
 * Lấy điểm mạnh dựa trên các số chính
 */
export function getStrengths(numbers: NumerologyNumbers): string[] {
  const strengths: string[] = [];
  
  // Dựa trên Life Path Number
  const strengthsMap: { [key: number]: string[] } = {
    1: ['Lãnh đạo tự nhiên', 'Độc lập', 'Sáng tạo', 'Quyết đoán'],
    2: ['Hợp tác tốt', 'Nhạy cảm', 'Khéo léo', 'Hòa bình'],
    3: ['Giao tiếp xuất sắc', 'Sáng tạo', 'Lạc quan', 'Xã hội'],
    4: ['Thực tế', 'Tổ chức tốt', 'Đáng tin cậy', 'Chăm chỉ'],
    5: ['Linh hoạt', 'Thích ứng', 'Tự do', 'Phiêu lưu'],
    6: ['Có trách nhiệm', 'Chăm sóc', 'Hài hòa', 'Yêu gia đình'],
    7: ['Phân tích sâu', 'Trí tuệ', 'Tâm linh', 'Hoàn hảo'],
    8: ['Tham vọng', 'Quản lý tài chính', 'Quyền lực', 'Thành công'],
    9: ['Nhân đạo', 'Rộng lượng', 'Lý tưởng', 'Đồng cảm'],
    11: ['Trực giác mạnh', 'Tâm linh cao', 'Truyền cảm hứng', 'Nhạy cảm'],
    22: ['Xây dựng vĩ đại', 'Tầm nhìn xa', 'Thực tiễn', 'Lãnh đạo'],
    33: ['Thầy giáo xuất sắc', 'Yêu thương vô điều kiện', 'Chữa lành', 'Tâm linh'],
  };
  
  const lifePathStrengths = strengthsMap[numbers.lifePathNumber] || [];
  strengths.push(...lifePathStrengths);
  
  return strengths;
}

/**
 * Lấy điểm yếu dựa trên các số chính
 */
export function getWeaknesses(numbers: NumerologyNumbers): string[] {
  const weaknessesMap: { [key: number]: string[] } = {
    1: ['Ích kỷ', 'Cứng đầu', 'Áp đặt', 'Thiếu kiên nhẫn'],
    2: ['Nhạy cảm quá mức', 'Phụ thuộc', 'Thiếu quyết đoán', 'Lo lắng'],
    3: ['Phân tán', 'Nông cạn', 'Quá lạc quan', 'Thiếu tập trung'],
    4: ['Cứng nhắc', 'Bảo thủ', 'Quá nghiêm túc', 'Chậm thay đổi'],
    5: ['Bồng bột', 'Thiếu kiên nhẫn', 'Không kiên định', 'Phóng túng'],
    6: ['Quá lo lắng', 'Can thiệp', 'Hoàn hảo chủ nghĩa', 'Hy sinh quá mức'],
    7: ['Xa cách', 'Hoài nghi', 'Bí mật', 'Cô đơn'],
    8: ['Vật chất', 'Độc đoán', 'Không biết lắng nghe', 'Căng thẳng'],
    9: ['Lý tưởng hóa', 'Cảm xúc', 'Khó buông bỏ', 'Dễ thất vọng'],
    11: ['Căng thẳng thần kinh', 'Quá nhạy cảm', 'Không thực tế', 'Lo âu'],
    22: ['Áp lực lớn', 'Căng thẳng', 'Hoàn hảo chủ nghĩa', 'Quá tham vọng'],
    33: ['Gánh nặng cảm xúc', 'Hy sinh bản thân', 'Căng thẳng', 'Kỳ vọng cao'],
  };
  
  return weaknessesMap[numbers.lifePathNumber] || [];
}

/**
 * Lấy nghề nghiệp phù hợp
 */
export function getSuitableCareer(numbers: NumerologyNumbers): string[] {
  const careerMap: { [key: number]: string[] } = {
    1: ['CEO', 'Doanh nhân', 'Lãnh đạo', 'Nhà phát minh', 'Kiến trúc sư'],
    2: ['Tư vấn', 'Ngoại giao', 'Giáo viên', 'Y tá', 'Trọng tài'],
    3: ['Nghệ sĩ', 'Diễn giả', 'Nhà văn', 'Marketing', 'Truyền thông'],
    4: ['Kế toán', 'Kỹ sư', 'Quản lý', 'Ngân hàng', 'Xây dựng'],
    5: ['Du lịch', 'Báo chí', 'Bán hàng', 'Giải trí', 'Thể thao'],
    6: ['Giáo viên', 'Y tá', 'Tư vấn gia đình', 'Thiết kế nội thất', 'Đầu bếp'],
    7: ['Nhà khoa học', 'Nhà nghiên cứu', 'Triết gia', 'Nhà tâm linh', 'Phân tích'],
    8: ['Doanh nhân', 'Tài chính', 'Luật sư', 'Quản lý cấp cao', 'Đầu tư'],
    9: ['Nhà từ thiện', 'Nghệ sĩ', 'Giáo viên', 'Tư vấn', 'Chăm sóc sức khỏe'],
    11: ['Nhà tâm linh', 'Huấn luyện viên', 'Tư vấn', 'Nghệ sĩ', 'Nhà trị liệu'],
    22: ['Kiến trúc sư', 'Chính trị gia', 'CEO', 'Nhà xây dựng', 'Kỹ sư trưởng'],
    33: ['Giáo viên xuất sắc', 'Nhà trị liệu', 'Nhà tâm linh', 'Tư vấn', 'Y sĩ'],
  };
  
  return careerMap[numbers.lifePathNumber] || ['Các nghề nghiệp đa dạng'];
}

/**
 * Tạo báo cáo đầy đủ
 */
export function generateNumerologyResult(input: NumerologyInput): Omit<NumerologyResult, 'relationships'> {
  const numbers = calculateNumerologyNumbers(input);
  
  return {
    ...numbers,
    luckyNumbers: getLuckyNumbers(numbers),
    luckyColors: getLuckyColors(numbers.lifePathNumber),
    strengths: getStrengths(numbers),
    weaknesses: getWeaknesses(numbers),
    career: getSuitableCareer(numbers),
  };
}
