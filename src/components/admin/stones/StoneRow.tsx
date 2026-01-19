'use client'

import Link from 'next/link'
import { useState } from 'react';
import { deleteStoneImage } from '@/lib/supabase/deleteStoneImage';
import { Stone } from '@/types';
import { MdDeleteForever , MdEdit } from "react-icons/md";
import {supabase} from "@/lib/supabase/client";
import DeleteStoneModal from "@/components/admin/stones/DeleteStoneModal"


export default function StoneRow({ stone }: { stone: Stone }) {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
  try {
    setLoading(true)

    // 1. Get all images for this stone
    const { data: images, error: imagesError } = await supabase
      .from('stone_images')
      .select('image_url')
      .eq('stone_id', stone.id)

    if (imagesError) throw imagesError

    // 2. Delete images from storage
    if (images && images.length > 0) {
      await Promise.all(
        images.map(img => deleteStoneImage(img.image_url))
      )
    }

    // 3. Delete image records
    const { error: deleteImagesError } = await supabase
      .from('stone_images')
      .delete()
      .eq('stone_id', stone.id)

    if (deleteImagesError) throw deleteImagesError

    // 4. Delete stone
    const { error: deleteStoneError } = await supabase
      .from('stones')
      .delete()
      .eq('id', stone.id)

    if (deleteStoneError) throw deleteStoneError

    setOpen(false)
    window.location.reload()
  } catch (err) {
    console.error('Failed to delete stone:', err)
  } finally {
    setLoading(false)
  }
}

    const handleStatusChange = async () => {
      await supabase.from('stones').update({...stone , available : !stone.available}).eq('id', stone.id)
      window.location.reload()
    }
  return (
    <>
    <tr className="border-b border-primary bg-background hover:bg-accent/30 duration-75 ">
      <td className="p-3 font-bold">{stone.name_ar}</td>
      <td className="p-3 hidden lg:table-cell">{stone.type}</td>
      <td className="p-3 hidden md:table-cell">{stone.color}</td>
      <td className="p-3 hidden md:table-cell">{stone.thickness_cm ?? '—'} سم</td>
      <td className="p-3">
        {stone.available ? (
          <span 
          onClick={handleStatusChange}
          className="bg-green-600 cursor-pointer rounded-full px-3 py-1 text-xs font-medium text-background"
          >متوفر</span>
        ) : (
          <span
          onClick={handleStatusChange}
          className="bg-neutral-400 cursor-pointer rounded-full px-3 py-1 text-[6px] md:text-xs font-medium text-background text-wrap">غير متوفر</span>
        )}
      </td>
      <td className="p-3 flex justify-between gap-2 text-xs md:text-sm">
        <Link href={`/admin/stones/${stone.id}`} className="text-background px-4 py-1 flex items-center rounded-lg bg-blue-500 hover:bg-blue-600 duration-75">
          <MdEdit className='w-3 h-3 md:w-5 md:h-5' />
          تعديل
        </Link>
        <button className='text-background  px-4 py-1 rounded-lg bg-red-600 cursor-pointer font-bold flex items-center duration-75 hover:bg-red-700'
                onClick={() => setOpen(true)}
        ><MdDeleteForever className='w-3 h-3 md:w-5 md:h-5' /> حذف</button>
      </td>
    </tr>
    <DeleteStoneModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
        stoneName={stone.name_ar}
      />
      </>
  )
}
