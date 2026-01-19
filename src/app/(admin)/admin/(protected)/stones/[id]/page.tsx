import { supabase } from '@/lib/supabase/client'
import StoneForm from '@/components/admin/stones/StoneForm'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

export default async function EditStonePage({ params }: Props) {
    const {id} = await params ; 
  const { data: stone, error } = await supabase
    .from('stones')
    .select('*')
    .eq('id', id)
    .single()


  const { data: images  } = await supabase
  .from('stone_images')
  .select('*')
  .eq('stone_id', id)
  .order('position')

  console.log(error);
  console.log(images)
  if (error || !images) {
    return notFound()
  }

  return (
    <div dir="rtl" className="space-y-6">
      <h1 className="text-xl font-semibold text-neutral-800">
        تعديل الحجر
      </h1>

      <StoneForm
        mode='edit'
        initialData={{images , stone}}
        stoneId={id}
      />
    </div>
  )
}
