# 📄 Premium PDF Export Feature - Complete Documentation

## 🎯 Tổng Quan

Hệ thống xuất báo cáo Premium dạng PDF với:
- ✅ Thiết kế chuyên nghiệp, bố cục đẹp
- ✅ Nội dung AI-generated từ OpenAI GPT-4
- ✅ Lưu trữ vĩnh viễn trên Supabase Storage
- ✅ Log đầy đủ trong Supabase Database
- ✅ Kiểm tra Premium tự động
- ✅ UI/UX tối ưu với modal upgrade

---

## 📦 Tech Stack

| Công nghệ | Mục đích |
|-----------|----------|
| **Next.js 14** | Framework chính (App Router) |
| **TypeScript** | Type safety |
| **PDFKit** | Tạo PDF với layout chuyên nghiệp |
| **OpenAI GPT-4** | Generate nội dung chuyên sâu |
| **Supabase Storage** | Lưu trữ file PDF |
| **Supabase Database** | Log export history |
| **Zod** | Validation |
| **TailwindCSS** | Styling |

---

## 📁 Cấu Trúc Files

```
src/
├── app/
│   ├── api/
│   │   └── export-pdf/
│   │       └── route.ts                 # API endpoint chính
│   └── test-pdf-export/
│       └── page.tsx                     # Test page (example)
│
├── components/
│   └── premium/
│       ├── PremiumPdfButton.tsx         # Button component
│       └── PremiumUpgradeModal.tsx      # Modal nâng cấp
│
└── lib/
    ├── supabase/
    │   ├── server.ts                    # Supabase server client
    │   ├── storage.ts                   # Storage helpers
    │   └── database.ts                  # Database helpers
    ├── openai/
    │   └── generatePremiumReading.ts    # AI content generation
    └── pdf/
        └── generatePdf.ts               # PDF template engine

supabase_pdf_exports.sql                 # Database migration
```

---

## ⚙️ Setup Guide

### 1️⃣ Install Dependencies

```bash
npm install pdfkit @types/pdfkit @supabase/supabase-js
```

### 2️⃣ Configure Environment Variables

Thêm vào `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# OpenAI API
OPENAI_API_KEY="sk-..."
```

