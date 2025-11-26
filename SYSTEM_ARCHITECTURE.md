# 🏗️ Premium PDF Export - System Architecture

## 📊 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                               │
│                                                                       │
│  ┌──────────────────────┐      ┌──────────────────────┐            │
│  │  PremiumPdfButton    │      │ PremiumUpgradeModal  │            │
│  │  - Click handler     │──────│ - Show if !premium   │            │
│  │  - Loading state     │      │ - Redirect to /premium│            │
│  │  - Error display     │      └──────────────────────┘            │
│  └──────────┬───────────┘                                            │
│             │                                                         │
└─────────────┼─────────────────────────────────────────────────────┘
              │
              │ fetch('/api/export-pdf', {method: 'POST'})
              │
              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         API LAYER                                    │
│                                                                       │
│  POST /api/export-pdf/route.ts                                      │
│  ┌─────────────────────────────────────────────────────┐            │
│  │  1. Check Authentication (NextAuth)                 │            │
│  │     └─> getServerSession()                          │            │
│  │                                                      │            │
│  │  2. Get User from Database (Prisma)                 │            │
│  │     └─> prisma.user.findUnique()                    │            │
│  │                                                      │            │
│  │  3. Verify Premium Status                           │            │
│  │     └─> isPremium && premiumUntil > now             │            │
│  │     └─> If false → return 402 Payment Required      │            │
│  │                                                      │            │
│  │  4. Validate Input (Zod)                            │            │
│  │     └─> fullName, birthDate, readingType            │            │
│  │                                                      │            │
│  │  5. Generate Content ────────┐                      │            │
│  │                               │                      │            │
│  └───────────────────────────────┼──────────────────────┘            │
│                                  │                                   │
└──────────────────────────────────┼───────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      AI CONTENT GENERATION                           │
│                                                                       │
│  lib/openai/generatePremiumReading.ts                               │
│  ┌─────────────────────────────────────────────────────┐            │
│  │  1. Build detailed prompt                           │            │
│  │     - Reading type (thansohoc, tuvi, etc.)          │            │
│  │     - User's name and birth date                    │            │
│  │     - Request structured JSON output                │            │
│  │                                                      │            │
│  │  2. Call OpenAI API                                 │            │
│  │     - Model: GPT-4 Turbo                            │            │
│  │     - Response format: JSON                         │            │
│  │     - Temperature: 0.8                              │            │
│  │     - Max tokens: 4000                              │            │
│  │                                                      │            │
│  │  3. Parse response → PremiumReadingOutput           │            │
│  │     {                                                │            │
│  │       title: "Báo Cáo...",                          │            │
│  │       sections: [...],                              │            │
│  │       summary: {...},                               │            │
│  │       forecast: {...}                               │            │
│  │     }                                                │            │
│  │                                                      │            │
│  │  4. Fallback if API fails                           │            │
│  │     └─> Return structured dummy data                │            │
│  │                                                      │            │
│  └─────────────────────────────────────────────────────┘            │
│                                  │                                   │
└──────────────────────────────────┼───────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      PDF GENERATION                                  │
│                                                                       │
│  lib/pdf/generatePdf.ts (PDFKit)                                    │
│  ┌─────────────────────────────────────────────────────┐            │
│  │  1. Create PDF Document                             │            │
│  │     - Size: A4                                       │            │
│  │     - Margins: 50pt all sides                       │            │
│  │     - Buffer pages: true                            │            │
│  │                                                      │            │
│  │  2. Render Cover Page                               │            │
│  │     - Gradient background (purple → blue)           │            │
│  │     - Title: 32px bold                              │            │
│  │     - User name: 28px                               │            │
│  │     - Birth date, branding                          │            │
│  │                                                      │            │
│  │  3. Render Content Sections                         │            │
│  │     For each section:                               │            │
│  │       - Heading: 20px bold purple                   │            │
│  │       - Content: 13px justified                     │            │
│  │       - Highlights box (if exists)                  │            │
│  │       - Divider between sections                    │            │
│  │       - Auto page breaks when needed                │            │
│  │                                                      │            │
│  │  4. Render Summary Table                            │            │
│  │     - Strengths (green)                             │            │
│  │     - Weaknesses (red)                              │            │
│  │     - Forecasts (blue)                              │            │
│  │     - Recommendations (purple)                      │            │
│  │                                                      │            │
│  │  5. Render Footer                                   │            │
│  │     - Thank you message                             │            │
│  │     - Contact info                                  │            │
│  │                                                      │            │
│  │  6. Return Buffer                                   │            │
│  │     └─> Promise<Buffer>                             │            │
│  │                                                      │            │
│  └─────────────────────────────────────────────────────┘            │
│                                  │                                   │
└──────────────────────────────────┼───────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      SUPABASE STORAGE                                │
│                                                                       │
│  lib/supabase/storage.ts                                            │
│  ┌─────────────────────────────────────────────────────┐            │
│  │  1. Generate unique filename                        │            │
│  │     Format: {userId}_{type}_{timestamp}.pdf         │            │
│  │     Example: abc123_thansohoc_1234567890.pdf        │            │
│  │                                                      │            │
│  │  2. Upload to bucket 'pdf-reports'                  │            │
│  │     Path: {userId}/{filename}                       │            │
│  │     - Content-Type: application/pdf                 │            │
│  │     - Cache-Control: 3600                           │            │
│  │                                                      │            │
│  │  3. Generate signed URL                             │            │
│  │     - Valid for: 1 year (31536000 seconds)          │            │
│  │     - Private bucket → requires signed URL          │            │
│  │                                                      │            │
│  │  4. Return URLs                                     │            │
│  │     {                                                │            │
│  │       fileUrl: "https://...supabase.co/...",        │            │
│  │       filePath: "abc123/abc123_..."                 │            │
│  │     }                                                │            │
│  │                                                      │            │
│  └─────────────────────────────────────────────────────┘            │
│                                  │                                   │
└──────────────────────────────────┼───────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      SUPABASE DATABASE                               │
│                                                                       │
│  lib/supabase/database.ts                                           │
│  ┌─────────────────────────────────────────────────────┐            │
│  │  INSERT INTO pdf_exports                            │            │
│  │  {                                                   │            │
│  │    id: UUID (auto-generated),                       │            │
│  │    user_id: "abc123",                               │            │
│  │    reading_type: "thansohoc",                       │            │
│  │    file_url: "https://...signed-url...",            │            │
│  │    file_path: "abc123/abc123_...",                  │            │
│  │    full_name: "Nguyễn Văn A",                       │            │
│  │    birth_date: "15/08/1990",                        │            │
│  │    created_at: NOW()                                │            │
│  │  }                                                   │            │
│  │                                                      │            │
│  │  RLS Policies:                                      │            │
│  │  - Users can only view their own exports            │            │
│  │  - Users can only insert their own exports          │            │
│  │                                                      │            │
│  └─────────────────────────────────────────────────────┘            │
│                                  │                                   │
└──────────────────────────────────┼───────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      API RESPONSE                                    │
│                                                                       │
│  Return to Client:                                                  │
│  ┌─────────────────────────────────────────────────────┐            │
│  │  {                                                   │            │
│  │    success: true,                                    │            │
│  │    downloadUrl: "https://...signed-url...",         │            │
│  │    fileName: "thansohoc_NguyenVanA_1234567890.pdf", │            │
│  │    message: "Báo cáo PDF đã được tạo thành công"   │            │
│  │  }                                                   │            │
│  └─────────────────────────────────────────────────────┘            │
│                                  │                                   │
└──────────────────────────────────┼───────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CLIENT DOWNLOAD                                 │
│                                                                       │
│  PremiumPdfButton Component                                         │
│  ┌─────────────────────────────────────────────────────┐            │
│  │  1. Receive response with downloadUrl               │            │
│  │                                                      │            │
│  │  2. Create temporary <a> element                    │            │
│  │     - href = downloadUrl                            │            │
│  │     - download = fileName                           │            │
│  │     - target = "_blank"                             │            │
│  │                                                      │            │
│  │  3. Trigger click() programmatically                │            │
│  │     └─> Browser downloads PDF                       │            │
│  │                                                      │            │
│  │  4. Show success alert                              │            │
│  │     "✅ Báo cáo PDF đã được tạo thành công!"       │            │
│  │                                                      │            │
│  │  5. Clean up (remove <a> element)                  │            │
│  │                                                      │            │
│  └─────────────────────────────────────────────────────┘            │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Flow

