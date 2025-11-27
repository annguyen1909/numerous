import Link from 'next/link';
import { Sparkles, Users, Target, Zap, Shield, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Hero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#6B4BFF]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#8B5CF6]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B4BFF]/10 border border-[#6B4BFF]/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#6B4BFF]" />
              <span className="text-sm font-medium text-[#6B4BFF]">Khám phá bí mật của con số</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-linear-to-r from-[#fafafa] via-[#8B5CF6] to-[#6B4BFF] bg-clip-text text-transparent">Thần Số Học</span>
                <br />
                <span className="bg-linear-to-r from-[#FFAC33] via-amber-400 to-[#FFAC33] bg-clip-text text-transparent">& Tử Vi Của Bạn</span>
              </h1>
              <p className="text-lg md:text-xl text-[#a1a1aa] leading-relaxed max-w-2xl">
                Khám phá con đường cuộc đời, tính cách, và vận mệnh của bạn thông qua Thần số học và Tử vi. Nhận báo cáo chi tiết được phân tích bởi AI chuyên nghiệp.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/calculator">
                  <Sparkles className="w-5 h-5" />
                  Tính Thần Số Học Miễn Phí
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/premium">
                  <Crown className="w-5 h-5" />
                  Nhận Báo Cáo Premium
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center space-y-2">
                <Users className="w-8 h-8 text-[#6B4BFF] mx-auto" />
                <div className="text-3xl font-bold">10,000+</div>
                <p className="text-sm text-[#a1a1aa]">Người dùng hài lòng</p>
              </CardContent>
            </Card>
            <Card className="hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center space-y-2">
                <Target className="w-8 h-8 text-[#8B5CF6] mx-auto" />
                <div className="text-3xl font-bold">98%</div>
                <p className="text-sm text-[#a1a1aa]">Độ chính xác</p>
              </CardContent>
            </Card>
            <Card className="hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center space-y-2">
                <Zap className="w-8 h-8 text-[#FFAC33] mx-auto" />
                <div className="text-3xl font-bold">24/7</div>
                <p className="text-sm text-[#a1a1aa]">Hỗ trợ</p>
              </CardContent>
            </Card>
            <Card className="hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center space-y-2">
                <Shield className="w-8 h-8 text-[#6B4BFF] mx-auto" />
                <div className="text-3xl font-bold">AI</div>
                <p className="text-sm text-[#a1a1aa]">Phân tích thông minh</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
