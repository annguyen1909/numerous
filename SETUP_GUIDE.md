# 📖 HƯỚNG DẪN CÀI ĐẶT CHI TIẾT

## Bước 1: Chuẩn Bị Môi Trường

### Yêu Cầu Hệ Thống
- Node.js 18+ ([Download](https://nodejs.org/))
- npm hoặc yarn
- PostgreSQL 14+ (hoặc MySQL, SQLite)
- Git

### Kiểm Tra Phiên Bản
```bash
node --version    # v18.0.0 trở lên
npm --version     # 9.0.0 trở lên
```

## Bước 2: Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd numerous

# Install dependencies
npm install
```

## Bước 3: Thiết Lập Database

### Option 1: PostgreSQL Local

#### Windows
1. Download PostgreSQL từ [postgresql.org](https://www.postgresql.org/download/windows/)
2. Cài đặt với password của bạn
3. Mở pgAdmin và tạo database mới: `numerology_db`

#### Database URL
```
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/numerology_db?schema=public"
```

### Option 2: Supabase (Free, Cloud)

1. Đăng ký tại [supabase.com](https://supabase.com)
2. Tạo project mới
3. Vào Settings → Database → Connection string
4. Copy "Connection pooling" URL
5. Paste vào `.env.local`

### Option 3: Vercel Postgres (Free với Vercel)

```bash
# Nếu deploy trên Vercel
npx vercel env pull .env.local
```

## Bước 4: Cấu Hình Environment Variables

### Tạo file `.env.local`

```bash
# Copy từ template
cp .env.example .env.local
```

### Điền các giá trị:

#### 1. OpenAI API Key (BẮT BUỘC)
```
OPENAI_API_KEY=sk-proj-...
```

**Cách lấy:**
1. Truy cập [platform.openai.com](https://platform.openai.com)
2. Đăng nhập/Đăng ký
3. API Keys → Create new secret key
4. Copy và paste vào `.env.local`

**Lưu ý về chi phí:**
- gpt-5: ~$0.005/1K tokens input, ~$0.015/1K tokens output
- gpt-5-mini: ~$0.00015/1K tokens (rẻ hơn)
- Free tier: $5 credit cho tài khoản mới

#### 2. Database URL
```
DATABASE_URL="postgresql://..."
```

#### 3. NextAuth Configuration
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here
```

**Tạo secret:**
```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

#### 4. Bank Info (Hiển thị trên website)
```
NEXT_PUBLIC_BANK_NAME="Vietcombank"
NEXT_PUBLIC_BANK_ACCOUNT_NUMBER="1234567890"
NEXT_PUBLIC_BANK_ACCOUNT_HOLDER="NGUYEN VAN A"
```

## Bước 5: Khởi Tạo Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Xem database trong browser
npx prisma studio
```

## Bước 6: Chạy Development Server

```bash
npm run dev
```

Truy cập: [http://localhost:3000](http://localhost:3000)

## Bước 7: Test Các Tính Năng

### Test Thần Số Học
1. Truy cập `/calculator`
2. Nhập: Tên = "Nguyen Van An", Ngày sinh = "1990-01-01"
3. Click "Tính Thần Số Học"
4. Xem kết quả và AI analysis

### Test Tử Vi
1. Truy cập `/tu-vi`
2. Nhập ngày sinh
3. Click "Xem Tử Vi"
4. Xem kết quả

### Kiểm Tra Console
- Mở DevTools (F12)
- Tab Console → Không có error màu đỏ
- Tab Network → API calls thành công (status 200)

## 🚨 Xử Lý Lỗi Thường Gặp

### Lỗi 1: Prisma Client Error
```
Error: Cannot find module '@prisma/client'
```

**Giải pháp:**
```bash
npx prisma generate
npm run dev
```

### Lỗi 2: OpenAI API Error
```
Error: Invalid API key
```

**Giải pháp:**
- Kiểm tra `.env.local` có `OPENAI_API_KEY` chính xác
- Restart dev server: Ctrl+C rồi `npm run dev`
- Kiểm tra API key còn hiệu lực trên OpenAI dashboard

### Lỗi 3: Database Connection Error
```
Error: Can't reach database server
```

**Giải pháp:**
- Kiểm tra DATABASE_URL đúng format
- PostgreSQL đang chạy (Windows: Services → PostgreSQL)
- Port 5432 không bị block bởi firewall

### Lỗi 4: Module Not Found
```
Error: Cannot find module '@hookform/resolvers'
```

**Giải pháp:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Lỗi 5: Port Already In Use
```
Error: Port 3000 is already in use
```

**Giải pháp:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

## 📊 Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deploy lên Vercel

### 1. Push lên GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Import vào Vercel
1. Truy cập [vercel.com](https://vercel.com)
2. New Project → Import từ GitHub
3. Chọn repository

### 3. Configure Environment Variables
Thêm các biến trong Vercel Dashboard:
- `OPENAI_API_KEY`
- `DATABASE_URL`
- `NEXTAUTH_URL` (URL production)
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_BANK_NAME`
- `NEXT_PUBLIC_BANK_ACCOUNT_NUMBER`
- `NEXT_PUBLIC_BANK_ACCOUNT_HOLDER`

### 4. Deploy
Click "Deploy" → Đợi vài phút → Xong!

## 🎯 Các Bước Tiếp Theo

### Hoàn Thiện Authentication
```bash
# Tạo auth pages
mkdir src/app/auth/login
mkdir src/app/auth/register

# Implement NextAuth
# See: https://next-auth.js.org/getting-started/example
```

### Thêm Payment Processing
```bash
# Tạo API route
src/app/api/payment/route.ts

# Tạo payment form
src/components/forms/PaymentForm.tsx
```

### Tạo Admin Dashboard
```bash
# Admin routes
src/app/admin/payments/page.tsx
src/app/admin/users/page.tsx
src/app/admin/blog/page.tsx
```

## 💡 Tips & Best Practices

### 1. Security
- Không commit `.env.local` vào Git
- Sử dụng environment variables cho sensitive data
- Enable rate limiting cho API routes
- Validate input từ users

### 2. Performance
- Sử dụng Next.js Image component
- Enable caching cho OpenAI responses
- Optimize database queries
- Lazy load components

### 3. Cost Optimization
- Sử dụng gpt-5-mini thay vì GPT-4 cho free users
- Cache frequent queries
- Set max_tokens limits
- Monitor OpenAI usage dashboard

## 📚 Tài Liệu Tham Khảo

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org/)

## 🆘 Cần Trợ Giúp?

1. Check [GitHub Issues](link-to-issues)
2. Read documentation
3. Contact: contact@thansohoc.vn

---

**Chúc bạn thành công! 🎉**