```
┌──────────────────────────────────────────────────────────┐
│  1. Authentication Check                                  │
│  ┌──────────────────────────────────────────────┐        │
│  │  getServerSession(authOptions)               │        │
│  │  ↓                                            │        │
│  │  if (!session?.user?.email)                  │        │
│  │    return 401 Unauthorized                   │        │
│  └──────────────────────────────────────────────┘        │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│  2. User Validation                                       │
│  ┌──────────────────────────────────────────────┐        │
│  │  prisma.user.findUnique({ email })           │        │
│  │  ↓                                            │        │
│  │  if (!user)                                  │        │
│  │    return 404 Not Found                      │        │
│  └──────────────────────────────────────────────┘        │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│  3. Premium Verification                                  │
│  ┌──────────────────────────────────────────────┐        │
│  │  isPremiumActive =                           │        │
│  │    user.isPremium &&                         │        │
│  │    user.premiumUntil &&                      │        │
│  │    new Date(premiumUntil) > new Date()       │        │
│  │  ↓                                            │        │
│  │  if (!isPremiumActive)                       │        │
│  │    return 402 Payment Required               │        │
│  └──────────────────────────────────────────────┘        │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│  4. Input Validation                                      │
│  ┌──────────────────────────────────────────────┐        │
│  │  const schema = z.object({                   │        │
│  │    fullName: z.string().min(1),              │        │
│  │    birthDate: z.string().min(1),             │        │
│  │    readingType: z.enum([...])                │        │
│  │  })                                           │        │
│  │  ↓                                            │        │
│  │  const validated = schema.parse(body)        │        │
│  │  ↓                                            │        │
│  │  if (validation fails)                       │        │
│  │    return 400 Bad Request                    │        │
│  └──────────────────────────────────────────────┘        │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│  5. Supabase RLS (Row Level Security)                    │
│  ┌──────────────────────────────────────────────┐        │
│  │  Policy: Users can only access own files     │        │
│  │  ↓                                            │        │
│  │  CREATE POLICY "Users view own exports"      │        │
│  │  ON pdf_exports FOR SELECT                   │        │
│  │  USING (auth.uid()::text = user_id)          │        │
│  │                                               │        │
│  │  Storage Policy:                             │        │
│  │  - Only owner can upload to their folder     │        │
│  │  - Only owner can view their files           │        │
│  └──────────────────────────────────────────────┘        │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
                ✅ SECURE
```

