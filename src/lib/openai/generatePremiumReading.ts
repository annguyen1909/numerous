/**
 * OpenAI Premium Reading Generator
 * Generate structured premium content for PDF reports
 */

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface PremiumReadingInput {
  fullName: string;
  birthDate: string;
  readingType: 'thansohoc' | 'tuvi' | 'chieusinh' | 'tinhcach';
}

export interface PremiumReadingOutput {
  title: string;
  subtitle: string;
  sections: {
    heading: string;
    content: string;
    highlights?: string[];
  }[];
  summary: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  forecast: {
    year: string;
    predictions: string[];
  };
  personalizedAdvice: string[];
}

/**
 * Generate premium reading content using OpenAI
 */
export async function generatePremiumReading(
  input: PremiumReadingInput
): Promise<PremiumReadingOutput> {
  const { fullName, birthDate, readingType } = input;

  // Map reading type to Vietnamese titles
  const readingTitles: Record<typeof readingType, string> = {
    thansohoc: 'Thần Số Học',
    tuvi: 'Tử Vi',
    chieusinh: 'Chiêu Sinh',
    tinhcach: 'Tính Cách',
  };

  const title = `Báo Cáo ${readingTitles[readingType]} Cao Cấp`;

  // Create detailed prompt for OpenAI
  const prompt = `Bạn là chuyên gia ${readingTitles[readingType]} hàng đầu Việt Nam với 20 năm kinh nghiệm.

Hãy tạo một báo cáo ${readingTitles[readingType]} chuyên sâu, chi tiết và cá nhân hóa cho:
- Họ tên: ${fullName}
- Ngày sinh: ${birthDate}

Yêu cầu báo cáo:
1. Phân tích sâu về con số chủ đạo, đường đời, linh hồn, sứ mệnh
2. Tính cách chi tiết: điểm mạnh, điểm yếu, tài năng ẩn
3. Vận mệnh từng giai đoạn cuộc đời
4. Dự báo chi tiết cho năm 2025-2026
5. Lời khuyên cá nhân hóa về sự nghiệp, tình cảm, tài chính, sức khỏe
6. Những con số may mắn, màu sắc, hướng đi phù hợp

Trả về JSON với cấu trúc sau:
{
  "sections": [
    {
      "heading": "Tên section",
      "content": "Nội dung chi tiết, tối thiểu 300 từ",
      "highlights": ["Điểm nổi bật 1", "Điểm nổi bật 2"]
    }
  ],
  "summary": {
    "strengths": ["Điểm mạnh 1", "Điểm mạnh 2", ...],
    "weaknesses": ["Điểm yếu 1", "Điểm yếu 2", ...],
    "recommendations": ["Khuyến nghị 1", "Khuyến nghị 2", ...]
  },
  "forecast": {
    "year": "2025-2026",
    "predictions": ["Dự báo 1", "Dự báo 2", ...]
  },
  "personalizedAdvice": ["Lời khuyên 1", "Lời khuyên 2", ...]
}

Hãy viết chuyên nghiệp, chi tiết và thuyết phục như một chuyên gia thực thụ.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-5',
      messages: [
        {
          role: 'system',
          content: `Bạn là chuyên gia ${readingTitles[readingType]} hàng đầu. Phân tích chi tiết, chuyên sâu và cá nhân hóa. Trả về JSON hợp lệ.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      // Some models do not support the structured response_format param; request JSON in the prompt instead
      temperature: 1,
      max_completion_tokens: 4000,
    });

    let content = completion.choices[0]?.message?.content;
    if (!content || typeof content !== 'string') {
      throw new Error('No content generated from OpenAI');
    }

    // The model may include surrounding text; try to extract the first JSON object substring
    const firstBrace = content.indexOf('{');
    const lastBrace = content.lastIndexOf('}');
    let parsed;
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const jsonStr = content.slice(firstBrace, lastBrace + 1);
      parsed = JSON.parse(jsonStr);
    } else {
      // As a last resort, try direct parse
      parsed = JSON.parse(content);
    }

    return {
      title,
      subtitle: `Dành riêng cho ${fullName}`,
      sections: parsed.sections || [],
      summary: parsed.summary || { strengths: [], weaknesses: [], recommendations: [] },
      forecast: parsed.forecast || { year: '2025-2026', predictions: [] },
      personalizedAdvice: parsed.personalizedAdvice || [],
    };
  } catch (error) {
    console.error('OpenAI generation error:', error);
    
    // Fallback with structured dummy data if API fails
    return {
      title,
      subtitle: `Dành riêng cho ${fullName}`,
      sections: [
        {
          heading: '1. Con Số Chủ Đạo & Tổng Quan',
          content: `Dựa trên ngày sinh ${birthDate}, con số chủ đạo của bạn mang những đặc điểm độc đáo và quan trọng trong hành trình cuộc đời. Đây là nền tảng định hình tính cách, khả năng và vận mệnh của bạn.`,
          highlights: ['Con số chủ đạo ảnh hưởng sâu sắc', 'Định hình tính cách cốt lõi'],
        },
        {
          heading: '2. Tính Cách – Điểm Mạnh – Điểm Yếu',
          content: `Bạn sở hữu những điểm mạnh vượt trội cần được phát huy tối đa. Đồng thời, việc nhận thức và khắc phục điểm yếu sẽ giúp bạn phát triển toàn diện hơn.`,
          highlights: ['Tài năng lãnh đạo tự nhiên', 'Khả năng sáng tạo độc đáo'],
        },
        {
          heading: '3. Đường Đời – Sứ Mệnh – Linh Hồn',
          content: `Đường đời của bạn được định trước với những thử thách và cơ hội đặc biệt. Hiểu rõ sứ mệnh sẽ giúp bạn tìm thấy ý nghĩa và phương hướng trong cuộc sống.`,
        },
        {
          heading: '4. Dự Báo 2025-2026',
          content: `Năm 2025-2026 sẽ là thời kỳ quan trọng với nhiều cơ hội phát triển. Hãy nắm bắt đúng thời điểm để đạt được thành công vượt bậc.`,
        },
        {
          heading: '5. Lời Khuyên Cá Nhân Hóa',
          content: `Dựa trên phân tích chi tiết, đây là những khuyến nghị quan trọng giúp bạn tối ưu hóa tiềm năng và vượt qua thách thức.`,
        },
      ],
      summary: {
        strengths: [
          'Tư duy logic và phân tích tốt',
          'Khả năng giao tiếp xuất sắc',
          'Tinh thần trách nhiệm cao',
          'Sáng tạo và đổi mới',
        ],
        weaknesses: [
          'Đôi khi quá cầu toàn',
          'Có thể áp lực bản thân quá mức',
          'Cần cân bằng giữa công việc và cuộc sống',
        ],
        recommendations: [
          'Phát triển kỹ năng lãnh đạo',
          'Đầu tư vào học tập liên tục',
          'Xây dựng mạng lưới quan hệ mạnh mẽ',
          'Chú ý sức khỏe tinh thần',
        ],
      },
      forecast: {
        year: '2025-2026',
        predictions: [
          'Sự nghiệp: Cơ hội thăng tiến vào quý 2/2025',
          'Tài chính: Đầu tư thông minh sẽ sinh lời tốt',
          'Tình cảm: Mối quan hệ phát triển ổn định',
          'Sức khỏe: Cần chú ý điều độ và nghỉ ngơi',
        ],
      },
      personalizedAdvice: [
        'Hãy tin tưởng vào trực giác của bạn trong các quyết định quan trọng',
        'Dành thời gian cho gia đình và người thân',
        'Đầu tư vào phát triển bản thân và học hỏi kỹ năng mới',
        'Giữ thái độ tích cực và lạc quan trước mọi thử thách',
      ],
    };
  }
}
