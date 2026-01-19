
import { notFound } from 'next/navigation'
import StoneGallery from '@/components/user/StoneGallery'
import { FaWhatsapp } from 'react-icons/fa'
import { supabaseServer } from '@/lib/supabase/server'
 type Props = {
  params: {
    id: string
  }
}

const colorStyleMap: Record<string, string> = {
  'أبيض': '#ffffff',
  'أسود': '#000000',
  'رمادي': '#9ca3af',
  'بيج': '#d6c4a8',
}


export default async function StoneDetailPage({ params }: Props) {
const supabase = supabaseServer();
const {id} = await params;
const { data: stone, error } = await supabase
  .from('stones')
  .select(`
    id,
    name_ar,
    type,
    color,
    thickness_cm,
    length_cm,
    width_cm,
    description_ar,
    available,
    use_cases,
    stone_images (
      id,
      image_url,
      position
    )
  `)
  .eq('id', id)
  .single()

  if (error || !stone) {
  notFound()
}

const images = stone.stone_images.sort(
  (a, b) => a.position - b.position
)

const phoneNumber = '963997882244' // بدون +
const message = `
مرحباً،
أود الاستفسار عن حجر "${stone.name_ar}"

النوع: ${stone.type}
اللون: ${stone.color}

هل هو متوفر؟ وما السعر؟
`

const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  message.trim()
)}`


return (
  <div dir="rtl" className="space-y-6 lg:h-[calc(100vh-128px)] flex flex-col p-4 md:p-6 -mt-12  bg-background/70 backdrop-blur-md
                shadow-lg rounded-lg gap-2 text-text">
    <h1 className="text-3xl md:text-4xl lg:text-5xl  lg:text-right font-extrabold text-primary mb-2 md:mb-6">
        {stone.name_ar}
    </h1>
      
    <div className='flex flex-col items-start lg:flex-row gap-4'>

      <div className='flex flex-wrap items-start h-auto gap-y-4 
          [&>div]:w-full md:[&>div]:w-1/2 lg:[&>div]:w-full lg:[&>div:not(:last-child)]:border-b lg:[&>div]:pb-2  [&>div]:h-fit md:w-1/2 text-sm sm:text-md md:text-lg lg:text-xl'>
        <div className='flex items-center gap-2'>
        <label className='font-bold '>النوع  : </label> {stone.type} 
      </div>
        <div className='flex items-center gap-2'>
        <label className='font-bold '>اللون  : </label> <span className={`w-5 h-5 border inline-block rounded-full`} style={{ backgroundColor: colorStyleMap[stone.color] }}></span> {stone.color} 
      </div>
      
      <div className='flex items-center gap-2'>
        <label className='font-bold '>السماكة  : </label> {stone.thickness_cm} سم 
      </div>
      <div className='flex items-center gap-2'>
        <label className='font-bold '>الأبعاد  : </label> {stone.width_cm != null ? `${stone.width_cm} سم` : "—"} × {stone.length_cm != null ? `${stone.length_cm} سم` : "—"}
      </div>
      <div className='flex items-center gap-2 w-full!'>
        <label className='font-bold '>الوصف  : </label> {stone.description_ar}
      </div>
      <div className='flex self-end items-center justify-center gap-2 w-full! border-b-0!'>
        {stone.use_cases.map((useCase : string) => (
            <span
              key={useCase}
              className="rounded-full border-2  border-primary px-3 py-1  "
            >
              {useCase}
            </span>
          ))}
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="md:mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 mx-auto px-6 py-3 text-white font-semibold hover:bg-green-700 transition w-full md:w-auto"
      >
        <FaWhatsapp className="w-5 h-5" />
        التواصل عبر واتساب
      </a>

    </div>
      <StoneGallery images={images} />

    </div>

  </div>
  )
}
