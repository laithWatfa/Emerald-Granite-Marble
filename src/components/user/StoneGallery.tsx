'use client'

import { useState, useRef , useEffect } from 'react'
import StoneImage from './StoneImage'

type ImageType = {
  id: string
  image_url: string
}

export default function StoneGallery({ images }: { images: ImageType[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const active = images[activeIndex]

  const goNext = () =>
    setActiveIndex((i) => (i + 1) % images.length);

  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);


  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      goNext();
    }
    if (e.key === 'ArrowLeft') {
      goPrev();
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])



  return (
    <div className="space-y-4 w-full lg:w-1/2 self-stretch">
      {/* ================= Main Image ================= */}
      <div
        className="relative w-full h-[60vh] lg:h-[calc(100vh-380px)] rounded-2xl overflow-hidden bg-black/5"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (!touchStartX.current) return
          const diff = touchStartX.current - e.changedTouches[0].clientX
          if (diff > 50) goNext()
          if (diff < -50) goPrev()
          touchStartX.current = null
        }}
      >
        <StoneImage
          src={active.image_url}
          alt=""
          priority
          className="object-cover transition-opacity duration-300"
        />

        {/* Arrows (desktop) */}
        <button
          onClick={goPrev}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 
                     bg-background/80 hover:bg-background rounded-full p-2 shadow"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 
                     bg-background/80 hover:bg-background rounded-full p-2 shadow"
        >
          ›
        </button>

        {/* Dots (mobile) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition
                ${i === activeIndex ? 'bg-background' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* ================= Thumbnails ================= */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(i)}
            className={`relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition
              ${i === activeIndex ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
          >
            <StoneImage
              src={img.image_url}
              alt=""
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
