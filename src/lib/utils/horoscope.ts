/**
 * Horoscope Calculation Utilities
 * Các hàm tính toán Tử vi và Horoscope
 */

import { HoroscopeInput, HoroscopeResult } from '@/types';

/**
 * Bảng 12 cung hoàng đạo
 */
const ZODIAC_SIGNS = [
  { name: 'Bạch Dương', english: 'Aries', start: '03-21', end: '04-19' },
  { name: 'Kim Ngưu', english: 'Taurus', start: '04-20', end: '05-20' },
  { name: 'Song Tử', english: 'Gemini', start: '05-21', end: '06-20' },
  { name: 'Cự Giải', english: 'Cancer', start: '06-21', end: '07-22' },
  { name: 'Sư Tử', english: 'Leo', start: '07-23', end: '08-22' },
  { name: 'Xử Nữ', english: 'Virgo', start: '08-23', end: '09-22' },
  { name: 'Thiên Bình', english: 'Libra', start: '09-23', end: '10-22' },
  { name: 'Hổ Cáp', english: 'Scorpio', start: '10-23', end: '11-21' },
  { name: 'Nhân Mã', english: 'Sagittarius', start: '11-22', end: '12-21' },
  { name: 'Ma Kết', english: 'Capricorn', start: '12-22', end: '01-19' },
  { name: 'Bảo Bình', english: 'Aquarius', start: '01-20', end: '02-18' },
  { name: 'Song Ngư', english: 'Pisces', start: '02-19', end: '03-20' },
];

/**
 * Bảng 12 con giáp
 */
const CHINESE_ZODIAC = [
  { name: 'Tý (Chuột)', english: 'Rat', years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020] },
  { name: 'Sửu (Trâu)', english: 'Ox', years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021] },
  { name: 'Dần (Hổ)', english: 'Tiger', years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022] },
  { name: 'Mão (Mèo)', english: 'Cat', years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023] },
  { name: 'Thìn (Rồng)', english: 'Dragon', years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024] },
  { name: 'Tỵ (Rắn)', english: 'Snake', years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025] },
  { name: 'Ngọ (Ngựa)', english: 'Horse', years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026] },
  { name: 'Mùi (Dê)', english: 'Goat', years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027] },
  { name: 'Thân (Khỉ)', english: 'Monkey', years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028] },
  { name: 'Dậu (Gà)', english: 'Rooster', years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029] },
  { name: 'Tuất (Chó)', english: 'Dog', years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030] },
  { name: 'Hợi (Lợn)', english: 'Pig', years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031] },
];

/**
 * Ngũ hành (Five Elements)
 */
const FIVE_ELEMENTS = [
  { name: 'Kim (Metal)', years: [0, 1] },
  { name: 'Thủy (Water)', years: [2, 3] },
  { name: 'Hỏa (Fire)', years: [4, 5] },
  { name: 'Thổ (Earth)', years: [6, 7] },
  { name: 'Mộc (Wood)', years: [8, 9] },
];

/**
 * Tính cung hoàng đạo từ ngày sinh
 */
export function getZodiacSign(birthDate: string): string {
  const [year, month, day] = birthDate.split('-').map(Number);
  const dateStr = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  
  for (const sign of ZODIAC_SIGNS) {
    // Xử lý trường hợp Ma Kết (nằm giữa 2 năm)
    if (sign.start > sign.end) {
      if (dateStr >= sign.start || dateStr <= sign.end) {
        return sign.name;
      }
    } else {
      if (dateStr >= sign.start && dateStr <= sign.end) {
        return sign.name;
      }
    }
  }
  
  return 'Không xác định';
}

/**
 * Tính con giáp từ năm sinh
 */
export function getChineseZodiac(birthDate: string): string {
  const [year] = birthDate.split('-').map(Number);
  
  // Con giáp lặp lại theo chu kỳ 12 năm
  const zodiacIndex = (year - 1924) % 12;
  
  if (zodiacIndex >= 0 && zodiacIndex < CHINESE_ZODIAC.length) {
    return CHINESE_ZODIAC[zodiacIndex].name;
  }
  
  return 'Không xác định';
}

/**
 * Tính ngũ hành từ năm sinh
 */
