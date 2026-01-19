import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      dir="rtl"
      className="min-h-[calc(100vh-128px)] -mt-12  flex flex-col items-center justify-center gap-6
                 bg-background/70 backdrop-blur-md rounded-lg p-6 text-center text-text"
    >
      {/* Big 404 */}
      <h1 className="text-7xl font-extrabold text-primary">404</h1>

      {/* Main message */}
      <p className="text-xl font-semibold">
        الصفحة غير موجودة
      </p>

      {/* Sub message */}
      <p className="max-w-md text-sm sm:text-base text-neutral-600 leading-relaxed">
        يبدو أن الصفحة التي تحاول الوصول إليها غير متوفرة أو تم نقلها.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/"
          className="rounded-full bg-primary px-6 py-2 text-background transition hover:bg-primary/90"
        >
          العودة للرئيسية
        </Link>

        <Link
          href="/stones"
          className="rounded-full border border-primary px-6 py-2 text-primary transition hover:bg-primary hover:text-background"
        >
          تصفح الأحجار
        </Link>
      </div>
    </div>
  )
}