**Lấy Supabase credentials:**
1. Truy cập [supabase.com](https://supabase.com)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào **Settings** → **API**
4. Copy:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Keep secret!

### 3️⃣ Run Database Migration

1. Mở Supabase Dashboard → **SQL Editor**
2. Paste nội dung file `supabase_pdf_exports.sql`
3. Run query

Migration sẽ tạo:
- ✅ Table `pdf_exports` với RLS policies
- ✅ Storage bucket `pdf-reports`
- ✅ Indexes cho performance
- ✅ Security policies

### 4️⃣ Verify Setup

Chạy verification queries trong Supabase SQL Editor:

```sql
-- Check table
SELECT * FROM pdf_exports LIMIT 1;

-- Check storage bucket
SELECT * FROM storage.buckets WHERE id = 'pdf-reports';

-- Check policies
SELECT policyname FROM pg_policies WHERE tablename = 'pdf_exports';
```

---

## 🔌 API Reference

### POST `/api/export-pdf`

Tạo và xuất báo cáo PDF Premium.

**Authentication:** Required (NextAuth session)

**Request Body:**
```typescript
{
  fullName: string;      // "Nguyễn Văn A"
  birthDate: string;     // "15/08/1990"
  readingType: 'thansohoc' | 'tuvi' | 'chieusinh' | 'tinhcach';
}
```

**Success Response (200):**
```typescript
{
  success: true;
  downloadUrl: string;   // Signed URL from Supabase
  fileName: string;      // "thansohoc_NguyenVanA_1234567890.pdf"
  message: string;       // "Báo cáo PDF đã được tạo thành công"
}
```

**Error Responses:**

| Status | Code | Message |
|--------|------|---------|
| 401 | - | Vui lòng đăng nhập |
| 402 | `PREMIUM_REQUIRED` | Cần nâng cấp Premium |
| 400 | - | Dữ liệu không hợp lệ |
| 500 | - | Lỗi server |

**Example Usage:**

```typescript
const response = await fetch('/api/export-pdf', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: 'Nguyễn Văn A',
    birthDate: '15/08/1990',
    readingType: 'thansohoc',
  }),
});

const data = await response.json();

if (data.downloadUrl) {
  // Auto download
  window.open(data.downloadUrl, '_blank');
}
```

### GET `/api/export-pdf`

Lấy danh sách PDF exports của user.

**Authentication:** Required

**Success Response (200):**
```typescript
{
  success: true;
  exports: Array<{
    id: string;
    user_id: string;
    reading_type: string;
    file_url: string;
    file_path: string;
    full_name: string;
    birth_date: string;
    created_at: string;
  }>;
}
```

---

## 🎨 Component Usage

### `<PremiumPdfButton />`

Button để xuất PDF với loading state và premium check.

**Props:**
```typescript
interface PremiumPdfButtonProps {
  fullName: string;
  birthDate: string;
  readingType: 'thansohoc' | 'tuvi' | 'chieusinh' | 'tinhcach';
  isPremium?: boolean;    // Default: false
  className?: string;
}
```

**Example:**
```tsx
import PremiumPdfButton from '@/components/premium/PremiumPdfButton';

<PremiumPdfButton
  fullName="Nguyễn Văn A"
  birthDate="15/08/1990"
  readingType="thansohoc"
  isPremium={true}
  className="w-full"
/>
```

**Features:**
- ✅ Auto show upgrade modal nếu không premium
- ✅ Loading spinner khi đang tạo PDF
- ✅ Auto download khi PDF ready
- ✅ Error handling với alert
- ✅ Responsive design

### `<PremiumUpgradeModal />`

Modal hiển thị khi user chưa Premium.

**Props:**
```typescript
interface PremiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Example:**
```tsx
const [showModal, setShowModal] = useState(false);

<PremiumUpgradeModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
/>
```

---

## 📄 PDF Template Design

### Trang Bìa (Cover Page)
- Background gradient tím → xanh
- Tiêu đề lớn 32px
- Tên người dùng 28px
- Ngày sinh, subtitle
- Logo/branding ở cuối trang

### Các Trang Nội Dung
Mỗi section bao gồm:
1. **Heading** (20px, bold, purple)
2. **Content** (13px, justified, line spacing)
3. **Highlights box** (optional) - bordered, background tím nhạt
4. **Divider** giữa các section

### Sections Chính:
1. Con số chủ đạo / Tổng quan
2. Tính cách - Điểm mạnh - Điểm yếu
3. Đường đời - Sứ mệnh - Linh hồn
4. Dự báo 2025-2026
5. Lời khuyên cá nhân hóa

### Trang Tổng Hợp
- 💪 Điểm mạnh (green icons)
- ⚠️ Điểm yếu (red icons)
- 🔮 Dự báo (blue icons)
- 💡 Khuyến nghị (purple icons)

### Typography
- **Title:** Helvetica-Bold 24-32px
- **Section:** Helvetica-Bold 18-20px
- **Body:** Helvetica 13-14px
- **Spacing:** 5px line gap
- **Colors:** Purple (#8B5CF6), Dark Purple (#4C1D95), Gray tones

---

## 🧠 AI Content Generation

### OpenAI Prompt Structure

```typescript
const prompt = `
Bạn là chuyên gia ${readingType} hàng đầu với 20 năm kinh nghiệm.

Tạo báo cáo chi tiết cho:
- Họ tên: ${fullName}
- Ngày sinh: ${birthDate}

Yêu cầu:
1. Phân tích sâu về con số, đường đời, sứ mệnh
2. Tính cách: điểm mạnh, yếu, tài năng ẩn
3. Vận mệnh từng giai đoạn
4. Dự báo 2025-2026
5. Lời khuyên cá nhân hóa

Trả về JSON structured...
`;
```

### Output Schema

```typescript
interface PremiumReadingOutput {
  title: string;
  subtitle: string;
  sections: Array<{
    heading: string;
    content: string;
    highlights?: string[];
  }>;
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
```

### Fallback Strategy

Nếu OpenAI API fail, hệ thống tự động sử dụng template fallback với dummy data để đảm bảo user vẫn nhận được PDF.

---

## 💾 Supabase Integration

### Database Schema

```sql
CREATE TABLE pdf_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  reading_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  full_name TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage Structure

```
pdf-reports/
└── {user_id}/
    ├── {user_id}_thansohoc_1234567890.pdf
    ├── {user_id}_tuvi_1234567891.pdf
    └── ...
```

### RLS Policies

```sql
-- Users can only view/create/delete their own PDFs
CREATE POLICY "Users can view their own exports"
ON pdf_exports FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own exports"
ON pdf_exports FOR INSERT
WITH CHECK (auth.uid()::text = user_id);
```

### Signed URLs

Files trong bucket `pdf-reports` là **private** (public: false).

Access thông qua signed URLs:
- Valid trong 1 năm (31536000 seconds)
- Auto-generated khi upload
- Có thể re-generate bất cứ lúc nào

---

## 🔒 Security

### Premium Check Flow

```typescript
1. Kiểm tra session (NextAuth)
2. Lấy user từ database
3. Check isPremium === true
4. Check premiumUntil > now
5. Nếu fail → return 402 Payment Required
```

### Input Validation

```typescript
// Zod schema
const ExportPdfSchema = z.object({
  fullName: z.string().min(1),
  birthDate: z.string().min(1),
  readingType: z.enum(['thansohoc', 'tuvi', 'chieusinh', 'tinhcach']),
});
```

### File Upload Security

- ✅ Service role key chỉ dùng server-side
- ✅ RLS policies protect user data
- ✅ Signed URLs có expiry time
- ✅ Files organized theo user_id folder
- ✅ Unique filenames với timestamp

---

## 🧪 Testing Checklist

### Local Testing

- [ ] Install dependencies thành công
- [ ] Environment variables đã set
- [ ] Supabase migration chạy OK
- [ ] OpenAI API key hoạt động
- [ ] Test page `/test-pdf-export` accessible

### Feature Testing

- [ ] Non-premium user → show upgrade modal
- [ ] Premium user → tạo PDF thành công
- [ ] PDF có đầy đủ sections
- [ ] Typography và layout đẹp
- [ ] Download tự động hoạt động
- [ ] File lưu trong Supabase Storage
- [ ] Log xuất hiện trong `pdf_exports` table

### Error Handling

- [ ] No session → 401 error
- [ ] Not premium → 402 error + modal
- [ ] Invalid input → 400 error với details
- [ ] OpenAI fail → fallback data hoạt động
- [ ] Supabase upload fail → proper error message

### UI/UX

- [ ] Button có loading state
- [ ] Modal đẹp và responsive
- [ ] Success/error alerts hiển thị
- [ ] Download tự động work
- [ ] Mobile responsive

---

## 🚀 Deployment

### Environment Variables

Đảm bảo set trên production platform (Vercel/Railway):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
OPENAI_API_KEY=sk-xxx...
```

### Build Check

```bash
npm run build
```

Verify:
- No TypeScript errors
- All imports resolve
- Environment variables accessible

### Post-Deployment

1. Test API endpoint: `POST /api/export-pdf`
2. Verify Supabase connection
3. Check OpenAI API quota
4. Monitor Supabase Storage usage
5. Check database logs

---

## 📊 Usage Examples

### Integrate vào Report Page

```tsx
// src/app/reports/[id]/page.tsx

import PremiumPdfButton from '@/components/premium/PremiumPdfButton';

export default async function ReportDetailPage({ params }) {
  const report = await getReport(params.id);
  const user = await getCurrentUser();
  
  return (
    <div>
      <h1>{report.title}</h1>
      <div>{report.content}</div>
      
      {/* Export PDF Button */}
      <PremiumPdfButton
        fullName={user.name}
        birthDate={report.birthDate}
        readingType={report.type}
        isPremium={user.isPremium}
      />
    </div>
  );
}
```

### Dashboard Integration

```tsx
// Show recent PDF exports

const exports = await fetch('/api/export-pdf').then(r => r.json());

{exports.exports.map(exp => (
  <div key={exp.id}>
    <a href={exp.file_url} target="_blank">
      📄 {exp.reading_type} - {exp.full_name}
    </a>
    <span>{new Date(exp.created_at).toLocaleDateString('vi-VN')}</span>
  </div>
))}
```

---

## 🐛 Troubleshooting

### PDF không tạo được

**Error:** "Failed to generate PDF"

**Solutions:**
1. Check PDFKit installed: `npm list pdfkit`
2. Verify font files accessible
3. Check Buffer conversion

### Supabase upload fail

**Error:** "Failed to upload PDF"

**Solutions:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` correct
2. Check bucket `pdf-reports` exists
3. Verify RLS policies
4. Check storage quota (free tier: 1GB)

### OpenAI timeout

**Error:** "OpenAI generation error"

**Solutions:**
1. Check API key valid
2. Verify quota not exceeded
3. Increase timeout if needed
4. Fallback data sẽ tự động kick in

### Premium check fail

**Error:** "PREMIUM_REQUIRED"

**Solutions:**
1. Check `user.isPremium = true` in database
2. Verify `premiumUntil > NOW()`
3. Clear session and re-login
4. Check Premium payment approved

---

## 💡 Best Practices

### Performance

- ✅ Generate PDF server-side only
- ✅ Use streaming for large PDFs
- ✅ Cache OpenAI responses (optional)
- ✅ Compress PDF if > 5MB
- ✅ Use background job cho batch exports

### User Experience

- ✅ Show clear loading states
- ✅ Provide progress indicator
- ✅ Auto-download on success
- ✅ Clear error messages
- ✅ Allow re-download từ history

### Cost Optimization

- ✅ Rate limit API calls
- ✅ Reuse existing PDFs nếu có
- ✅ Monitor OpenAI token usage
- ✅ Set Supabase storage limits
- ✅ Archive old PDFs after 1 year

---

## 📈 Future Enhancements

### Phase 2 (Optional)

- [ ] Email PDF khi complete
- [ ] Batch export multiple reports
- [ ] Custom PDF templates per user
- [ ] Watermark cho free users
- [ ] PDF analytics (views, downloads)

### Phase 3 (Advanced)

- [ ] Multi-language PDFs
- [ ] Interactive PDF forms
- [ ] PDF encryption/password
- [ ] Share PDFs with link
- [ ] PDF versioning

---

## 📞 Support

Nếu gặp vấn đề:

1. Check logs trong Supabase Dashboard
2. Review API response errors
3. Verify environment variables
4. Test với Postman/Thunder Client
5. Check browser console for client errors

---

## ✅ Summary

Hệ thống Premium PDF Export đã hoàn thiện:

✅ **Backend Complete:**
- API route `/api/export-pdf`
- OpenAI integration
- PDFKit template engine
- Supabase Storage & Database

✅ **Frontend Complete:**
- `<PremiumPdfButton />` component
- `<PremiumUpgradeModal />` component
- Test page `/test-pdf-export`
- Responsive design

✅ **Security:**
- Premium check
- RLS policies
- Signed URLs
- Input validation

✅ **Documentation:**
- Setup guide
- API reference
- Component usage
- Troubleshooting

🚀 **Ready to deploy and use!**
