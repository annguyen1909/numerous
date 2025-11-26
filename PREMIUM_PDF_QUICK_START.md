# 🚀 Quick Start - Premium PDF Export

## 📋 Checklist Setup (5 phút)

### ✅ Step 1: Install Dependencies
```bash
npm install pdfkit @types/pdfkit @supabase/supabase-js
```

### ✅ Step 2: Configure Supabase

1. **Tạo Supabase Project:**
   - Truy cập: https://supabase.com
   - Click "New Project"
   - Chọn region gần nhất (Singapore cho VN)

2. **Get API Keys:**
   - Vào **Settings** → **API**
   - Copy 3 giá trị:
     - `URL`
     - `anon public key`
     - `service_role key` ⚠️

3. **Add to `.env.local`:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
   SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."
   OPENAI_API_KEY="sk-..."
   ```

### ✅ Step 3: Run Database Migration

1. Mở Supabase Dashboard
2. Click **SQL Editor** (sidebar trái)
3. Click **New Query**
4. Copy toàn bộ file `supabase_pdf_exports.sql`
5. Paste và click **Run**
6. Đợi ~5 giây cho đến khi thấy "Success"

**Verify migration:**
```sql
-- Run query này để check
SELECT * FROM pdf_exports;
SELECT * FROM storage.buckets WHERE id = 'pdf-reports';
```

Kết quả mong đợi:
- Table `pdf_exports` tồn tại (rỗng)
- Bucket `pdf-reports` tồn tại

### ✅ Step 4: Test Locally

```bash
# Start dev server
npm run dev
```

Truy cập: http://localhost:3000/test-pdf-export

**Expected behavior:**
- Non-premium user → See upgrade modal
- Premium user → Can export PDF

### ✅ Step 5: Make User Premium (For Testing)

**Option A: Via Prisma Studio**
```bash
npx prisma studio
```
- Mở table `User`
- Chọn user
- Set `isPremium = true`
- Set `premiumUntil = 2026-01-01`

**Option B: Via SQL**
```sql
UPDATE "User"
SET "isPremium" = true,
    "premiumUntil" = '2026-12-31'
WHERE email = 'your-email@example.com';
```

---

## 🎯 Usage Flow

### 1. User Flow (Non-Premium)
```
User clicks "Tải PDF" 
→ Button detects !isPremium 
→ Show PremiumUpgradeModal 
→ User clicks "Nâng Cấp Ngay" 
→ Redirect to /premium
```

### 2. User Flow (Premium)
```
User clicks "Tải PDF"
→ Show loading spinner
→ POST /api/export-pdf
→ OpenAI generates content (5-10s)
→ PDFKit creates PDF (2-3s)
→ Upload to Supabase Storage (1-2s)
→ Log to database
→ Return signed URL
→ Auto download PDF
→ Success ✅
```

---

## 🧪 Quick Test

### Test 1: Non-Premium User
```tsx
<PremiumPdfButton
  fullName="Nguyễn Văn A"
  birthDate="15/08/1990"
  readingType="thansohoc"
  isPremium={false}  // ← Not premium
/>
```
**Expected:** Modal xuất hiện

### Test 2: Premium User
```tsx
<PremiumPdfButton
  fullName="Nguyễn Văn A"
  birthDate="15/08/1990"
  readingType="thansohoc"
  isPremium={true}  // ← Premium
/>
```
**Expected:** PDF tạo và tải xuống

### Test 3: API Direct Call
```bash
curl -X POST http://localhost:3000/api/export-pdf \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{
    "fullName": "Nguyễn Văn A",
    "birthDate": "15/08/1990",
    "readingType": "thansohoc"
  }'
```

---

## 📦 Files Created

```
✅ src/lib/supabase/
   ├── server.ts
   ├── storage.ts
   └── database.ts

✅ src/lib/openai/
   └── generatePremiumReading.ts

✅ src/lib/pdf/
   └── generatePdf.ts

✅ src/app/api/export-pdf/
   └── route.ts

