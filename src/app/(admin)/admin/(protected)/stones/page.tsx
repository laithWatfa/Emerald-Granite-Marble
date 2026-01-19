'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import StoneTable from '@/components/admin/stones/StoneTable'
import StoneFilters from '@/components/admin/stones/StoneFilters'
import { Stone } from '@/types'
import { FaPlus } from "react-icons/fa";
import Link from 'next/link'

export default function AdminStonesPage() {
  const [stones, setStones] = useState<Stone[]>([])
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    color: '',
    available: '',
  })

  const fetchStones = async () => {
    let query = supabase.from('stones').select('*').order('created_at', {
      ascending: false,
    })

    if (filters.search) {
      query = query.ilike('name_ar', `%${filters.search}%`)
    }
    if (filters.type) {
      query = query.eq('type', filters.type)
    }
    if (filters.color) {
      query = query.eq('color', filters.color)
    }
    if (filters.available) {
      query = query.eq('available', filters.available === 'true')
    }

    const { data } = await query
    setStones(data || [])
  }

  useEffect(() => {
    fetchStones()
  }, [filters])

  

  return (
    <div className="space-y-6 relative">
      <h1 className="text-2xl font-bold">إدارة الأحجار</h1>

      <StoneFilters
        filters={filters}
        onChange={(name, value) =>
          setFilters((prev) => ({ ...prev, [name]: value }))
        }
      />

      <StoneTable stones={stones} />

      <Link href={"stones/new"} className='bg-primary fixed bottom-6 left-6 p-4 shadow-lg shadow-primary/40 text-3xl cursor-pointer rounded-full text-background'><FaPlus /></Link>
    </div>
  )
}
