/**
 * Horoscope Form Component
 * Form nhập liệu xem Tử vi
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HoroscopeInput } from '@/types';
import { Lightbulb, Star, Target, Heart, Bot, Gift } from 'lucide-react';

// Validation schema
const horoscopeSchema = z.object({
  birthDate: z.string()
    .min(1, 'Vui lòng nhập ngày sinh')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Ngày sinh phải theo định dạng dd/mm/yyyy'),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
});

type HoroscopeFormData = z.infer<typeof horoscopeSchema>;

interface HoroscopeFormProps {
  onSubmit: (data: HoroscopeInput) => void;
  isLoading?: boolean;
}

export default function HoroscopeForm({ onSubmit, isLoading = false }: HoroscopeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HoroscopeFormData>({
    resolver: zodResolver(horoscopeSchema),
  });

  // Convert dd/mm/yyyy to yyyy-mm-dd for backend
  const convertToISODate = (ddmmyyyy: string): string => {
    const [day, month, year] = ddmmyyyy.split('/');
    return `${year}-${month}-${day}`;
  };

  const onFormSubmit = (data: HoroscopeFormData) => {
    const payload = {
      ...data,
      birthDate: convertToISODate(data.birthDate),
    };
    onSubmit(payload as any);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Ngày sinh */}
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-[#e4e4e7] mb-2">
          Ngày Sinh <span className="text-red-400">*</span>
        </label>
        <input
          {...register('birthDate')}
          type="text"
          id="birthDate"
          placeholder="dd/mm/yyyy"
          disabled={isLoading}
          maxLength={10}
          className={`w-full px-4 py-3 bg-[#27272a] text-[#fafafa] placeholder:text-[#71717a] border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
            errors.birthDate ? 'border-red-500' : 'border-[#3f3f46]'
          } ${isLoading ? 'bg-[#18181b] cursor-not-allowed opacity-50' : ''}`}
        />
        {errors.birthDate && (
          <p className="mt-1 text-sm text-red-500">{errors.birthDate.message}</p>
        )}
        <p className="mt-1 text-xs text-[#a1a1aa]">
          Ví dụ: 15/08/1990
        </p>
      </div>

      {/* Giờ sinh (tùy chọn) */}
      <div>
        <label htmlFor="birthTime" className="block text-sm font-medium text-[#e4e4e7] mb-2">
          Giờ Sinh <span className="text-[#a1a1aa] text-xs">(Tùy chọn - để kết quả chính xác hơn)</span>
        </label>
        <input
          {...register('birthTime')}
          type="time"
          id="birthTime"
          disabled={isLoading}
          className="w-full px-4 py-3 bg-[#27272a] text-[#fafafa] border border-[#3f3f46] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <p className="mt-1 text-xs text-[#a1a1aa] flex items-center gap-1">
          <Lightbulb className="w-3 h-3" />
          Giờ sinh giúp phân tích chính xác hơn về giờ hoàng đạo
        </p>
      </div>

      {/* Nơi sinh (tùy chọn) */}
      <div>
        <label htmlFor="birthPlace" className="block text-sm font-medium text-[#e4e4e7] mb-2">
          Nơi Sinh <span className="text-[#a1a1aa] text-xs">(Tùy chọn)</span>
        </label>
        <input
          {...register('birthPlace')}
          type="text"
          id="birthPlace"
          placeholder="Ví dụ: Hà Nội, Việt Nam"
          disabled={isLoading}
          className="w-full px-4 py-3 bg-[#27272a] text-[#fafafa] placeholder:text-[#71717a] border border-[#3f3f46] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Giới tính (tùy chọn) */}
      <div>
        <label className="block text-sm font-medium text-[#e4e4e7] mb-2">
          Giới Tính <span className="text-[#a1a1aa] text-xs">(Tùy chọn)</span>
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              {...register('gender')}
              type="radio"
              value="male"
              disabled={isLoading}
              className="w-4 h-4 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-[#e4e4e7]">Nam</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              {...register('gender')}
              type="radio"
              value="female"
              disabled={isLoading}
              className="w-4 h-4 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-[#e4e4e7]">Nữ</span>
          </label>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg
            className="w-6 h-6 text-blue-400 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-[#e4e4e7] mb-1">Bạn sẽ nhận được gì?</h4>
            <ul className="text-sm text-[#d4d4d8] space-y-1">
              <li className="flex items-center gap-1"><Star className="w-4 h-4" /> Phân tích cung hoàng đạo và con giáp</li>
              <li className="flex items-center gap-1"><Target className="w-4 h-4" /> Tử vi tổng quan cho năm nay</li>
              <li className="flex items-center gap-1"><Heart className="w-4 h-4" /> Tình yêu, sự nghiệp, sức khỏe</li>
              <li className="flex items-center gap-1"><Bot className="w-4 h-4" /> Dự đoán và lời khuyên từ AI</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all transform ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Đang phân tích...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Star className="w-5 h-5" />
            Xem Tử Vi Miễn Phí
          </span>
        )}
      </button>

      {/* Note about premium */}
      <div className="text-center">
        <p className="text-sm text-[#a1a1aa]">
          <Gift className="w-4 h-4 inline-block mr-1" />
          Tử vi miễn phí • 
          <a href="/premium" className="text-blue-400 hover:text-blue-300 font-medium ml-1">
            Nâng cấp Premium
          </a>{' '}
          để nhận tử vi cả năm chi tiết
        </p>
      </div>
    </form>
  );
}