✅ src/components/premium/
   ├── PremiumPdfButton.tsx
   └── PremiumUpgradeModal.tsx

✅ src/app/test-pdf-export/
   └── page.tsx

✅ Documentation:
   ├── PREMIUM_PDF_EXPORT_DOCS.md (chi tiết)
   └── PREMIUM_PDF_QUICK_START.md (này)

✅ Database:
   └── supabase_pdf_exports.sql
```

---

## 🔍 Verify Installation

### Check 1: Dependencies
```bash
npm list pdfkit @supabase/supabase-js
```
Should show installed versions.

### Check 2: Environment Variables
```bash
# In terminal
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"
```
Should print your Supabase URL.

### Check 3: Supabase Connection
Run in Supabase SQL Editor:
```sql
SELECT current_database(), current_user;
```

### Check 4: Build Success
```bash
npm run build
```
Should complete without errors.

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot find module '@/lib/auth'"
**Fix:** Project đang dùng NextAuth, file auth config tồn tại ở đâu đó. Check:
```bash
# Find auth file
find src -name "*auth*"
```

### Issue 2: "Supabase upload error"
**Fix:** 
1. Check service role key correct
2. Verify bucket created: `SELECT * FROM storage.buckets;`
3. Check RLS policies: `SELECT * FROM pg_policies WHERE tablename = 'pdf_exports';`

### Issue 3: PDF không đẹp
**Fix:** PDFKit cần font files. Check font path hoặc dùng built-in fonts:
- Helvetica
- Helvetica-Bold
- Helvetica-Oblique

### Issue 4: OpenAI timeout
**Fix:**
1. Increase timeout:
```typescript
const completion = await openai.chat.completions.create({
  // ...
  timeout: 60000, // 60 seconds
});
```
2. Fallback data sẽ tự động dùng

---

## 📊 Usage Metrics

### Supabase Free Tier Limits:
- **Storage:** 1 GB
- **Database:** 500 MB
- **Bandwidth:** 2 GB/month

### Estimate:
- PDF size trung bình: ~200-500 KB
- 1 GB = ~2,000-5,000 PDFs
- Yearly signed URLs = giảm bandwidth

### OpenAI Costs:
- GPT-4 Turbo: ~$0.01-0.03/request
- 1,000 PDFs = ~$10-30

---

## 🎨 Customization

### Change PDF Colors
Edit `src/lib/pdf/generatePdf.ts`:
```typescript
// Line ~48
.fill('#8B5CF6'); // ← Purple, change to your color
```

### Change Modal Text
Edit `src/components/premium/PremiumUpgradeModal.tsx`:
```typescript
// Line ~32
<h2>Nâng Cấp Premium</h2>  // ← Your text
```

### Add More Reading Types
1. Update Zod schema in `route.ts`:
```typescript
readingType: z.enum(['thansohoc', 'tuvi', 'chieusinh', 'tinhcach', 'your-new-type'])
```

2. Update OpenAI prompt logic

---

## ✅ Ready to Deploy!

### Vercel Deployment
```bash
vercel --prod
```

**Don't forget to set environment variables in Vercel dashboard:**
- Settings → Environment Variables
- Add all vars from `.env.local`

### Railway Deployment
```bash
railway up
```

**Set environment variables:**
- Settings → Variables
- Paste all vars

---

## 📞 Need Help?

**Checklist trước khi hỏi:**
- [ ] Đã chạy migration?
- [ ] Environment variables đã set?
- [ ] User có premium = true?
- [ ] OpenAI API key hoạt động?
- [ ] Supabase bucket tồn tại?

**Debug logs:**
```typescript
// Add to API route
console.log('User:', user);
console.log('Premium status:', isPremiumActive);
console.log('PDF buffer size:', pdfBuffer.length);
```

---

## 🎉 Success!

Nếu đến đây không có lỗi, hệ thống Premium PDF Export đã sẵn sàng! 🚀

**Next steps:**
1. Integrate vào trang reports
2. Add vào dashboard
3. Test với real users
4. Monitor Supabase usage
5. Scale nếu cần

💪 Happy coding!
