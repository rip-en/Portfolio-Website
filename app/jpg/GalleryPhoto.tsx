'use client'

import Image from 'next/image'
import { useCallback, useState, type CSSProperties } from 'react'
import type { PortfolioPhoto } from '@/lib/portfolio-photos'
import { useInView } from '@/lib/use-in-view'
import { cn } from '@/lib/utils'

type Props = {
  photo: PortfolioPhoto
  alt: string
  sizes: string
  priority?: boolean
  staggerIndex?: number
}

export function GalleryPhoto({
  photo,
  alt,
  sizes,
  priority = false,
  staggerIndex = 0,
}: Props) {
  const { ref, inView } = useInView({ rootMargin: '1500px 0px' })
  const [ready, setReady] = useState(false)
  const shouldLoad = priority || inView
  const blurDataURL = photo.blurDataURL

  const reveal = useCallback(() => {
    setReady(true)
  }, [])

  const stagger = Math.min(staggerIndex, 10)
  const figureStyle = {
    '--gallery-stagger': stagger,
  } as CSSProperties

  return (
    <figure
      ref={ref}
      style={figureStyle}
      className={cn(
        'gallery-photo-figure relative w-full break-inside-avoid mb-3 sm:mb-3.5 md:mb-4',
        '[overflow-anchor:none]',
        ready && 'gallery-photo-figure--revealed'
      )}
    >
      {!ready && (
        <div
          className="relative w-full overflow-hidden bg-neutral-900/90"
          style={{
            aspectRatio: `${photo.width} / ${photo.height}`,
            ...(blurDataURL
              ? {
                  backgroundImage: `url(${blurDataURL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}),
          }}
          aria-hidden
        >
          {blurDataURL ? (
            <div className="absolute inset-0 backdrop-blur-md" />
          ) : (
            <>
              <div className="absolute inset-0 bg-neutral-800/80" />
              <div className="gallery-photo-shimmer absolute inset-0" />
            </>
          )}
        </div>
      )}

      {shouldLoad && (
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={alt}
          sizes={sizes}
          quality={75}
          priority={priority}
          fetchPriority={priority ? 'high' : 'auto'}
          {...(blurDataURL
            ? { placeholder: 'blur' as const, blurDataURL }
            : {})}
          className={cn(
            'block h-auto w-full max-w-full',
            'transition-opacity duration-500 ease-out',
            ready ? 'relative opacity-100' : 'absolute left-0 top-0 opacity-0'
          )}
          onLoad={reveal}
          onError={reveal}
        />
      )}
    </figure>
  )
}
