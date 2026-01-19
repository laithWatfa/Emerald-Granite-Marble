'use client'

import { useMemo, useState, useEffect } from 'react'
import StoneCard from './StoneCard'
import StoneGridSkeleton from './StoneGridSkeleton'
import { supabase } from '@/lib/supabase/client'
import { Stone, StoneImage } from '@/types'

type StoneType = 'الكل' | 'رخام' | 'غرانيت' | 'كوارتز'

const STONE_TYPES: StoneType[] = ['الكل', 'رخام', 'غرانيت', 'كوارتز']
const COLORS = ['الكل', 'أبيض', 'أسود', 'رمادي', 'بيج']


export default function StoneGridWithFilters() {
  const [stones, setStones] = useState<Stone[]>([])
  const [type, setType] = useState<StoneType>('الكل')
  const [color, setColor] = useState('الكل')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStones = async () => {
      setIsLoading(true)

      const { data, error } = await supabase
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
            image_url,
            position
          )
        `)

      if (!error && data) {
        const mapped = data.map((stone: Stone) => {
          const cover =
            stone.stone_images?.find((img: StoneImage) => img.position === 0)
              ?.image_url ?? '/placeholder.jpg'
          
          return {
            id: stone.id,
            name_ar: stone.name_ar,
            type: stone.type,
            color: stone.color,
            thickness_cm: stone.thickness_cm,
            length_cm: stone.length_cm,
            width_cm: stone.width_cm,
            description_ar: stone.description_ar,
            available: stone.available,
            use_cases: stone.use_cases ?? [],
            cover_image: cover,
          }
        })

        setStones(mapped)
      }

      setIsLoading(false)
    }

    fetchStones()
  }, [])

  const filteredStones = useMemo(() => {
    return stones.filter(stone => {
      const typeMatch = type === 'الكل' || stone.type === type
      const colorMatch = color === 'الكل' || stone.color === color
      return typeMatch && colorMatch
    })
  }, [stones, type, color])

  return (
    <section className="space-y-10 -mt-12">
      {/* Filters */}
      <div className="rounded-2xl backdrop-blur-lg bg-text/10 p-4 shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {STONE_TYPES.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full px-4 py-2 text-sm border duration-150 cursor-pointer  ${
                  type === t
                    ? 'bg-primary text-background border-primary'
                    : 'bg-background text-primary hover:text-accent  hover:border-accent'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className='w-full h-0.5 bg-primary md:hidden'></span>

          <div className="flex flex-wrap gap-2">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`rounded-full border px-4 py-2 text-sm duration-150 cursor-pointer  ${
                  color === c
                    ? 'bg-primary text-background border-primary'
                    : 'bg-background text-primary hover:text-accent  hover:border-accent'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <StoneGridSkeleton />
      ) : filteredStones.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStones.map(stone => (
            <StoneCard key={stone.id} stone={stone} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl font-black text-primary bg-background/70 backdrop-blur-md p-10 text-center">
          لا توجد أحجار مطابقة
        </div>
      )}
    </section>
  )
}
