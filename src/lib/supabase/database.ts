/**
 * Supabase Database Helper
 * Log PDF exports to database
 */

import { getSupabaseServer } from './server';

export interface PdfExportLog {
  id?: string;
  user_id: string;
  reading_type: string;
  file_url: string;
  file_path: string;
  full_name: string;
  birth_date: string;
  created_at?: string;
}

/**
 * Log PDF export to database
 */
export async function logPdfExport(log: PdfExportLog): Promise<void> {
  const { error } = await getSupabaseServer()
    .from('pdf_exports')
    .insert({
      user_id: log.user_id,
      reading_type: log.reading_type,
      file_url: log.file_url,
      file_path: log.file_path,
      full_name: log.full_name,
      birth_date: log.birth_date,
    });

  if (error) {
    console.error('Database log error:', error);
    throw new Error(`Failed to log PDF export: ${error.message}`);
  }
}

/**
 * Get user's PDF export history
 */
export async function getUserPdfExports(userId: string): Promise<PdfExportLog[]> {
  const { data, error } = await getSupabaseServer()
    .from('pdf_exports')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database query error:', error);
    throw new Error(`Failed to get PDF exports: ${error.message}`);
  }

  return data || [];
}

/**
 * Delete PDF export log
 */
export async function deletePdfExportLog(exportId: string): Promise<void> {
  const { error } = await getSupabaseServer()
    .from('pdf_exports')
    .delete()
    .eq('id', exportId);

  if (error) {
    console.error('Database delete error:', error);
    throw new Error(`Failed to delete export log: ${error.message}`);
  }
}