export function getElement(birthDate: string): string {
  const [year] = birthDate.split('-').map(Number);
  
  // Lấy chữ số cuối của năm
  const lastDigit = year % 10;
  
  for (const element of FIVE_ELEMENTS) {
    if (element.years.includes(lastDigit)) {
      return element.name;
    }
  }
  
  return 'Không xác định';
}

/**
 * Lấy thời kỳ may mắn trong năm dựa trên cung hoàng đạo
 */
export function getLuckyPeriods(zodiacSign: string): string[] {
  const luckyPeriodsMap: { [key: string]: string[] } = {
    'Bạch Dương': ['Tháng 3-4', 'Tháng 7', 'Tháng 11'],
    'Kim Ngưu': ['Tháng 4-5', 'Tháng 8', 'Tháng 12'],
    'Song Tử': ['Tháng 5-6', 'Tháng 9', 'Tháng 1'],
    'Cự Giải': ['Tháng 6-7', 'Tháng 10', 'Tháng 2'],
    'Sư Tử': ['Tháng 7-8', 'Tháng 11', 'Tháng 3'],
    'Xử Nữ': ['Tháng 8-9', 'Tháng 12', 'Tháng 4'],
    'Thiên Bình': ['Tháng 9-10', 'Tháng 1', 'Tháng 5'],
    'Hổ Cáp': ['Tháng 10-11', 'Tháng 2', 'Tháng 6'],
    'Nhân Mã': ['Tháng 11-12', 'Tháng 3', 'Tháng 7'],
    'Ma Kết': ['Tháng 12-1', 'Tháng 4', 'Tháng 8'],
    'Bảo Bình': ['Tháng 1-2', 'Tháng 5', 'Tháng 9'],
    'Song Ngư': ['Tháng 2-3', 'Tháng 6', 'Tháng 10'],
  };
  
  return luckyPeriodsMap[zodiacSign] || ['Cả năm'];
}

/**
 * Lấy thách thức dựa trên cung hoàng đạo
 */
export function getChallenges(zodiacSign: string): string[] {
  const challengesMap: { [key: string]: string[] } = {
    'Bạch Dương': ['Thiếu kiên nhẫn', 'Hành động thiếu suy nghĩ', 'Cạnh tranh quá đà'],
    'Kim Ngưu': ['Cứng đầu', 'Kháng cự thay đổi', 'Vật chất hóa'],
    'Song Tử': ['Thiếu tập trung', 'Nói nhiều hơn làm', 'Không kiên định'],
    'Cự Giải': ['Nhạy cảm quá mức', 'Khó buông bỏ quá khứ', 'Tâm trạng thất thường'],
    'Sư Tử': ['Tự phụ', 'Muốn được chú ý', 'Kiểm soát người khác'],
    'Xử Nữ': ['Hoàn hảo chủ nghĩa', 'Lo lắng quá mức', 'Phê bình khắt khe'],
    'Thiên Bình': ['Thiếu quyết đoán', 'Tránh xung đột', 'Phụ thuộc người khác'],
    'Hổ Cáp': ['Đố kỵ', 'Bí mật', 'Khó tha thứ'],
    'Nhân Mã': ['Thiếu trách nhiệm', 'Không thực tế', 'Trốn tránh cam kết'],
    'Ma Kết': ['Quá nghiêm túc', 'Bi quan', 'Khó tin tưởng'],
    'Bảo Bình': ['Xa cách', 'Cứng đầu', 'Thiếu cảm xúc'],
    'Song Ngư': ['Trốn tránh thực tế', 'Quá mơ mộng', 'Dễ bị tổn thương'],
  };
  
  return challengesMap[zodiacSign] || ['Cần tự nhận thức'];
}

/**
 * Lấy lời khuyên dựa trên cung hoàng đạo và ngũ hành
 */
