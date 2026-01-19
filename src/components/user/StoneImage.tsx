'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function StoneImage({
  src,
  alt,
  priority = false,
  className = '',
}: {
  src: string
  alt: string
  priority?: boolean
  className?: string
}) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${className} w-full h-full`}
        loading="lazy"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      quality={65}
      fill
      priority={priority}
      className={className}
      onError={() => setError(true)}
    />
  )
}
