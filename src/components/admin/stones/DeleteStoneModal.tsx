'use client'

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
  stoneName: string
}

export default function DeleteStoneModal({
  open,
  onClose,
  onConfirm,
  loading,
  stoneName,
}: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-md p-6 space-y-4" dir="rtl">
        <h2 className="text-lg font-semibold text-red-600">
          حذف الحجر
        </h2>

        <p className="text-sm text-neutral-700">
          هل أنت متأكد من حذف الحجر
          <span className="font-semibold"> {stoneName} </span>؟
          <br />
          لا يمكن التراجع عن هذا الإجراء.
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            إلغاء
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm"
          >
            {loading ? 'جارٍ الحذف...' : 'حذف'}
          </button>
        </div>
      </div>
    </div>
  )
}
