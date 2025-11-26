/**
 * OpenAI API Integration
 * Tích hợp OpenAI để tạo nội dung phân tích chi tiết
 */

import OpenAI from 'openai';
import { NumerologyNumbers, HoroscopeResult } from '@/types';

// Khởi tạo OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Tạo prompt cho phân tích Thần số học
 */
function createNumerologyPrompt(
  name: string,
  numbers: NumerologyNumbers,
  isPremium: boolean
): string {
  const basePrompt = `
Bạn là một chuyên gia Thần số học (Numerology) người Việt Nam với nhiều năm kinh nghiệm.

Thông tin khách hàng:
- Tên: ${name}
- Số Đường Đời (Life Path): ${numbers.lifePathNumber}
- Số Biểu Đạt (Expression): ${numbers.expressionNumber}
- Số Linh Hồn (Soul Urge): ${numbers.soulUrgeNumber}
- Số Tính Cách (Personality): ${numbers.personalityNumber}
- Số Ngày Sinh (Birthday): ${numbers.birthdayNumber}

QUAN TRỌNG: Hãy viết một báo cáo THẦN SỐ HỌC CỰC KỲ CHI TIẾT VÀ ĐẦY ĐỦ với các phần sau:

## PHẦN 1: PHÂN TÍCH SỐ ĐƯỜNG ĐỜI (500-700 từ)
- Ý nghĩa sâu sắc của số ${numbers.lifePathNumber} trong cuộc đời bạn
- Sứ mệnh và mục đích sống được số này chỉ định
- Những thử thách chính trong cuộc đời và cách vượt qua
- Hành trình phát triển từ trẻ đến trưởng thành
- Những giai đoạn quan trọng trong đời (tuổi nào?)
- Bài học cuộc đời cần học hỏi

## PHẦN 2: TÍNH CÁCH VÀ BẢN CHẤT THẬT (600-800 từ)
- Phân tích số Biểu Đạt ${numbers.expressionNumber}: cách bạn thể hiện bản thân ra bên ngoài
- Phân tích số Linh Hồn ${numbers.soulUrgeNumber}: khát vọng nội tâm sâu thẳm
- Phân tích số Tính Cách ${numbers.personalityNumber}: ấn tượng đầu tiên với người khác
- Phân tích số Ngày Sinh ${numbers.birthdayNumber}: tài năng đặc biệt từ khi sinh ra
- Sự kết hợp các con số: điểm hài hòa và mâu thuẫn nội tâm
- Bản ngã thực sự vs hình ảnh bên ngoài

## PHẦN 3: ĐIỂM MẠNH VÀ ĐIỂM YẾU (500-700 từ)
Điểm mạnh:
- 5-7 điểm mạnh nổi bật với giải thích chi tiết
- Cách phát huy tối đa các điểm mạnh này
- Tài năng tiềm ẩn có thể phát triển
- Khả năng lãnh đạo và sáng tạo

Điểm yếu:
- 5-7 điểm yếu cần cải thiện với giải thích
- Cách khắc phục và biến điểm yếu thành điểm mạnh
- Những bẫy tâm lý cần tránh
- Lời khuyên cụ thể để cân bằng

## PHẦN 4: TÌNH YÊU VÀ CÁC MỐI QUAN HỆ (600-800 từ)
- Kiểu người yêu bạn là: cách yêu, cách thể hiện tình cảm
- Đối tác lý tưởng: những con số tương thích nhất (liệt kê 3-4 số)
- Con số xung khắc và cách hóa giải
- Phân tích tương thích chi tiết với từng nhóm số (1-3, 4-6, 7-9)
- Các mối quan hệ gia đình: cha mẹ, anh chị em
- Tình bạn: kiểu bạn bè phù hợp
- Lời khuyên để duy trì hạnh phúc trong tình yêu
- Những sai lầm thường gặp trong các mối quan hệ

## PHẦN 5: SỰ NGHIỆP VÀ TÀI CHÍNH (700-900 từ)
- Nghề nghiệp phù hợp nhất dựa trên các con số (liệt kê 7-10 nghề cụ thể)
- Môi trường làm việc lý tưởng: độc lập hay làm theo nhóm?
- Phong cách lãnh đạo và quản lý
- Khả năng khởi nghiệp: điểm mạnh và lưu ý
- Vận tài chính: cách kiếm tiền, quản lý và đầu tư
- Chu kỳ tài chính may mắn và cần cẩn trọng
- Thời điểm tốt để: thay đổi công việc, đàm phán lương, mở rộng kinh doanh
- Lời khuyên để đạt thành công trong sự nghiệp
- Lộ trình phát triển sự nghiệp 5-10 năm

## PHẦN 6: LỜI KHUYÊN PHÁT TRIỂN BẢN THÂN (500-700 từ)
- Kỹ năng cần rèn luyện ưu tiên
- Thói quen tốt nên xây dựng hàng ngày
- Hoạt động phù hợp: thể thao, sở thích, thiền định
- Cách khai thác tiềm năng tối đa
- Mục tiêu ngắn hạn và dài hạn nên đặt ra
- Những điều cần thay đổi để cải thiện cuộc sống
- Lời khuyên tâm linh và phát triển nội tâm
`;

  if (isPremium) {
    return (
      basePrompt +
      `

## PHẦN 7: DỰ ĐOÁN CHI TIẾT 12 THÁNG TỚI (1500-2000 từ)
Phân tích cụ thể từng tháng với:
- Tháng 1: Vận thế chung, cơ hội, thách thức, tình yêu, sự nghiệp, tài chính, sức khỏe, con số may mắn, lời khuyên
- Tháng 2: [tương tự]
- Tháng 3: [tương tự]
- Tháng 4: [tương tự]
- Tháng 5: [tương tự]
- Tháng 6: [tương tự]
- Tháng 7: [tương tự]
- Tháng 8: [tương tự]
- Tháng 9: [tương tự]
- Tháng 10: [tương tự]
- Tháng 11: [tương tự]
- Tháng 12: [tương tự]

## PHẦN 8: PHÂN TÍCH TƯƠNG THÍCH SÂU (700-900 từ)
- Bảng tương thích chi tiết với 9 con số chủ đạo (1-9)
- Với số 1: Điểm tương thích (x/10), phân tích, lời khuyên
- Với số 2: [tương tự]
- Với số 3: [tương tự]
- ... (đến số 9)
- Con số hợp nhất và con số xung khắc
- Cách tận dụng mối quan hệ tốt
- Cách hóa giải xung khắc

## PHẦN 9: CÁC CHU KỲ VÀ THỜI ĐIỂM QUAN TRỌNG (500-700 từ)
- Chu kỳ 9 năm: bạn đang ở năm nào? ý nghĩa?
- Các năm cá nhân: phân tích năm nay và 2 năm tới
- Thời điểm tốt để: kết hôn, sinh con, mua nhà, đầu tư lớn
- Thời điểm cần cẩn trọng và né tránh
- Ngày tháng may mắn dựa trên các con số
- Hướng may mắn trong không gian sống

## PHẦN 10: PHÂN TÍCH SÂU VỀ SỨ MỆNH CUỘC ĐỜI (600-800 từ)
- Mục đích cuộc đời được ghi trong các con số
- Bài học quan trọng nhất cần học
- Đóng góp của bạn cho xã hội và thế giới
- Những thử thách lớn sẽ gặp và ý nghĩa của chúng
- Giai đoạn vàng trong cuộc đời (độ tuổi nào?)
- Di sản bạn muốn để lại
- Lộ trình hoàn thiện bản thân

## PHẦN 11: CON SỐ THIẾU VÀ BÀI HỌC KARMA (400-600 từ)
- Những con số thiếu trong tên và ngày sinh
- Ý nghĩa của việc thiếu các con số này
- Bài học karma từ kiếp trước (nếu có)
- Cách bù đắp và cân bằng năng lượng
- Những thử thách đặc biệt do thiếu con số

YÊU CẦU TỔNG THỂ:
- Tổng cộng ít nhất 5000-6000 từ cho Premium, càng chi tiết càng tốt
- Mỗi phần phải có nhiều đoạn văn với thông tin cụ thể
- Sử dụng ví dụ thực tế, dễ hình dung
- Ngôn ngữ ấm áp, gần gũi nhưng chuyên nghiệp
- Đưa ra lời khuyên cụ thể, có thể áp dụng ngay
- Mang tính cá nhân hóa cực kỳ cao
- Mỗi tháng phải có ít nhất 120-150 từ phân tích
`
    );
  }

  return basePrompt + `

Hãy viết ít nhất 1500-2000 từ, bao gồm đầy đủ các phần chính:
- Phân tích số Đường Đời (300-400 từ)
- Tính cách và bản chất (300-400 từ)
- Điểm mạnh và điểm yếu (250-350 từ)
- Tình yêu và quan hệ (250-350 từ)
- Sự nghiệp và tài chính (300-400 từ)
- Lời khuyên phát triển (200-300 từ)

Viết chi tiết, cụ thể, có giá trị thực tiễn. Mỗi phần phải có nhiều đoạn văn với thông tin rõ ràng, không nói chung chung.`;
}

