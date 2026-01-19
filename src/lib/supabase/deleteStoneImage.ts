import { supabase } from '@/lib/supabase/client'

export async function deleteStoneImage(imageUrl: string) {
  try {
    const path = imageUrl.split('/storage/v1/object/public/')[1]
    if (!path) return

    await supabase.storage.from('stones').remove([path])
  } catch {
    // silent fail (image deletion is non-critical)
  }
}