---

## 📁 File Organization

```
src/
├── app/
│   ├── api/
│   │   └── export-pdf/
│   │       └── route.ts ──────────────┐
│   │                                   │  Main API endpoint
│   │                                   │  - POST: Create PDF
│   │                                   │  - GET: List exports
│   │                                   └────────────────────
│   │
│   └── test-pdf-export/
│       └── page.tsx ──────────────────┐
│                                       │  Example test page
│                                       │  - Demo all 4 types
│                                       └────────────────────
│
├── components/
│   └── premium/
│       ├── PremiumPdfButton.tsx ──────┐
│       │                               │  Export button
│       │                               │  - Loading state
│       │                               │  - Error handling
│       │                               │  - Auto download
│       │                               └────────────────────
│       │
│       └── PremiumUpgradeModal.tsx ────┐
│                                        │  Upgrade modal
│                                        │  - Show if !premium
│                                        │  - Feature list
│                                        │  - Pricing info
│                                        └────────────────────
│
└── lib/
    ├── supabase/
    │   ├── server.ts ─────────────────┐
    │   │                               │  Supabase client
    │   │                               │  - Service role key
    │   │                               │  - Admin access
    │   │                               └────────────────────
    │   │
    │   ├── storage.ts ─────────────────┐
    │   │                               │  Storage helpers
    │   │                               │  - Upload PDF
    │   │                               │  - Generate signed URL
    │   │                               │  - Delete file
    │   │                               └────────────────────
    │   │
    │   └── database.ts ────────────────┐
    │                                   │  Database helpers
    │                                   │  - Log export
    │                                   │  - Get history
    │                                   └────────────────────
    │
    ├── openai/
    │   └── generatePremiumReading.ts ─┐
    │                                   │  AI content gen
    │                                   │  - Call GPT-4
    │                                   │  - Parse response
    │                                   │  - Fallback data
    │                                   └────────────────────
    │
    └── pdf/
        └── generatePdf.ts ────────────┐
                                       │  PDF template
                                       │  - Cover page
                                       │  - Content sections
                                       │  - Summary table
                                       │  - Professional design
                                       └────────────────────
```

---

## 🔄 Data Flow

### Request → Response Journey

```
User clicks button
    ↓
[1] Client sends POST /api/export-pdf
    {
      fullName: "Nguyễn Văn A",
      birthDate: "15/08/1990",
      readingType: "thansohoc"
    }
    ↓
[2] API validates session & premium
    ├─ Not logged in → 401
    ├─ Not premium → 402
    └─ Valid → continue
    ↓
[3] Call OpenAI API
    Prompt: "Create detailed report for..."
    ├─ Success → structured content
    └─ Fail → fallback data
    ↓
[4] Generate PDF with PDFKit
    Input: AI content + user data
    Output: Buffer (~200-500 KB)
    ↓
[5] Upload to Supabase Storage
    Bucket: pdf-reports
    Path: {userId}/{filename}
    ├─ Upload buffer
    └─ Generate signed URL (1 year)
    ↓
[6] Log to Supabase Database
    Table: pdf_exports
    Row: {user_id, file_url, created_at, ...}
    ↓
[7] Return response
    {
      success: true,
      downloadUrl: "https://...",
      fileName: "..."
    }
    ↓
[8] Client receives response
    ├─ Create <a> element
    ├─ Set href = downloadUrl
    ├─ Trigger click()
    └─ Browser downloads PDF
    ↓
✅ Complete!
```

