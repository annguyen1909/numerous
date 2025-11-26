/**
 * Homepage - Mystic Minimalism Design
 * Complete redesign with ShadCN UI components and Lucide icons
 */

import Link from 'next/link';
import { Sparkles, Star, Users, Target, Zap, Crown, TrendingUp, Shield, Calculator, Eye, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Radial gradient aura */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#6B4BFF]/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#8B5CF6]/15 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B4BFF]/10 border border-[#6B4BFF]/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#6B4BFF]" />
                <span className="text-sm font-medium text-[#6B4BFF]">Khám phá bí mật của con số</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-linear-to-r from-[#fafafa] via-[#8B5CF6] to-[#6B4BFF] bg-clip-text text-transparent">
                    Thần Số Học
                  </span>
                  <br />
                  <span className="bg-linear-to-r from-[#FFAC33] via-amber-400 to-[#FFAC33] bg-clip-text text-transparent">
                    & Tử Vi Của Bạn
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-[#a1a1aa] leading-relaxed max-w-2xl">
                  Khám phá con đường cuộc đời, tính cách, và vận mệnh của bạn thông qua Thần số học
                  và Tử vi. Nhận báo cáo chi tiết được phân tích bởi AI chuyên nghiệp.
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

            {/* Right Content - Stats Grid */}
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

      <Separator className="max-w-7xl mx-auto" />

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Dịch Vụ Của Chúng Tôi
            </h2>
            <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
              Khám phá đầy đủ các dịch vụ phân tích Thần số học và Tử vi chuyên nghiệp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1: Numerology */}
            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-[#6B4BFF]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-7 h-7 text-[#6B4BFF]" />
                </div>
                <CardTitle className="text-2xl">Thần Số Học</CardTitle>
                <CardDescription className="text-base">
                  Phân tích chi tiết các con số trong cuộc đời bạn: Số đường đời, Số biểu đạt, Số linh hồn, và nhiều hơn nữa.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#6B4BFF]" />
                  <span>Báo cáo miễn phí</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#6B4BFF]" />
                  <span>Phân tích AI chi tiết</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#6B4BFF]" />
                  <span>Biểu đồ trực quan</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/calculator">
                    Bắt đầu ngay
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Feature 2: Horoscope */}
            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-7 h-7 text-[#8B5CF6]" />
                </div>
                <CardTitle className="text-2xl">Tử Vi</CardTitle>
                <CardDescription className="text-base">
                  Dự đoán vận mệnh, tình yêu, sự nghiệp dựa trên cung hoàng đạo, con giáp và ngũ hành của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Tử vi hàng ngày/tuần/tháng</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Phân tích 12 cung hoàng đạo</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Tư vấn phong thủy</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/tu-vi">
                    Xem tử vi
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Feature 3: Premium */}
            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between w-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFAC33]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Crown className="w-7 h-7 text-[#FFAC33]" />
                  </div>
                  <div className="hidden sm:flex items-center px-2 py-1 rounded-full bg-[#FFAC33]/20 text-xs font-semibold text-[#FFAC33]">
                    HOT
                  </div>
                </div>
                <CardTitle className="text-2xl">Gói Premium</CardTitle>
                <CardDescription className="text-base">
                  Báo cáo chi tiết nhất với dự đoán 12 tháng, phân tích sâu, và file PDF chuyên nghiệp.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FFAC33]" />
                  <span>Phân tích cực kỳ chi tiết</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FFAC33]" />
                  <span>Dự đoán 12 tháng</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FFAC33]" />
                  <span>Download PDF chuyên nghiệp</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="secondary" asChild>
                  <Link href="/premium">
                    Nâng cấp Premium
                    <Crown className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

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
