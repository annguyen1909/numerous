import Link from 'next/link';
import { Calculator, Star, Crown, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function FeatureCards() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Dịch Vụ Của Chúng Tôi</h2>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            Khám phá đầy đủ các dịch vụ phân tích Thần số học và Tử vi chuyên nghiệp
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
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

          <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between w-full">
                <div className="w-14 h-14 rounded-2xl bg-[#FFAC33]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Crown className="w-7 h-7 text-[#FFAC33]" />
                </div>
                <div className="hidden sm:flex items-center px-2 py-1 rounded-full bg-[#FFAC33]/20 text-xs font-semibold text-[#FFAC33]">HOT</div>
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
  );
}
