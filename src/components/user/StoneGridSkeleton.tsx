import StoneCardSkeleton from './StoneCardSkeleton'

export default function StoneGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <StoneCardSkeleton key={i} />
      ))}
    </div>
  )
}
