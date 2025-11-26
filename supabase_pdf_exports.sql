-- =====================================================
-- SUPABASE MIGRATION: PDF Exports Feature
-- =====================================================
-- Run this in Supabase SQL Editor

-- 1. Create pdf_exports table
CREATE TABLE IF NOT EXISTS pdf_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  reading_type TEXT NOT NULL CHECK (reading_type IN ('thansohoc', 'tuvi', 'chieusinh', 'tinhcach')),
  file_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  full_name TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pdf_exports_user_id ON pdf_exports(user_id);
CREATE INDEX IF NOT EXISTS idx_pdf_exports_reading_type ON pdf_exports(reading_type);
CREATE INDEX IF NOT EXISTS idx_pdf_exports_created_at ON pdf_exports(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE pdf_exports ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies

-- Policy: Users can view their own PDF exports
CREATE POLICY "Users can view their own exports"
ON pdf_exports
FOR SELECT
USING (auth.uid()::text = user_id);

-- Policy: Users can insert their own PDF exports
CREATE POLICY "Users can create their own exports"
ON pdf_exports
FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

-- Policy: Users can delete their own PDF exports
CREATE POLICY "Users can delete their own exports"
ON pdf_exports
FOR DELETE
USING (auth.uid()::text = user_id);

-- 5. Create storage bucket for PDF files
INSERT INTO storage.buckets (id, name, public)
VALUES ('pdf-reports', 'pdf-reports', false)
ON CONFLICT (id) DO NOTHING;

-- 6. Set up storage policies for pdf-reports bucket

-- Policy: Authenticated users can upload to their own folder
CREATE POLICY "Users can upload PDFs to their folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'pdf-reports' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can read their own PDFs
CREATE POLICY "Users can view their own PDFs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'pdf-reports' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can delete their own PDFs
CREATE POLICY "Users can delete their own PDFs"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'pdf-reports' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 7. Grant necessary permissions
GRANT ALL ON pdf_exports TO authenticated;
GRANT ALL ON pdf_exports TO service_role;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if table was created successfully
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'pdf_exports'
ORDER BY ordinal_position;

-- Check if indexes were created
SELECT 
  indexname, 
  indexdef 
FROM pg_indexes 
WHERE tablename = 'pdf_exports';

-- Check if storage bucket exists
SELECT * FROM storage.buckets WHERE id = 'pdf-reports';

-- Check RLS policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd 
FROM pg_policies 
WHERE tablename = 'pdf_exports';

-- =====================================================
-- CLEANUP (if needed)
-- =====================================================
-- Uncomment to drop everything and start fresh

-- DROP POLICY IF EXISTS "Users can view their own exports" ON pdf_exports;
-- DROP POLICY IF EXISTS "Users can create their own exports" ON pdf_exports;
-- DROP POLICY IF EXISTS "Users can delete their own exports" ON pdf_exports;
-- DROP TABLE IF EXISTS pdf_exports CASCADE;
-- DELETE FROM storage.buckets WHERE id = 'pdf-reports';
