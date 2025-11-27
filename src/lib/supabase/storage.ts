/**
 * Supabase Storage Helper
 * Upload and manage files in Supabase Storage
 */

import { getSupabaseServer } from './server';

const PDF_BUCKET = 'pdf-reports';

/**
 * Upload PDF buffer to Supabase Storage
 * Returns public/signed URL
 */
export async function uploadPdfToSupabase(
  buffer: Buffer,
  userId: string,
  readingType: string
): Promise<{ fileUrl: string; filePath: string }> {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${userId}_${readingType}_${timestamp}.pdf`;
    const filePath = `${userId}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await getSupabaseServer().storage
      .from(PDF_BUCKET)
      .upload(filePath, buffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Failed to upload PDF: ${error.message}`);
    }

    // Generate signed URL (valid for 1 year)
    const { data: signedUrlData } = await getSupabaseServer().storage
      .from(PDF_BUCKET)
      .createSignedUrl(filePath, 31536000); // 1 year in seconds

    if (!signedUrlData?.signedUrl) {
      throw new Error('Failed to generate signed URL');
    }

    return {
      fileUrl: signedUrlData.signedUrl,
      filePath: data.path,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

/**
 * Delete PDF from Supabase Storage
 */
export async function deletePdfFromSupabase(filePath: string): Promise<void> {
  const { error } = await getSupabaseServer().storage
    .from(PDF_BUCKET)
    .remove([filePath]);

  if (error) {
    console.error('Delete error:', error);
    throw new Error(`Failed to delete PDF: ${error.message}`);
  }
}

/**
 * Get signed URL for existing PDF
 */
export async function getSignedUrl(filePath: string, expiresIn: number = 3600): Promise<string> {
  const { data, error } = await getSupabaseServer().storage
    .from(PDF_BUCKET)
    .createSignedUrl(filePath, expiresIn);

  if (error || !data?.signedUrl) {
    throw new Error('Failed to generate signed URL');
  }

  return data.signedUrl;
}
