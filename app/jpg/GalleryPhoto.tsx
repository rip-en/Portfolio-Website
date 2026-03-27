'use client'

import Image from 'next/image'
import { memo, useCallback, useState } from 'react'
import type { PortfolioPhoto } from '@/lib/portfolio-photos'
import { cn } from '@/lib/utils'

type Props = {
  photo: PortfolioPhoto
  alt: string
  sizes: string
  priority: boolean
}

function GalleryPhotoInner({ photo, alt, sizes, priority }: Props) {
  const [ready, setReady] = useState(false)

  const reveal = useCallback(() => {
    setReady(true)
  }, [])

  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-[1px] bg-neutral-900',
        'break-inside-avoid mb-[10px] sm:mb-[12px] md:mb-[14px]'
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-out',
          ready ? 'opacity-0' : 'opacity-100'
        )}
        aria-hidden
      >
        <div className="absolute inset-0 bg-neutral-800/90" />
        <div className="gallery-photo-shimmer absolute inset-0" />
      </div>

      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={alt}
        className={cn(
          'relative z-20 w-full h-auto',
          'transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          ready ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.992]'
        )}
        sizes={sizes}
        priority={priority}
        quality={72}
        onLoadingComplete={reveal}
        onError={reveal}
      />
    </figure>
  )
}

export const GalleryPhoto = memo(GalleryPhotoInner)
GalleryPhoto.displayName = 'GalleryPhoto'
