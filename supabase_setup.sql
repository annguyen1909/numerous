-- ============================================
-- SUPABASE SQL SETUP SCRIPT
-- Vietnamese Numerology & Horoscope Website
-- ============================================
-- Run this script in Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Paste and Run
-- ============================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- DROP EXISTING TABLES (if you need to reset)
-- ============================================
-- Uncomment these lines if you want to start fresh
-- DROP TABLE IF EXISTS "VerificationToken" CASCADE;
-- DROP TABLE IF EXISTS "BlogPost" CASCADE;
-- DROP TABLE IF EXISTS "Payment" CASCADE;
-- DROP TABLE IF EXISTS "Report" CASCADE;
-- DROP TABLE IF EXISTS "Session" CASCADE;
-- DROP TABLE IF EXISTS "Account" CASCADE;
-- DROP TABLE IF EXISTS "User" CASCADE;

-- ============================================
-- CREATE TABLES
-- ============================================

-- User Table (for authentication and premium tracking)
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "isPremium" BOOLEAN DEFAULT FALSE NOT NULL,
    "premiumUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Account Table (for NextAuth OAuth providers)
CREATE TABLE IF NOT EXISTS "Account" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") 
        REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Account_provider_providerAccountId_key" 
        UNIQUE ("provider", "providerAccountId")
);

-- Session Table (for NextAuth sessions)
CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") 
        REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Report Table (stores numerology and horoscope reports)
CREATE TABLE IF NOT EXISTS "Report" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL, -- 'numerology' or 'horoscope'
    "reportType" TEXT NOT NULL, -- 'free' or 'premium'
    "inputData" JSONB NOT NULL, -- User input (name, birthdate, etc.)
    "result" JSONB NOT NULL, -- Calculation results
    "content" TEXT NOT NULL, -- AI-generated content
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") 
        REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Payment Table (tracks bank transfer payments)
CREATE TABLE IF NOT EXISTS "Payment" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "bankName" TEXT,
    "transactionId" TEXT,
    "transactionTime" TIMESTAMP(3),
    "status" TEXT DEFAULT 'pending' NOT NULL, -- 'pending', 'verified', 'rejected'
    "notes" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT, -- Admin who verified
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") 
        REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- BlogPost Table (for blog content)
CREATE TABLE IF NOT EXISTS "BlogPost" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "category" TEXT, -- 'numerology', 'horoscope', 'tips'
    "published" BOOLEAN DEFAULT FALSE NOT NULL,
    "views" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- VerificationToken Table (for NextAuth email verification)
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT UNIQUE NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "VerificationToken_identifier_token_key" 
        UNIQUE ("identifier", "token")
);

-- ============================================
-- CREATE INDEXES (for query performance)
-- ============================================

-- User indexes
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");

-- Account indexes
CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account"("userId");

-- Session indexes
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "Session_sessionToken_idx" ON "Session"("sessionToken");

-- Report indexes
CREATE INDEX IF NOT EXISTS "Report_userId_idx" ON "Report"("userId");
CREATE INDEX IF NOT EXISTS "Report_type_idx" ON "Report"("type");
CREATE INDEX IF NOT EXISTS "Report_createdAt_idx" ON "Report"("createdAt");

-- Payment indexes
CREATE INDEX IF NOT EXISTS "Payment_userId_idx" ON "Payment"("userId");
CREATE INDEX IF NOT EXISTS "Payment_status_idx" ON "Payment"("status");
CREATE INDEX IF NOT EXISTS "Payment_createdAt_idx" ON "Payment"("createdAt");

-- BlogPost indexes
CREATE INDEX IF NOT EXISTS "BlogPost_slug_idx" ON "BlogPost"("slug");
CREATE INDEX IF NOT EXISTS "BlogPost_published_idx" ON "BlogPost"("published");
CREATE INDEX IF NOT EXISTS "BlogPost_category_idx" ON "BlogPost"("category");
CREATE INDEX IF NOT EXISTS "BlogPost_createdAt_idx" ON "BlogPost"("createdAt");

-- ============================================
-- CREATE FUNCTIONS (for auto-updating timestamps)
-- ============================================

-- Function to auto-update "updatedAt" column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to User table
DROP TRIGGER IF EXISTS update_user_updated_at ON "User";
CREATE TRIGGER update_user_updated_at
    BEFORE UPDATE ON "User"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to Payment table
DROP TRIGGER IF EXISTS update_payment_updated_at ON "Payment";
CREATE TRIGGER update_payment_updated_at
    BEFORE UPDATE ON "Payment"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to BlogPost table
DROP TRIGGER IF EXISTS update_blogpost_updated_at ON "BlogPost";
CREATE TRIGGER update_blogpost_updated_at
    BEFORE UPDATE ON "BlogPost"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INSERT SAMPLE DATA (optional, for testing)
-- ============================================

-- Sample blog posts
INSERT INTO "BlogPost" ("id", "title", "slug", "excerpt", "content", "category", "published", "views")
VALUES 
    (
        gen_random_uuid()::TEXT,
        'Ý Nghĩa Của Số 1 Trong Thần Số Học',
        'y-nghia-cua-so-1-trong-than-so-hoc',
        'Số 1 đại diện cho sự khởi đầu, lãnh đạo và độc lập. Tìm hiểu ý nghĩa sâu xa của con số này.',
        '<p>Số 1 trong thần số học là con số của những người tiên phong, những nhà lãnh đạo thiên bẩm...</p>',
        'numerology',
        TRUE,
        1250
    ),
    (
        gen_random_uuid()::TEXT,
        'Tử Vi Cung Bạch Dương - Tính Cách Và Vận Mệnh',
        'tu-vi-cung-bach-duong-tinh-cach-va-van-menh',
        'Bạch Dương (Aries) là cung hoàng đạo đầu tiên, mang năng lượng của sự khởi đầu và nhiệt huyết.',
        '<p>Những người sinh dưới cung Bạch Dương thường có tính cách mạnh mẽ, quyết đoán...</p>',
        'horoscope',
        TRUE,
        2100
    ),
    (
        gen_random_uuid()::TEXT,
        '5 Cách Tăng Vận May Trong Cuộc Sống',
        '5-cach-tang-van-may-trong-cuoc-song',
        'Khám phá những phương pháp đơn giản nhưng hiệu quả để thu hút vận may và thành công.',
        '<p>Vận may không chỉ đến từ may mắn ngẫu nhiên, mà còn từ cách bạn sống và hành động...</p>',
        'tips',
        TRUE,
        3450
    )
ON CONFLICT ("slug") DO NOTHING;

-- ============================================
-- VERIFY INSTALLATION
-- ============================================

-- Check all tables were created
SELECT 
    tablename,
    schemaname
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Count rows in each table
SELECT 'User' as table_name, COUNT(*) as row_count FROM "User"
UNION ALL
SELECT 'Account', COUNT(*) FROM "Account"
UNION ALL
SELECT 'Session', COUNT(*) FROM "Session"
UNION ALL
SELECT 'Report', COUNT(*) FROM "Report"
UNION ALL
SELECT 'Payment', COUNT(*) FROM "Payment"
UNION ALL
SELECT 'BlogPost', COUNT(*) FROM "BlogPost"
UNION ALL
SELECT 'VerificationToken', COUNT(*) FROM "VerificationToken";

-- ============================================
-- SUCCESS! 🎉
-- ============================================
-- Your database is now ready to use!
-- 
-- Next steps:
-- 1. Copy your Supabase connection string
-- 2. Add it to .env.local as DATABASE_URL
-- 3. Run: npx prisma generate
-- 4. Start your app: npm run dev
-- ============================================
