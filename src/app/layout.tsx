import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/providers/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Thần Số Học & Tử Vi - Khám phá con số của bạn",
  description: "Phân tích Thần số học và Tử vi chuyên nghiệp với AI. Nhận báo cáo miễn phí về số đường đời, tính cách, vận mệnh và dự đoán tương lai.",
  keywords: ["thần số học", "numerology", "tử vi", "horoscope", "cung hoàng đạo", "con giáp", "phong thủy"],
  authors: [{ name: "Thần Số Học" }],
  openGraph: {
    title: "Thần Số Học & Tử Vi - Khám phá con số của bạn",
    description: "Phân tích Thần số học và Tử vi chuyên nghiệp với AI",
    type: "website",
    locale: "vi_VN",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user = session?.user ? {
    name: session.user.name || undefined,
    email: session.user.email!,
    isPremium: (session.user as any).isPremium || false,
  } : undefined;

  return (
    <html lang="vi">
      <body className={`${montserrat.variable} ${inter.variable} antialiased`}>
        <AuthProvider session={session}>
          <Navbar user={user} />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