/**
 * Tạo prompt cho phân tích Tử vi
 */
function createHoroscopePrompt(
  birthDate: string,
  result: HoroscopeResult,
  isPremium: boolean
): string {
  const basePrompt = `
Bạn là một chuyên gia Tử vi và Chiêm tinh học người Việt Nam với nhiều năm kinh nghiệm.

Thông tin khách hàng:
- Ngày sinh: ${birthDate}
- Cung hoàng đạo: ${result.zodiacSign}
- Con giáp: ${result.chineseZodiac}
- Ngũ hành: ${result.element}
- Thời kỳ may mắn: ${result.luckyPeriods.join(', ')}

QUAN TRỌNG: Hãy viết một báo cáo TỬ VI CỰC KỲ CHI TIẾT VÀ ĐẦY ĐỦ với các phần sau:

## PHẦN 1: PHÂN TÍCH BẢN MỆNH (400-600 từ)
- Đặc điểm chi tiết của cung hoàng đạo ${result.zodiacSign}: tính cách, sở thích, điểm mạnh, điểm yếu
- Ảnh hưởng của con giáp ${result.chineseZodiac} đến vận mệnh
- Phân tích ngũ hành ${result.element}: ảnh hưởng đến sức khỏe, tính cách, nghề nghiệp phù hợp
- Bản chất nội tâm và cách nhìn nhận cuộc sống
- Khả năng đặc biệt và tài năng tiềm ẩn

## PHẦN 2: TỬ VI TỔNG QUAN NĂM NAY (500-700 từ)
- Vận thế chung của năm: thăng trầm, cơ hội, thách thức
- Những tháng may mắn nhất trong năm và cách tận dụng
- Những tháng cần cẩn trọng và cách hóa giải
- Dự báo các sự kiện quan trọng có thể xảy ra
- Hướng phát triển tổng thể cho cả năm

## PHẦN 3: TÌNH YÊU VÀ CÁC MỐI QUAN HỆ (500-700 từ)
- Vận tình duyên trong năm nay: độc thân và đã có người yêu
- Thời điểm thuận lợi để tìm kiếm tình yêu hoặc cải thiện quan hệ
- Phân tích tương thích với các cung hoàng đạo khác (liệt kê cụ thể 3-4 cung)
- Các mối quan hệ gia đình, bạn bè: cách cải thiện và duy trì
- Lời khuyên cụ thể để có hạnh phúc trong tình yêu
- Những điều cần tránh trong các mối quan hệ

## PHẦN 4: SỰ NGHIỆP VÀ TÀI CHÍNH (600-800 từ)
- Vận trình sự nghiệp: thăng tiến, thay đổi, cơ hội mới
- Những lĩnh vực nghề nghiệp phù hợp nhất dựa trên ngũ hành và cung hoàng đạo
- Thời điểm tốt để: xin việc mới, đàm phán lương, khởi nghiệp, đầu tư
- Vận tài chính: thu nhập, chi tiêu, tiết kiệm, đầu tư
- Những tháng tài chính thuận lợi và cần cẩn trọng
- Lời khuyên cụ thể về quản lý tài chính
- Hướng phát triển sự nghiệp dài hạn (3-5 năm tới)

## PHẦN 5: SỨC KHỎE VÀ TINH THẦN (400-600 từ)
- Dự báo sức khỏe tổng thể trong năm
- Những bộ phận cơ thể cần chú ý đặc biệt (dựa trên ngũ hành)
- Lời khuyên về chế độ ăn uống, tập luyện phù hợp
- Sức khỏe tinh thần: căng thẳng, lo âu và cách giải tỏa
- Thời kỳ cần nghỉ ngơi và chăm sóc bản thân
- Các liệu pháp tự nhiên phù hợp với bản mệnh

## PHẦN 6: DỰ BÁO CHI TIẾT 12 THÁNG (1200-1500 từ)
Phân tích cụ thể từng tháng trong năm với:
- Tháng 1: Vận thế chung, tình yêu, sự nghiệp, tài chính, sức khỏe, lời khuyên
- Tháng 2: [tương tự]
- Tháng 3: [tương tự]
- Tháng 4: [tương tự]
- Tháng 5: [tương tự]
- Tháng 6: [tương tự]
- Tháng 7: [tương tự]
- Tháng 8: [tương tự]
- Tháng 9: [tương tự]
- Tháng 10: [tương tự]
- Tháng 11: [tương tự]
- Tháng 12: [tương tự]

## PHẦN 7: CÁC THỜI ĐIỂM QUAN TRỌNG (300-400 từ)
- Ngày tốt để: khai trương, khởi công, ký hợp đồng, cưới xin
- Ngày nên tránh các quyết định lớn
- Giờ tốt trong ngày để làm việc quan trọng
- Hướng may mắn khi đi lại, làm việc

## PHẦN 8: LỜI KHUYÊN PHÁT TRIỂN BẢN THÂN (400-600 từ)
- Mục tiêu nên đặt ra trong năm nay
- Kỹ năng cần rèn luyện và phát triển
- Thói quen tốt nên xây dựng
- Điều cần thay đổi để cải thiện cuộc sống
- Cách khai thác tối đa tiềm năng của bản thân
- Định hướng phát triển 5-10 năm tới
`;

  if (isPremium) {
    return (
      basePrompt +
      `

## PHẦN 9: PHÂN TÍCH TƯƠNG THÍCH CHI TIẾT (500-700 từ)
- Tương thích với 12 cung hoàng đạo (liệt kê từng cung với điểm số và phân tích)
- Cung hợp nhất, cung xung khắc
- Cách hóa giải xung khắc
- Bạn đời lý tưởng dựa trên ngày sinh
- Lời khuyên khi kết hợp với từng loại cung hoàng đạo

## PHẦN 10: DỰ BÁO DÀI HẠN (400-600 từ)
- Xu hướng vận mệnh 3 năm tới (tổng quan)
- Giai đoạn vàng trong cuộc đời (độ tuổi nào?)
- Những thử thách lớn có thể gặp phải và cách vượt qua
- Thời điểm thích hợp để: kết hôn, sinh con, mua nhà, đầu tư lớn
- Lộ trình phát triển sự nghiệp dài hạn

YÊU CẦU TỔNG THỂ:
- Tổng cộng ít nhất 4000-5000 từ, càng chi tiết càng tốt
- Mỗi phần phải có ít nhất 2-3 đoạn văn cụ thể
- Sử dụng ví dụ thực tế, dễ hình dung
- Ngôn ngữ ấm áp, chuyên nghiệp nhưng gần gũi
- Đưa ra lời khuyên cụ thể, có thể áp dụng ngay
- Tránh nói chung chung, phải mang tính cá nhân hóa cao
- Mỗi tháng trong năm phải có ít nhất 100-120 từ phân tích chi tiết
`
    );
  }

  return basePrompt + `

Hãy viết ít nhất 1200-1500 từ, bao gồm đầy đủ các phần chính:
- Phân tích bản mệnh (200-300 từ)
- Tử vi tổng quan năm nay (200-300 từ)
- Tình yêu và quan hệ (200-250 từ)
- Sự nghiệp và tài chính (250-300 từ)
- Sức khỏe (150-200 từ)
- Lời khuyên phát triển (150-200 từ)

Viết chi tiết, cụ thể, có giá trị thực tiễn. Mỗi phần phải có nhiều đoạn văn với thông tin rõ ràng.`;
}

