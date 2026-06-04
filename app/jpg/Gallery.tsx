'use client'

import { ArrowUp } from 'lucide-react'
import { useLayoutEffect, useMemo, useState } from 'react'
import { buildGalleryItems, type GalleryItem } from '@/lib/gallery-cycle-order'
import type { PortfolioPhoto } from '@/lib/portfolio-photos'
import type { PortfolioVideo } from '@/lib/portfolio-videos'
import { GalleryPhoto } from './GalleryPhoto'
import { GalleryVideos } from './GalleryVideos'

function stableGalleryItems(photos: PortfolioPhoto[]): GalleryItem[] {
  return photos.map((photo, globalIndex) => ({
    photo,
    key: photo.src,
    globalIndex,
  }))
}

const GALLERY_SIZES =
  '(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1280px) 33vw, min(25vw, 520px)'

const PRIORITY_IMAGE_COUNT = 4

type Props = {
  photos: PortfolioPhoto[]
  videos: PortfolioVideo[]
}

function GalleryEnd() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-20 border-t border-white/[0.06] md:mt-28">
      <div className="flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between md:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-600">
          End of portfolio
        </p>
        <button
          type="button"
          onClick={handleBackToTop}
          className="group inline-flex shrink-0 items-center gap-2 self-start font-mono text-[11px] tracking-wide text-neutral-400 transition-colors hover:text-neutral-200"
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

export function Gallery({ photos, videos }: Props) {
  const photoKey = useMemo(() => photos.map((p) => p.src).join('|'), [photos])
  const [items, setItems] = useState<GalleryItem[]>(() =>
    stableGalleryItems(photos)
  )

  useLayoutEffect(() => {
    const visitSeed = Math.floor(Math.random() * 2147483647)
    setItems(buildGalleryItems(photos, 1, visitSeed, photoKey))
  }, [photos, photoKey])

  const hasVideos = videos.length > 0
  const hasPhotos = photos.length > 0

  if (!hasVideos && !hasPhotos) return null

  const photoCount = photos.length

  return (
    <div className="pb-20 md:pb-28">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {hasVideos && (
          <GalleryVideos videos={videos} showDivider={hasPhotos} />
        )}
      </div>

      {hasPhotos && (
        <section
          className="mx-auto max-w-[2000px] px-2 sm:px-3 md:px-4"
          aria-labelledby={hasVideos ? 'gallery-photos-heading' : undefined}
        >
          {hasVideos && (
            <h2
              id="gallery-photos-heading"
              className="gallery-section-in mb-8 md:mb-10 px-4 font-mono text-[11px] uppercase tracking-[0.32em] text-neutral-500 text-center"
            >
              Photography
            </h2>
          )}

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 [column-gap:12px] sm:[column-gap:14px] md:[column-gap:16px]">
            {items.map(({ photo, key, globalIndex }) => (
              <GalleryPhoto
                key={key}
                photo={photo}
                alt={`Photograph ${globalIndex + 1} of ${photoCount}`}
                sizes={GALLERY_SIZES}
                priority={globalIndex < PRIORITY_IMAGE_COUNT}
                staggerIndex={globalIndex}
              />
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <GalleryEnd />
      </div>
    </div>
  )
}