export function getAdvice(zodiacSign: string, element: string): string[] {
  const advice: string[] = [];
  
  // Lời khuyên theo cung hoàng đạo
  const zodiacAdviceMap: { [key: string]: string[] } = {
    'Bạch Dương': ['Hãy học cách kiên nhẫn', 'Suy nghĩ trước khi hành động', 'Lắng nghe người khác nhiều hơn'],
    'Kim Ngưu': ['Mở lòng với sự thay đổi', 'Đừng quá cứng nhắc', 'Cân bằng giữa vật chất và tinh thần'],
    'Song Tử': ['Tập trung vào một mục tiêu', 'Hoàn thành những gì đã bắt đầu', 'Lắng nghe nhiều hơn nói'],
    'Cự Giải': ['Học cách buông bỏ quá khứ', 'Kiểm soát cảm xúc tốt hơn', 'Tin tưởng vào người khác'],
    'Sư Tử': ['Khiêm tốn hơn', 'Chia sẻ ánh sáng với người khác', 'Lắng nghe ý kiến khác'],
    'Xử Nữ': ['Chấp nhận sự không hoàn hảo', 'Giảm lo lắng', 'Tử tế với bản thân'],
    'Thiên Bình': ['Quyết đoán hơn', 'Đối mặt với xung đột', 'Độc lập hơn'],
    'Hổ Cáp': ['Học cách tha thứ', 'Chia sẻ nhiều hơn', 'Tin tưởng người khác'],
    'Nhân Mã': ['Trách nhiệm hơn', 'Thực tế hơn', 'Kiên định với cam kết'],
    'Ma Kết': ['Tận hưởng cuộc sống', 'Lạc quan hơn', 'Tin tưởng quá trình'],
    'Bảo Bình': ['Kết nối cảm xúc', 'Linh hoạt hơn', 'Gần gũi người khác'],
    'Song Ngư': ['Đối diện thực tế', 'Tự tin hơn', 'Bảo vệ bản thân'],
  };
  
  advice.push(...(zodiacAdviceMap[zodiacSign] || []));
  
  // Lời khuyên theo ngũ hành
  if (element.includes('Kim')) {
    advice.push('Tăng cường sức khỏe hô hấp', 'Cân bằng cảm xúc');
  } else if (element.includes('Thủy')) {
    advice.push('Chú ý sức khỏe thận', 'Kiểm soát cảm xúc sợ hãi');
  } else if (element.includes('Hỏa')) {
    advice.push('Chăm sóc tim mạch', 'Kiểm soát nhiệt tính');
  } else if (element.includes('Thổ')) {
    advice.push('Chăm sóc tiêu hóa', 'Cân bằng suy nghĩ');
  } else if (element.includes('Mộc')) {
    advice.push('Chăm sóc gan mật', 'Kiểm soát tức giận');
  }
  
  return advice;
}

/**
 * Tính toán tử vi và horoscope
 */
export function calculateHoroscope(input: HoroscopeInput): HoroscopeResult {
  const zodiacSign = getZodiacSign(input.birthDate);
  const chineseZodiac = getChineseZodiac(input.birthDate);
  const element = getElement(input.birthDate);
  
  return {
    zodiacSign,
    chineseZodiac,
    element,
    luckyPeriods: getLuckyPeriods(zodiacSign),
    challenges: getChallenges(zodiacSign),
    advice: getAdvice(zodiacSign, element),
  };
}

/**
 * Tính toán khung giờ tốt trong ngày (dựa trên giờ sinh nếu có)
 */
export function getLuckyHours(birthTime?: string): string[] {
  if (!birthTime) {
    return ['6h-8h (Mão)', '11h-13h (Ngọ)', '17h-19h (Dậu)'];
  }
  
  // Parse giờ sinh
  const [hour] = birthTime.split(':').map(Number);
  
  // Tính giờ hoàng đạo dựa trên giờ sinh
  const luckyHours = [
    `${hour}h-${hour + 2}h`,
    `${(hour + 6) % 24}h-${(hour + 8) % 24}h`,
    `${(hour + 12) % 24}h-${(hour + 14) % 24}h`,
  ];
  
  return luckyHours;
}

/**
 * Lấy hướng may mắn dựa trên năm sinh
 */
export function getLuckyDirections(birthDate: string): string[] {
  const [year] = birthDate.split('-').map(Number);
  const yearMod = year % 4;
  
  const directionMap: { [key: number]: string[] } = {
    0: ['Đông', 'Nam'],
    1: ['Tây', 'Bắc'],
    2: ['Nam', 'Tây'],
    3: ['Bắc', 'Đông'],
  };
  
  return directionMap[yearMod] || ['Đông'];
}