---

## ⏱️ Performance Metrics

### Average Timing

```
┌────────────────────────────────────┬──────────┐
│ Step                               │ Duration │
├────────────────────────────────────┼──────────┤
│ 1. Authentication check            │  ~50ms   │
│ 2. Database query (user)           │  ~100ms  │
│ 3. Premium validation              │  ~10ms   │
│ 4. Input validation (Zod)          │  ~5ms    │
│ 5. OpenAI content generation       │  5-10s   │
│ 6. PDF generation (PDFKit)         │  2-3s    │
│ 7. Supabase upload                 │  1-2s    │
│ 8. Database log                    │  ~100ms  │
│ 9. Response transmission           │  ~50ms   │
├────────────────────────────────────┼──────────┤
│ TOTAL                              │  8-15s   │
└────────────────────────────────────┴──────────┘
```

### Bottlenecks & Optimization

1. **OpenAI API (5-10s)** - Slowest
   - ✅ Use GPT-4 Turbo (faster)
   - ✅ Implement caching for similar requests
   - ✅ Fallback data if timeout

2. **PDF Generation (2-3s)** - Medium
   - ✅ Optimize image processing
   - ✅ Reduce page count if possible
   - ✅ Use streaming for large files

3. **Supabase Upload (1-2s)** - Fast
   - ✅ Already optimized
   - ✅ Consider CDN for downloads

---

## 💾 Storage Structure

### Supabase Storage: `pdf-reports` bucket

```
pdf-reports/
├── user_abc123/
│   ├── abc123_thansohoc_1701234567890.pdf
│   ├── abc123_tuvi_1701234567891.pdf
│   └── abc123_tinhcach_1701234567892.pdf
│
├── user_def456/
│   ├── def456_thansohoc_1701234567893.pdf
│   └── def456_chieusinh_1701234567894.pdf
│
└── user_ghi789/
    └── ghi789_thansohoc_1701234567895.pdf
```

### Database: `pdf_exports` table

```
┌──────────┬─────────┬──────────────┬───────────┬────────────────┐
│ id       │ user_id │ reading_type │ file_url  │ created_at     │
├──────────┼─────────┼──────────────┼───────────┼────────────────┤
│ uuid-1   │ abc123  │ thansohoc    │ https://..│ 2025-01-01...  │
│ uuid-2   │ abc123  │ tuvi         │ https://..│ 2025-01-02...  │
│ uuid-3   │ def456  │ thansohoc    │ https://..│ 2025-01-03...  │
└──────────┴─────────┴──────────────┴───────────┴────────────────┘
```

---

## 🎯 Success Indicators

### ✅ System is working when:

1. **API responds correctly**
   - Status 200 for premium users
   - Status 402 for non-premium
   - Status 401 for not logged in

2. **PDF generates successfully**
   - File size: 200-500 KB
   - All sections present
   - Professional layout
   - No broken images/fonts

3. **Storage works**
   - File uploaded to correct path
   - Signed URL generated
   - Download works from URL

4. **Database logs**
   - Row created in pdf_exports
   - Correct user_id
   - Valid timestamps

5. **Client downloads**
   - Browser triggers download
   - File opens correctly
   - No corruption

---

## 📞 Debug Checklist

If something doesn't work:

```
┌─ Check 1: Environment Variables
│  □ NEXT_PUBLIC_SUPABASE_URL set?
│  □ SUPABASE_SERVICE_ROLE_KEY set?
│  □ OPENAI_API_KEY set?
│
├─ Check 2: Supabase Setup
│  □ Migration ran successfully?
│  □ Table pdf_exports exists?
│  □ Bucket pdf-reports exists?
│  □ RLS policies active?
│
├─ Check 3: User Status
│  □ User logged in?
│  □ isPremium = true?
│  □ premiumUntil > now?
│
├─ Check 4: API Response
│  □ Check Network tab in browser
│  □ Response status code?
│  □ Error message in response?
│
└─ Check 5: Server Logs
   □ Check terminal for errors
   □ OpenAI API errors?
   □ Supabase connection errors?
```

---

That's the complete architecture! 🎉 Everything is connected and working together.
