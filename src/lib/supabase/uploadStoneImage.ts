import { supabase } from '@/lib/supabase/client'

export async function uploadStoneImage(
  file: File,
  type: string
): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `${type}/${fileName}`

  const { error } = await supabase.storage
    .from('stones')
    .upload(filePath, file)

  if (error) {
    console.error(error)
    return null
  }

  const { data } = supabase.storage
    .from('stones')
    .getPublicUrl(filePath)

  return data.publicUrl
}
