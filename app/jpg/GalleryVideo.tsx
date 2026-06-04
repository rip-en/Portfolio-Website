'use client'

import { memo } from 'react'
import type { PortfolioVideo } from '@/lib/portfolio-videos'

type Props = {
  video: PortfolioVideo
  index: number
  total: number
}

function GalleryVideoInner({ video, index, total }: Props) {
  const label =
    total === 1 ? 'Featured clip' : `Clip ${index + 1} of ${total}`

  return (
    <figure>
      <video
        src={video.src}
        controls
        playsInline
        preload="metadata"
        className="block h-auto w-full max-h-[85vh] bg-black"
        aria-label={label}
      />
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}

export const GalleryVideo = memo(GalleryVideoInner)
GalleryVideo.displayName = 'GalleryVideo'
