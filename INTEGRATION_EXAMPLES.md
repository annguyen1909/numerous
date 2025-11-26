# 🔌 Integration Guide - Add PDF Export to Your Pages

## Quick Copy-Paste Examples

### 📄 Example 1: Add to Report Details Page

```tsx
// src/app/reports/[id]/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import PremiumPdfButton from '@/components/premium/PremiumPdfButton';

export default async function ReportDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  const report = await prisma.report.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!report) {
    return <div>Report not found</div>;
  }

  // Check if user is premium
  const isPremiumActive =
    report.user.isPremium &&
    report.user.premiumUntil &&
    new Date(report.user.premiumUntil) > new Date();

  // Parse input data to get birth date
  const inputData = report.inputData as any;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Report Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {report.type === 'numerology' ? 'Thần Số Học' : 'Tử Vi'}
          </h1>
          
          {/* Report Content */}
          <div className="prose max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: report.content }} />
          </div>

          {/* PDF Export Button */}
          <div className="border-t pt-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📄 Tải Báo Cáo PDF Chuyên Sâu
            </h3>
            <p className="text-gray-600 mb-4">
              Xuất báo cáo dạng PDF với phân tích chi tiết, dự báo và lời khuyên cá nhân hóa
            </p>
            <PremiumPdfButton
              fullName={report.user.name || 'Người dùng'}
              birthDate={inputData.birthDate || '01/01/1990'}
              readingType="thansohoc"
              isPremium={isPremiumActive}
              className="w-full md:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### 📊 Example 2: Add to Dashboard

```tsx
// src/app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import PremiumPdfButton from '@/components/premium/PremiumPdfButton';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    include: {
      reports: {
        take: 5,
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const isPremiumActive =
    user?.isPremium &&
    user.premiumUntil &&
    new Date(user.premiumUntil) > new Date();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Premium Features Section */}
      {isPremiumActive && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ✨ Tính Năng Premium
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-3xl mb-2">📄</div>
              <h3 className="font-semibold mb-1">Export PDF</h3>
              <p className="text-sm text-gray-600">Tải báo cáo chuyên nghiệp</p>
            </div>
            {/* Add more features */}
          </div>
        </div>
      )}

      {/* Recent Reports with PDF Export */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          📋 Báo Cáo Gần Đây
        </h2>
        <div className="space-y-4">
          {user?.reports.map((report) => {
            const inputData = report.inputData as any;
            return (
              <div key={report.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {report.type === 'numerology' ? 'Thần Số Học' : 'Tử Vi'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.reportType === 'premium' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {report.reportType === 'premium' ? '✨ Premium' : 'Free'}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={`/reports/${report.id}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    Xem Chi Tiết
                  </a>
                  <PremiumPdfButton
                    fullName={user.name || 'Người dùng'}
                    birthDate={inputData.birthDate || '01/01/1990'}
                    readingType="thansohoc"
                    isPremium={isPremiumActive}
                    className="flex-shrink-0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PDF Export History */}
      {isPremiumActive && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📚 Lịch Sử Tải PDF
          </h2>
          <PDFExportHistory userId={user!.id} />
        </div>
      )}
    </div>
  );
}

// Separate client component for export history
'use client';

function PDFExportHistory({ userId }: { userId: string }) {
  const [exports, setExports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/export-pdf')
      .then(r => r.json())
      .then(data => {
        setExports(data.exports || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="space-y-3">
      {exports.map((exp: any) => (
        <a
          key={exp.id}
          href={exp.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📄</span>
            <div>
              <div className="font-medium">{exp.reading_type} - {exp.full_name}</div>
              <div className="text-sm text-gray-500">
                {new Date(exp.created_at).toLocaleString('vi-VN')}
              </div>
            </div>
          </div>
          <span className="text-purple-600 hover:text-purple-700">
            Tải lại →
          </span>
        </a>
      ))}
      {exports.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          Chưa có báo cáo PDF nào được tải
        </p>
      )}
    </div>
  );
}
```

---

### 🎯 Example 3: Add to Premium Page

```tsx
// src/app/premium/page.tsx
import PremiumPdfButton from '@/components/premium/PremiumPdfButton';

export default function PremiumPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Premium Features List */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          ✨ Tính Năng Premium
        </h1>

        {/* PDF Export Feature Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border-2 border-purple-200">
          <div className="flex items-start gap-6">
            <div className="text-6xl">📄</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Xuất Báo Cáo PDF Chuyên Nghiệp
              </h2>
              <p className="text-gray-700 mb-4">
                Tải báo cáo dạng PDF với thiết kế đẹp mắt, nội dung chi tiết được 
                phân tích bởi AI. Lưu trữ vĩnh viễn, tải lại bất cứ lúc nào.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span>Thiết kế chuyên nghiệp, bố cục tối ưu</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span>Phân tích chuyên sâu từ AI (GPT-4)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span>Dự báo chi tiết 2025-2026</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span>Lời khuyên cá nhân hóa về sự nghiệp, tình cảm</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span>Lưu trữ vĩnh viễn, tải lại không giới hạn</span>
                </div>
              </div>

              {/* Demo Button */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                <p className="text-sm text-gray-700 mb-3">
                  <strong>🎬 Demo:</strong> Thử tạo PDF mẫu để xem chất lượng
                </p>
                <PremiumPdfButton
                  fullName="Demo User"
                  birthDate="15/08/1990"
                  readingType="thansohoc"
                  isPremium={false}  // Will show upgrade modal
                  className="w-full md:w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Other Premium Features */}
        {/* ... */}
      </div>
    </div>
  );
}
```

---

### 🔧 Example 4: Standalone PDF Export Page

```tsx
// src/app/export-pdf/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import PremiumPdfButton from '@/components/premium/PremiumPdfButton';

export default async function ExportPdfPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/export-pdf');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      isPremium: true,
      premiumUntil: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  const isPremiumActive =
    user.isPremium &&
    user.premiumUntil &&
    new Date(user.premiumUntil) > new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🔮 Xuất Báo Cáo PDF Premium
          </h1>
          <p className="text-xl text-gray-600">
            Tạo báo cáo chuyên sâu với thiết kế chuyên nghiệp
          </p>
        </div>

        {/* User Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            {isPremiumActive ? (
              <div>
                <span className="px-4 py-2 bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 font-semibold rounded-full">
                  ✨ Premium Active
                </span>
                {user.premiumUntil && (
                  <p className="text-sm text-gray-500 mt-2 text-right">
                    Đến: {new Date(user.premiumUntil).toLocaleDateString('vi-VN')}
                  </p>
                )}
              </div>
            ) : (
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                Free Account
              </span>
            )}
          </div>
        </div>

        {/* Export Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Thần Số Học */}
          <ExportCard
            icon="🔢"
            title="Thần Số Học"
            description="Phân tích số học, đường đời, sứ mệnh"
            color="purple"
            user={user}
            isPremium={isPremiumActive}
            readingType="thansohoc"
          />

          {/* Tử Vi */}
          <ExportCard
            icon="⭐"
            title="Tử Vi"
            description="Luận giải tử vi, vận mệnh, hung cát"
            color="blue"
            user={user}
            isPremium={isPremiumActive}
            readingType="tuvi"
          />

          {/* Chiêu Sinh */}
          <ExportCard
            icon="🌟"
            title="Chiêu Sinh"
            description="Phân tích ngày sinh, đặc điểm riêng"
            color="green"
            user={user}
            isPremium={isPremiumActive}
            readingType="chieusinh"
          />

          {/* Tính Cách */}
          <ExportCard
            icon="💫"
            title="Tính Cách"
            description="Phân tích tính cách, điểm mạnh yếu"
            color="pink"
            user={user}
            isPremium={isPremiumActive}
            readingType="tinhcach"
          />
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">ℹ️ Lưu ý:</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Tính năng này dành cho tài khoản Premium</li>
            <li>• Nội dung được tạo bởi AI (GPT-4) với phân tích chuyên sâu</li>
            <li>• Thời gian tạo: 10-30 giây</li>
            <li>• File PDF lưu trữ vĩnh viễn, tải lại bất cứ lúc nào</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ExportCard({ icon, title, description, color, user, isPremium, readingType }: any) {
  const colorClasses = {
    purple: 'border-purple-200 hover:border-purple-300',
    blue: 'border-blue-200 hover:border-blue-300',
    green: 'border-green-200 hover:border-green-300',
    pink: 'border-pink-200 hover:border-pink-300',
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-2 ${colorClasses[color]} transition`}>
      <div className="text-5xl mb-4 text-center">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 mb-6 text-center">{description}</p>
      <PremiumPdfButton
        fullName={user.name || 'Người dùng'}
        birthDate="15/08/1990"  // You can make this dynamic with a form
        readingType={readingType}
        isPremium={isPremium}
        className="w-full"
      />
    </div>
  );
}
```

---

## 🎨 Styling Tips

### Custom Button Styles

```tsx
// Larger button
<PremiumPdfButton
  {...props}
  className="w-full py-4 text-lg"
/>

// Outlined style
<PremiumPdfButton
  {...props}
  className="border-2 border-purple-600 bg-white text-purple-600 hover:bg-purple-50"
/>

// Compact button
<PremiumPdfButton
  {...props}
  className="px-4 py-2 text-sm"
/>
```

### Modal Customization

Edit `src/components/premium/PremiumUpgradeModal.tsx`:

```tsx
// Change colors
<div className="bg-linear-to-r from-purple-600 to-blue-600">
  ↓
<div className="bg-linear-to-r from-orange-600 to-red-600">

// Change pricing
<div className="text-3xl font-bold text-purple-600">
  199.000₫
</div>
```

---

## 🔗 Navigation Links

### Add to Navbar

```tsx
// src/components/layout/Navbar.tsx
{user?.isPremium && (
  <a
    href="/export-pdf"
    className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700"
  >
    <span>📄</span>
    <span>Tải PDF</span>
  </a>
)}
```

### Add to Sidebar

```tsx
// src/components/layout/Sidebar.tsx
const premiumLinks = [
  {
    href: '/export-pdf',
    label: 'Tải PDF',
    icon: '📄',
    premiumOnly: true,
  },
  // ...
];
```

---

## ✅ Testing Your Integration

### Step 1: Basic Test
```tsx
<PremiumPdfButton
  fullName="Test User"
  birthDate="01/01/1990"
  readingType="thansohoc"
  isPremium={false}  // Should show modal
/>
```

### Step 2: Premium Test
```tsx
<PremiumPdfButton
  fullName="Premium User"
  birthDate="01/01/1990"
  readingType="thansohoc"
  isPremium={true}  // Should generate PDF
/>
```

### Step 3: Verify in Browser
1. Click button
2. Check Network tab for `/api/export-pdf` request
3. Verify PDF downloads
4. Check Supabase Storage for file

---

## 🎯 Common Patterns

### Pattern 1: Conditional Rendering
```tsx
{user.isPremium ? (
  <PremiumPdfButton {...props} isPremium={true} />
) : (
  <button onClick={() => router.push('/premium')}>
    Nâng Cấp để Tải PDF
  </button>
)}
```

### Pattern 2: With Form Data
```tsx
const [formData, setFormData] = useState({
  fullName: '',
  birthDate: '',
});

<input
  value={formData.fullName}
  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
/>

<PremiumPdfButton
  fullName={formData.fullName}
  birthDate={formData.birthDate}
  readingType="thansohoc"
  isPremium={user.isPremium}
/>
```

### Pattern 3: Callback After Success
```tsx
// Modify PremiumPdfButton to accept onSuccess prop
<PremiumPdfButton
  {...props}
  onSuccess={() => {
    console.log('PDF created!');
    // Refresh export history
    // Show success toast
  }}
/>
```

---

## 📝 Quick Reference

### Props
```typescript
interface PremiumPdfButtonProps {
  fullName: string;        // Required
  birthDate: string;       // Format: "DD/MM/YYYY"
  readingType: string;     // 'thansohoc' | 'tuvi' | 'chieusinh' | 'tinhcach'
  isPremium?: boolean;     // Default: false
  className?: string;      // Additional Tailwind classes
}
```

### Reading Types
- `thansohoc` - Thần Số Học (Numerology)
- `tuvi` - Tử Vi (Astrology)
- `chieusinh` - Chiêu Sinh (Birth Analysis)
- `tinhcach` - Tính Cách (Personality)

### API Endpoint
```
POST /api/export-pdf
GET  /api/export-pdf  (history)
```

---

That's it! Copy and paste these examples into your pages and customize as needed. 🚀
