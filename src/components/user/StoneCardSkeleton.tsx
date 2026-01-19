export default function StoneCardSkeleton() {
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-2xl border border-neutral-200 bg-background/70 backdrop-blur-md shadow-sm"
    >
      {/* Image Skeleton */}
      <div className="h-64 w-full animate-pulse bg-neutral-200" />

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Title */}
        <div className="h-5 w-3/4 animate-pulse rounded bg-background/20 backdrop-blur-md" />

        {/* Specs */}
        <div className="flex gap-3">
          <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-28 animate-pulse rounded bg-neutral-200" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-neutral-200" />
        </div>

        {/* Use cases */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-6 w-14 animate-pulse rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  )
}
