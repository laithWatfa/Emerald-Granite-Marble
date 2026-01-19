'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Input, Textarea, Select } from '@/components/admin/Inputs'
import { FaFileUpload } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { Stone, StoneImage } from '@/types'

type GalleryImage = {
  id?: string
  file?: File
  preview: string
  image_url?: string
  position?: number
  markedForDelete?: boolean
}

type Props =
  | { mode: 'create' }
  | { mode: 'edit'; initialData: {stone : Stone , images: StoneImage[]}; stoneId: string }

export default function StoneForm(props: Props) {
  const router = useRouter()
  const isEdit = props.mode === 'edit'
  const initialData = isEdit ? props.initialData : null

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const activeImagesCount = gallery.filter(
  img => !img.markedForDelete
  ).length

  const [form, setForm] = useState({
    name_ar: initialData?.stone.name_ar ?? '',
    type: initialData?.stone.type ?? 'رخام',
    color: initialData?.stone.color ?? 'أسود',
    thickness_cm: initialData?.stone.thickness_cm ?? '',
    length_cm: initialData?.stone.length_cm ?? '',
    width_cm: initialData?.stone.width_cm ?? '',
    description_ar: initialData?.stone.description_ar ?? '',
    use_cases: initialData?.stone.use_cases?.join(' ') ?? '',
    available: initialData?.stone.available ?? true,
  })

  const [dragIndex, setDragIndex] = useState<number | null>(null)


  /* ------------------ Init gallery in edit mode ------------------ */
  useEffect(() => {
    if (isEdit && initialData?.images) {
      setGallery(
        initialData.images.map((img: StoneImage) => ({
          id: img.id,
          image_url: img.image_url,
          preview: img.image_url,
        }))
      )
    }
  }, [])

  /* ------------------ Handlers ------------------ */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFilesAdd = (files: FileList | null) => {
    if (!files) return
    const newImages = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setGallery(prev => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    const remaining =
    gallery.filter((_, i) => i !== index && !gallery[i].markedForDelete)

    if (remaining.length === 0) {
      setError('لا يمكن حذف آخر صورة للحجر')
      return
    }
    setGallery(prev =>
      prev.map((img, i) =>
        i === index ? { ...img, markedForDelete: true } : img
      )
    )
  }

  const reorderGallery = (from: number, to: number) => {
  setGallery(prev => {
    const updated = [...prev]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    return updated.map((img, index) => ({
      ...img,
      position: index,
    }))
  })
}


  /* ------------------ Submit ------------------ */

  const handleSubmit = async () => {
    if (!form.name_ar) {
      setError('اسم الحجر مطلوب')
      return
    }

    if (activeImagesCount === 0) {
      setError('يجب إضافة صورة واحدة على الأقل للحجر')
      return
    }

    setLoading(true)
    setError('')

    const payload = {
      name_ar: form.name_ar,
      type: form.type,
      color: form.color,
      thickness_cm: Number(form.thickness_cm) || null,
      length_cm: Number(form.length_cm) || null,
      width_cm: Number(form.width_cm) || null,
      description_ar: form.description_ar,
      available: form.available,
      use_cases: form.use_cases
        .split(' ')
        .map((c : string) => c.trim())
        .filter(Boolean),
    }

    let stoneId = isEdit ? props.stoneId : null

    /* ---- Create or Update Stone ---- */
    if (isEdit) {
      await supabase.from('stones').update(payload).eq('id', stoneId)
    } else {
      const { data, error } = await supabase
        .from('stones')
        .insert(payload)
        .select()
        .single()

      if (error || !data) {
        setError('فشل إنشاء الحجر')
        setLoading(false)
        return
      }

      stoneId = data.id
    }

    /* ---- Delete removed images ---- */
    const toDelete = gallery.filter(i => i.markedForDelete && i.id);
    if (toDelete.length) {
      await supabase
        .from('stone_images')
        .delete()
        .in('id', toDelete.map(i => i.id))
    }

    for (const img of gallery) {
  if (img.markedForDelete && img.id) {
    await supabase.from('stone_images').delete().eq('id', img.id)
  }

  if (img.id && img.position !== undefined) {
    await supabase
      .from('stone_images')
      .update({ position: img.position })
      .eq('id', img.id)
  }

  if (img.file) {
    const path = `${stoneId}/${crypto.randomUUID()}.jpg`
    await supabase.storage.from('stones').upload(path, img.file!)

    const { data } = supabase.storage.from('stones').getPublicUrl(path)

    
    await supabase.from('stone_images').insert({
      stone_id: stoneId,
      image_url: data.publicUrl,
      position: img.position,
    })
  }
}


    router.push('/admin/stones')
  }

  


  return (
    <div className="rounded-2xl bg-background border border-primary p-6 shadow space-y-4">
      <Input label="اسم الحجر" name="name_ar" value={form.name_ar} onChange={handleChange} />

      <Select
        label="النوع"
        name="type"
        value={form.type}
        onChange={handleChange}
        options={[
          { value: 'رخام', label: 'رخام' },
          { value: 'غرانيت', label: 'غرانيت' },
          { value: 'كوارتز', label: 'كوارتز' },
        ]}
      />

      <Select
        label="اللون"
        name="color"
        value={form.color}
        onChange={handleChange}
        options={[
          { value: 'أسود', label: 'أسود' },
          { value: 'أبيض', label: 'أبيض' },
          { value: 'رمادي', label: 'رمادي' },
          { value: 'بيج', label: 'بيج' },
        ]}
      />

      <div className="grid grid-cols-3 gap-4">
        <Input label="السماكة" name="thickness_cm" type="number" min={0.1} value={form.thickness_cm} onChange={handleChange} />
        <Input label="الطول" name="length_cm" type="number" min={0.1} value={form.length_cm} onChange={handleChange} />
        <Input label="العرض" name="width_cm" type="number" min={0.1} value={form.width_cm} onChange={handleChange} />
      </div>

      <Textarea label="الوصف" name="description_ar" value={form.description_ar} onChange={handleChange} />

      <Input label="الاستخدامات" name="use_cases" value={form.use_cases} onChange={handleChange} />

      {/* Upload */}
      <label className="flex items-center justify-center gap-2 cursor-pointer bg-accent px-4 py-2 rounded">
        <FaFileUpload />
        إضافة صور
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => handleFilesAdd(e.target.files)}
        />
      </label>
        <p className="text-sm text-neutral-500">
            الصور المضافة : {activeImagesCount}
        </p>
      {/* Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {gallery
    .filter(img => !img.markedForDelete)
    .map((img, index) => (
      <div
        key={img.id ?? img.preview}
        draggable
        onDragStart={() => setDragIndex(index)}
        onDragOver={e => e.preventDefault()}
        onDrop={() => {
          if (dragIndex !== null && dragIndex !== index) {
            reorderGallery(dragIndex, index)
          }
          setDragIndex(null)
        }}
        className="relative group border rounded-xl overflow-hidden cursor-move"
      >
        {/* COVER BADGE */}
        {index === 0 && (
          <span className="absolute top-2 right-2 z-10 bg-primary text-white text-xs px-2 py-1 rounded">
            الغلاف
          </span>
        )}

        {/* DELETE */}
        <button
          type="button"
          onClick={() => removeImage(index)}
          className="absolute top-2 left-2 z-10 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100"
        >
          <FaXmark />
        </button>
        <img
          src={img.preview}
          alt=""
          className="h-40 w-full object-cover"
        />
      </div>
    ))}
</div>

      <div className='flex gap-2 items-center'>
        <label htmlFor="available" className='font-bold text-primary'>متوفر؟</label>
        <input type="checkbox" name="available" id="available" className='w-4 h-4' checked={form.available} onChange={handleChange} />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-2 rounded"
      >
        {loading ? 'جاري الحفظ...' : isEdit ? 'تحديث الحجر' : 'إضافة الحجر'}
      </button>
    </div>
  )
}
