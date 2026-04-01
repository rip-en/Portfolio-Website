'use client'

import { ArrowUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { PortfolioPhoto } from '@/lib/portfolio-photos'
import { buildGalleryItems } from '@/lib/gallery-cycle-order'
import { GalleryPhoto } from './GalleryPhoto'

const GALLERY_SIZES =
  '(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1280px) 33vw, min(25vw, 520px)'

const PRIORITY_IMAGE_COUNT = 2

type Props = {
  photos: PortfolioPhoto[]
}

function GalleryEnd() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="relative mt-6 border-t border-white/[0.06] bg-gradient-to-b from-neutral-950 via-neutral-950 to-black"
      aria-labelledby="gallery-end-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-lg px-6 pb-28 pt-24 text-center">
        <div
          className="mb-10 flex justify-center gap-2 opacity-50"
          aria-hidden
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="h-1 w-4 rounded-[1px] bg-neutral-600/80"
            />
          ))}
        </div>

        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-neutral-600">
          End of gallery
        </p>

        <h2
          id="gallery-end-heading"
          className="mt-4 text-2xl font-light tracking-tight text-neutral-200 md:text-3xl"
        >
          You&apos;ve seen every frame.
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-neutral-500">
          Scroll back up anytime — or return home from the bar above.
        </p>

        <button
          type="button"
          onClick={handleBackToTop}
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 font-mono text-[11px] tracking-wide text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
        >
          <ArrowUp
            size={14}
            className="transition-transform group-hover:-translate-y-0.5"
            aria-hidden
          />
          Back to top
        </button>
      </div>
    </footer>
  )
}

export function Gallery({ photos }: Props) {
  const photoKey = useMemo(() => photos.map((p) => p.src).join('|'), [photos])

  const [visitSeed] = useState(() => Math.floor(Math.random() * 2147483647))

  const items = useMemo(
    () => buildGalleryItems(photos, 1, visitSeed, photoKey),
    [photos, visitSeed, photoKey]
  )

  if (photos.length === 0) return null

  const n = photos.length

  return (
    <>
      <div className="pt-14 pb-8 px-2 sm:px-3 md:px-4 mx-auto max-w-[2000px] columns-1 sm:columns-2 lg:columns-3 xl:columns-4 [column-gap:10px] sm:[column-gap:12px] md:[column-gap:14px]">
        {items.map(({ photo, key, globalIndex }) => (
          <GalleryPhoto
            key={key}
            photo={photo}
            alt={`Photograph ${globalIndex + 1} of ${n}`}
            sizes={GALLERY_SIZES}
            priority={globalIndex < PRIORITY_IMAGE_COUNT}
          />
        ))}
      </div>

      <GalleryEnd />
    </>
  )
}
