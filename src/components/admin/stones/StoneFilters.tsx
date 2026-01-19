'use client'
import { FaSearch } from "react-icons/fa";


type Props = {
  filters: {
    search: string
    type: string
    color: string
    available: string
  }
  onChange: (name: string, value: string) => void
}

export default function StoneFilters({ filters, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <input
        placeholder="بحث بالاسم"
        value={filters.search}
        onChange={(e) => onChange('search', e.target.value)}
        className="bg-background px-4 py-2 rounded-lg border-2 border-primary focus:border-accent"
      />

      <select
        value={filters.type}
        onChange={(e) => onChange('type', e.target.value)}
        className="input"
      >
        <option value="">كل الأنواع</option>
        <option value="رخام">رخام</option>
        <option value="غرانيت">غرانيت</option>
        <option value="كوارتز">كوارتز</option>
      </select>

      <select
        value={filters.color}
        onChange={(e) => onChange('color', e.target.value)}
        className="input"
      >
        <option value="">كل الألوان</option>
        <option value="أسود">أسود</option>
        <option value="أبيض">أبيض</option>
        <option value="رمادي">رمادي</option>
        <option value="بيج">بيج</option>
      </select>

      <select
        value={filters.available}
        onChange={(e) => onChange('available', e.target.value)}
        className="input"
      >
        <option value="">الحالة</option>
        <option value="true">متوفر</option>
        <option value="false">غير متوفر</option>
      </select>
    </div>
  )
}
