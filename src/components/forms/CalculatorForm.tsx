/**
 * Numerology Calculator Form Component
 * Form nhập liệu tính Thần số học
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NumerologyInput } from '@/types';
import { Lightbulb, Sparkles, Target, Palette, Bot, Gift } from 'lucide-react';

// Validation schema
const numerologySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(100, 'Tên không được quá 100 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái và khoảng trắng'),
  birthDate: z.string()
    .min(1, 'Vui lòng nhập ngày sinh')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Ngày sinh phải theo định dạng dd/mm/yyyy'),
});

type NumerologyFormData = z.infer<typeof numerologySchema>;

interface CalculatorFormProps {
  onSubmit: (data: NumerologyInput) => void;
  isLoading?: boolean;
}

export default function CalculatorForm({ onSubmit, isLoading = false }: CalculatorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NumerologyFormData>({
    resolver: zodResolver(numerologySchema),
  });

  // Convert dd/mm/yyyy to yyyy-mm-dd for backend
  const convertToISODate = (ddmmyyyy: string): string => {
    const [day, month, year] = ddmmyyyy.split('/');
    return `${year}-${month}-${day}`;
  };

  const onFormSubmit = (data: NumerologyFormData) => {
    const payload = {
      ...data,
      birthDate: convertToISODate(data.birthDate),
    };
    onSubmit(payload as any);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Họ và tên */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[#e4e4e7] mb-2">
          Họ và Tên Đầy Đủ <span className="text-red-400">*</span>
        </label>
        <input
          {...register('fullName')}
          type="text"
          id="fullName"
          placeholder="Ví dụ: Nguyễn Văn An"
          disabled={isLoading}
          className={`w-full px-4 py-3 border bg-[#27272a] text-[#fafafa] placeholder:text-[#71717a] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
            errors.fullName ? 'border-red-500' : 'border-[#3f3f46]'
          } ${isLoading ? 'bg-[#18181b] cursor-not-allowed opacity-50' : ''}`}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
        )}
        <p className="mt-1 text-xs text-[#a1a1aa] flex items-center gap-1">
          <Lightbulb className="w-3 h-3" />
          Nhập tên đầy đủ như trong giấy khai sinh để kết quả chính xác nhất
        </p>
      </div>

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
          className={`w-full px-4 py-3 bg-[#27272a] text-[#fafafa] placeholder:text-[#71717a] border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
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

      {/* Info box */}
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg
            className="w-6 h-6 text-purple-400 shrink-0 mt-0.5"
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
            <h4 className="text-sm font-semibold text-[#e4e4e7] mb-1">
              Bạn sẽ nhận được gì?
            </h4>
            <ul className="text-sm text-[#d4d4d8] space-y-1">
              <li className="flex items-center gap-1"><Sparkles className="w-4 h-4" /> Phân tích 5 con số chính trong cuộc đời bạn</li>
              <li className="flex items-center gap-1"><Target className="w-4 h-4" /> Điểm mạnh, điểm yếu và nghề nghiệp phù hợp</li>
              <li className="flex items-center gap-1"><Palette className="w-4 h-4" /> Màu sắc và số may mắn của bạn</li>
              <li className="flex items-center gap-1"><Bot className="w-4 h-4" /> Báo cáo chi tiết được phân tích bởi AI</li>
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
            : 'bg-purple-600 hover:bg-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
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
            <Sparkles className="w-5 h-5" />
            Tính Thần Số Học Miễn Phí
          </span>
        )}
      </button>

      {/* Note about premium */}
      <div className="text-center">
        <p className="text-sm text-[#a1a1aa]">
          <Gift className="w-4 h-4 inline-block mr-1" />
          Báo cáo miễn phí • 
          <a href="/premium" className="text-purple-400 hover:text-purple-300 font-medium ml-1">
            Nâng cấp Premium
          </a>{' '}
          để nhận phân tích sâu hơn
        </p>
      </div>
    </form>
  );
}