/**
 * Gọi OpenAI API để tạo nội dung phân tích Thần số học
 */
export async function generateNumerologyAnalysis(
  name: string,
  numbers: NumerologyNumbers,
  isPremium: boolean = false
): Promise<string> {
  try {
    const prompt = createNumerologyPrompt(name, numbers, isPremium);

    const completion = await openai.chat.completions.create({
      model: 'gpt-5',
      messages: [
        {
          role: 'system',
          content:
            'Bạn là một chuyên gia Thần số học (Numerology) người Việt Nam, có kiến thức sâu rộng và khả năng phán tích chính xác, chi tiết. Bạn luôn viết các báo cáo dài, đầy đủ và cực kỳ chi tiết để mang lại giá trị tối đa cho khách hàng. Bạn KHÔNG BAO GIỜ viết ngắn hay sơ sài.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_completion_tokens: isPremium ? 10000 : 4000,
    });

    return completion.choices[0]?.message?.content || 'Không thể tạo phân tích lúc này.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Không thể kết nối với dịch vụ AI. Vui lòng thử lại sau.');
  }
}

/**
 * Gọi OpenAI API để tạo nội dung phân tích Tử vi
 */
export async function generateHoroscopeAnalysis(
  birthDate: string,
  result: HoroscopeResult,
  isPremium: boolean = false
): Promise<string> {
  try {
    const prompt = createHoroscopePrompt(birthDate, result, isPremium);

    const completion = await openai.chat.completions.create({
      model: 'gpt-5',
      messages: [
        {
          role: 'system',
          content:
            'Bạn là một chuyên gia Tử vi và Chiêm tinh học người Việt Nam, có kiến thức sâu về văn hóa phương Đông và khả năng phân tích chính xác, chi tiết. Bạn luôn viết các báo cáo dài, đầy đủ và cực kỳ chi tiết để mang lại giá trị tối đa cho khách hàng.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_completion_tokens: isPremium ? 8000 : 3000,
    });

    return completion.choices[0]?.message?.content || 'Không thể tạo phân tích lúc này.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Không thể kết nối với dịch vụ AI. Vui lòng thử lại sau.');
  }
}

/**
 * Tạo dự đoán ngắn hạn (hàng ngày/tuần)
 */
export async function generateDailyPrediction(zodiacSign: string): Promise<string> {
  try {
    const prompt = `
Bạn là chuyên gia chiêm tinh. Hãy tạo dự đoán ngắn gọn cho cung ${zodiacSign} hôm nay về:
- Tổng quan ngày
- Tình yêu
- Công việc
- Sức khỏe
- Lời khuyên

Viết bằng tiếng Việt, ngắn gọn (200-300 từ), tích cực và đầy năng lượng.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-5-mini',
      messages: [
        {
          role: 'system',
          content: 'Bạn là chuyên gia chiêm tinh học người Việt Nam.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_completion_tokens: 500,
    });

    return completion.choices[0]?.message?.content || 'Không thể tạo dự đoán lúc này.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Không thể kết nối với dịch vụ AI.');
  }
}

/**
 * Tạo nội dung blog về Thần số học hoặc Tử vi
 */
export async function generateBlogContent(
  topic: string,
  category: 'numerology' | 'horoscope' | 'tips'
): Promise<{ title: string; content: string; excerpt: string }> {
  try {
    const categoryName = {
      numerology: 'Thần số học',
      horoscope: 'Tử vi và Chiêm tinh',
      tips: 'Mẹo và Lời khuyên',
    };

    const prompt = `
Hãy viết một bài blog chi tiết về chủ đề "${topic}" trong lĩnh vực ${categoryName[category]}.

Yêu cầu:
1. Tiêu đề hấp dẫn, SEO-friendly
2. Nội dung chi tiết 800-1200 từ
3. Cấu trúc rõ ràng với các tiêu đề phụ
4. Ngôn ngữ dễ hiểu, thân thiện
5. Có giá trị thực tiễn cho người đọc
6. Kết thúc với lời khuyên hoặc call-to-action

Định dạng output JSON:
{
  "title": "Tiêu đề bài viết",
  "excerpt": "Tóm tắt ngắn 2-3 câu",
  "content": "Nội dung đầy đủ với markdown formatting"
}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-5',
      messages: [
        {
          role: 'system',
          content: 'Bạn là một content writer chuyên nghiệp về Thần số học và Tử vi.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_completion_tokens: 3000,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
    return {
      title: result.title || topic,
      content: result.content || '',
      excerpt: result.excerpt || '',
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Không thể tạo nội dung blog.');
  }
}
