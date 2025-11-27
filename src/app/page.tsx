/**
 * Homepage - Mystic Minimalism Design
 * Complete redesign with ShadCN UI components and Lucide icons
 */

import Link from 'next/link';
import { Sparkles, Star, Users, Target, Zap, Crown, TrendingUp, Shield, Calculator, Eye, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Hero from '@/components/sections/Hero';
import FeatureCards from '@/components/sections/FeatureCards';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section (wired to reusable component) */}
      <Hero />

      <Separator className="max-w-7xl mx-auto" />

      {/* Features Section (wired to reusable component) */}
      <FeatureCards />

      <Separator className="max-w-7xl mx-auto" />

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Cách Thức Hoạt Động
            </h2>
            <p className="text-lg text-[#a1a1aa]">Chỉ 3 bước đơn giản để nhận báo cáo của bạn</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-[#6B4BFF]/20 rounded-full blur-xl" />
                  <div className="relative w-20 h-20 bg-[#6B4BFF]/10 border-2 border-[#6B4BFF] rounded-full flex items-center justify-center text-3xl font-bold text-[#6B4BFF]">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold">Nhập Thông Tin</h3>
                <p className="text-[#a1a1aa]">
                  Điền tên đầy đủ và ngày sinh của bạn vào form đơn giản
                </p>
              </div>
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-3/4 w-1/2 h-0.5 bg-border/40" />
            </div>

            <div className="relative">
              <div className="text-center space-y-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-[#8B5CF6]/20 rounded-full blur-xl" />
                  <div className="relative w-20 h-20 bg-[#8B5CF6]/10 border-2 border-[#8B5CF6] rounded-full flex items-center justify-center text-3xl font-bold text-[#8B5CF6]">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold">AI Phân Tích</h3>
                <p className="text-[#a1a1aa]">
                  Hệ thống AI phân tích và tạo báo cáo chi tiết dựa trên dữ liệu của bạn
                </p>
              </div>
              <div className="hidden md:block absolute top-10 left-3/4 w-1/2 h-0.5 bg-border/40" />
            </div>

            <div className="text-center space-y-4">
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-[#FFAC33]/20 rounded-full blur-xl" />
                <div className="relative w-20 h-20 bg-[#FFAC33]/10 border-2 border-[#FFAC33] rounded-full flex items-center justify-center text-3xl font-bold text-[#FFAC33]">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold">Nhận Kết Quả</h3>
              <p className="text-[#a1a1aa]">
                Xem ngay báo cáo miễn phí hoặc nâng cấp Premium để có báo cáo đầy đủ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-[#6B4BFF]/20 to-[#8B5CF6]/20" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#6B4BFF]/10 rounded-full blur-[120px]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Sẵn Sàng Khám Phá Chính Mình?
          </h2>
          <p className="text-xl text-[#a1a1aa] leading-relaxed">
            Hàng ngàn người đã tin tưởng và hài lòng với dịch vụ của chúng tôi.
            <br />
            Đến lượt bạn khám phá bí mật của cuộc đời mình!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/calculator">
                <Sparkles className="w-5 h-5" />
                Bắt Đầu Miễn Phí
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/premium">
                <Eye className="w-5 h-5" />
                Xem Gói Premium
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
