# 🔮 Thần Số Học & Tử Vi Website

Website phân tích Thần số học (Numerology) và Tử vi (Horoscope) chuyên nghiệp cho người Việt Nam, tích hợp AI để tạo báo cáo chi tiết và cá nhân hóa.

## ✨ Tính Năng

### 🆓 Tính Năng Miễn Phí
- **Tính Thần Số Học**: Phân tích 5 con số chính (Life Path, Expression, Soul Urge, Personality, Birthday)
- **Xem Tử Vi**: Phân tích cung hoàng đạo, con giáp, ngũ hành
- **Phân tích AI**: Báo cáo chi tiết được tạo bởi OpenAI GPT-4
- **Biểu đồ trực quan**: Hiển thị kết quả dưới dạng số, màu sắc và biểu đồ

### 👑 Tính Năng Premium
- **Phân tích siêu chi tiết**: Báo cáo 2000+ từ
- **Dự đoán 12 tháng**: Lời khuyên cho từng tháng trong năm
- **Phân tích tương thích**: Xem mức độ hợp với người khác
- **Download PDF**: Báo cáo chuyên nghiệp để lưu trữ
- **Lưu trữ không giới hạn**: Lưu lại tất cả báo cáo đã tạo

### 🔐 Hệ Thống Người Dùng
- Đăng ký/Đăng nhập với email
- Quản lý báo cáo cá nhân
- Lịch sử xem báo cáo
- Nâng cấp Premium qua chuyển khoản ngân hàng

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **AI**: OpenAI GPT-4
- **Form Validation**: React Hook Form + Zod
- **Charts**: Chart.js + React-Chartjs-2
- **PDF Generation**: jsPDF

## 📦 Cài Đặt

### 1. Clone Repository

```bash
git clone <repository-url>
cd numerous
```

### 2. Cài Đặt Dependencies

```bash
npm install
```

### 3. Thiết Lập Environment Variables

Tạo file `.env.local` từ `.env.example`:

```bash
# OpenAI API Key (Bắt buộc)
OPENAI_API_KEY=your_openai_api_key_here

# Database URL (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/numerology_db?schema=public"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here_generate_with_openssl

# Bank Transfer Information (Hiển thị trên website)
NEXT_PUBLIC_BANK_NAME="Vietcombank"
NEXT_PUBLIC_BANK_ACCOUNT_NUMBER="1234567890"
NEXT_PUBLIC_BANK_ACCOUNT_HOLDER="NGUYEN VAN A"

# Admin Email
ADMIN_EMAIL="admin@example.com"
```

### 4. Thiết Lập Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (nếu dùng PostgreSQL)
npx prisma migrate dev

# Hoặc push schema (development)
npx prisma db push
```

### 5. Chạy Development Server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

## 📁 Cấu Trúc Thư Mục

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── numerology/          # API tính Thần số học
│   │   └── horoscope/           # API xem Tử vi
│   ├── calculator/              # Trang tính Thần số học
│   ├── tu-vi/                   # Trang xem Tử vi
│   ├── premium/                 # Trang Premium
│   ├── auth/                    # Authentication pages
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   ├── layout/                  # Navbar, Footer
│   ├── forms/                   # Form components
│   └── ui/                      # UI components
├── lib/
│   ├── utils/                   # Utility functions
│   │   ├── numerology.ts       # Tính toán Thần số học
│   │   ├── horoscope.ts        # Tính toán Tử vi
│   │   └── openai.ts           # OpenAI integration
│   └── db/                      # Database utilities
│       └── prisma.ts           # Prisma client
├── types/                       # TypeScript type definitions
└── prisma/
    └── schema.prisma           # Database schema
```

## 🎯 Các Chức Năng Chính

### Thần Số Học Calculator
- Input: Họ tên đầy đủ + Ngày sinh
- Tính toán: 5 con số chính theo phương pháp Pythagorean
- Output: Số may mắn, màu sắc, điểm mạnh/yếu, nghề nghiệp phù hợp
- AI Analysis: Phân tích chi tiết về tính cách và cuộc đời

### Tử Vi & Horoscope
- Input: Ngày sinh + Giờ sinh (optional) + Nơi sinh (optional)
- Tính toán: Cung hoàng đạo, Con giáp, Ngũ hành
- Output: Tử vi tổng quan, thời kỳ may mắn, thách thức
- AI Analysis: Dự đoán và lời khuyên cho năm nay

### Premium Payment System
- Users chuyển khoản ngân hàng
- Nhập thông tin thanh toán vào hệ thống
- Admin xác nhận thanh toán thủ công
- Tự động kích hoạt tài khoản Premium

## 🚀 Deploy

### Deploy trên Vercel

1. Push code lên GitHub
2. Import project vào Vercel
3. Thêm Environment Variables
4. Deploy!

### Database Setup

Khuyến nghị sử dụng:
- **Vercel Postgres** (free tier available)
- **Supabase** (PostgreSQL)
- **PlanetScale** (MySQL với Prisma adapter)

## 🔑 API Keys Cần Thiết

### OpenAI API Key
1. Đăng ký tại [https://platform.openai.com](https://platform.openai.com)
2. Tạo API key
3. Thêm vào `.env.local`: `OPENAI_API_KEY=sk-...`

**Lưu ý**: OpenAI API có phí. Kiểm tra pricing tại [https://openai.com/pricing](https://openai.com/pricing)

### NextAuth Secret
Tạo secret key:
```bash
openssl rand -base64 32
```

## 📝 TODO: Các Tính Năng Cần Hoàn Thiện

### Authentication (Chưa implement)
- [ ] Register/Login pages với NextAuth
- [ ] Protected routes cho Premium users
- [ ] Session management
- [ ] Password hashing với bcryptjs

### Payment System (Chưa implement)
- [ ] Payment submission form
- [ ] Admin dashboard để verify payments
- [ ] Email notification khi payment được verify
- [ ] Auto-extend Premium subscription

### Blog Section (Chưa implement)
- [ ] Blog listing page
- [ ] Blog detail page
- [ ] Admin panel để manage blog posts
- [ ] OpenAI integration để suggest content

### Additional Features
- [ ] User dashboard với saved reports
- [ ] PDF generation cho Premium reports
- [ ] Email reports
- [ ] Share reports via link
- [ ] Multi-language support (EN/VI)
- [ ] SEO optimization cho từng page
- [ ] Analytics tracking

## 🐛 Troubleshooting

### Prisma Client Error
```bash
npx prisma generate
```

### OpenAI API Error
- Kiểm tra API key đúng chưa
- Kiểm tra balance tài khoản OpenAI
- Kiểm tra rate limits

### Build Error
```bash
# Clear cache
rm -rf .next
npm run build
```

## 📄 License

MIT License - Tự do sử dụng cho dự án cá nhân và thương mại.

## 🤝 Contributing

Mọi đóng góp đều được chào đón! Vui lòng tạo Pull Request hoặc Issue.

## 📧 Contact

- Email: contact@thansohoc.vn
- Facebook: [Link Facebook Page]
- Zalo: [Zalo OA]

---

**Made with ❤️ for Vietnamese users**
