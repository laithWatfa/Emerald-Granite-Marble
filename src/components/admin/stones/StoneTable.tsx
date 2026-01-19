import { Stone } from '@/types'
import StoneRow from './StoneRow'

export default function StoneTable({ stones }: { stones: Stone[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right  border-collapse border border-accent">
        <thead className="bg-primary text-background text-sm md:text-base">
          <tr>
            <th className="p-3">الاسم</th>
            <th className="p-3 hidden lg:table-cell">النوع</th>
            <th className="p-3 hidden md:table-cell">اللون</th>
            <th className="p-3 hidden md:table-cell">السماكة</th>
            <th className="p-3">الحالة</th>
            <th className="p-3">الإجراءات</th>
          </tr>
        </thead>
        <tbody className='text-xs sm:text-sm md:text-base'>
          {stones.map((stone) => (
            <StoneRow key={stone.id} stone={stone} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
