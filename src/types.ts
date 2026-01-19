export type StoneImage =  {
    id?: string
    image_url: string
    position: number
  }

export type Stone = {
  id: string
  name_ar: string
  description_ar : string
  type: 'رخام' | 'غرانيت' | 'كوارتز'
  color: 'أسود' | 'أبيض' | 'رمادي' | 'بيج'
  thickness_cm: number | null
  width_cm: number | null
  length_cm: number | null
  available: boolean
  use_cases: string[]
  cover_image?: string
  stone_images?:StoneImage[]
}
