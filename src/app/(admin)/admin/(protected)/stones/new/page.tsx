import StoneForm from '@/components/admin/stones/StoneForm'

export default function AddStonePage() {
  return (
    <div dir="rtl" className="space-y-6">
      <h1 className="text-xl font-semibold text-neutral-800">
        إضافة حجر جديد
      </h1>

      <StoneForm mode='create' />
    </div>
  )
}


