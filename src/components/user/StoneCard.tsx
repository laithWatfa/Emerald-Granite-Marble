'use client'
import Link from 'next/link'
import StoneImage from './StoneImage'
import { Stone } from '@/types'

type StoneCardProps = {
  stone: Stone
  className?: string
}

export default function StoneCard({ stone, className = '' }: StoneCardProps) {
  return (
    <Link
      href={`/stones/${stone.id}`}
      className={`group cursor-pointer relative overflow-hidden rounded-2xl  bg-background/70 backdrop-blur-md shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${className}`}
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <StoneImage
          src={stone.cover_image ?? "/placeholder.png"}
          alt={stone.name_ar}
          className="object-cover transition-transform  brightness-90  duration-500 group-hover:scale-105"
        />

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium text-background ${
              stone.available
                ? 'bg-primary'
                : 'bg-neutral-400'
            }`}
          >
            {stone.available ? 'متوفر' : 'غير متوفر'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        {/* Title */}
        <h3 className="text-lg font-extrabold text-primary">
          {stone.name_ar}
        </h3>

        {/* Specs */}
        <div className="flex justify-center md:justify-start flex-wrap gap-x-4 gap-y-1 text-sm text-text font-bold">
          <span  dir='ltr'>السماكة: {stone.thickness_cm ?? "—"}</span>
          <span> القياس: {stone.width_cm != null ? `${stone.width_cm} سم` : "—"} × {stone.length_cm != null ? `${stone.length_cm} سم` : "—"} </span>
        </div>

        {/* Description */}
        <p className="line-clamp-3 text-sm leading-relaxed text-text">
          {stone.description_ar}
        </p>

        {/* Use cases */}
        <div className="flex flex-wrap gap-2 pt-2">
          {stone.use_cases.map((useCase) => (
            <span
              key={useCase}
              className="rounded-full border  border-primary px-3 py-1 text-xs text-primary"
            >
              {useCase}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
