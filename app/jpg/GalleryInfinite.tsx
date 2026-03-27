'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PortfolioPhoto } from '@/lib/portfolio-photos'
import { buildGalleryItems } from '@/lib/gallery-cycle-order'
import { GalleryPhoto } from './GalleryPhoto'

const GALLERY_SIZES =
  '(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1280px) 33vw, min(25vw, 520px)'

const MAX_CYCLES = 250
const COOLDOWN_MS = 450
const BOOTSTRAP_MS = 400
const SENTINEL_ROOT_MARGIN = '400px'
const PRIORITY_IMAGE_COUNT = 2

function isPageScrollable(): boolean {
  if (typeof document === 'undefined') return false
  const doc = document.documentElement
  return doc.scrollHeight > doc.clientHeight + 8
}

type Props = {
  photos: PortfolioPhoto[]
}

export function GalleryInfinite({ photos }: Props) {
  const photoKey = useMemo(() => photos.map((p) => p.src).join('|'), [photos])

  const [visitSeed] = useState(() => Math.floor(Math.random() * 2147483647))
  const [cycles, setCycles] = useState(1)

  const sentinelRef = useRef<HTMLDivElement>(null)
  const cooldownRef = useRef(false)
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasScrolledRef = useRef(false)
  const didBootstrapRef = useRef(false)

  const items = useMemo(
    () => buildGalleryItems(photos, cycles, visitSeed, photoKey),
    [photos, cycles, visitSeed, photoKey]
  )

  const appendCycle = useCallback(() => {
    if (cooldownRef.current || photos.length === 0) return
    if (!hasScrolledRef.current && !isPageScrollable()) return

    cooldownRef.current = true
    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current)
    cooldownTimerRef.current = setTimeout(() => {
      cooldownRef.current = false
      cooldownTimerRef.current = null
    }, COOLDOWN_MS)

    setCycles((c) => Math.min(c + 1, MAX_CYCLES))
  }, [photos.length])

  useEffect(() => {
    const onScroll = () => {
      hasScrolledRef.current = true
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (photos.length === 0 || didBootstrapRef.current) return
    const id = window.setTimeout(() => {
      if (!isPageScrollable()) {
        didBootstrapRef.current = true
        setCycles((c) => Math.min(c + 1, MAX_CYCLES))
      }
    }, BOOTSTRAP_MS)
    return () => clearTimeout(id)
  }, [photos.length])

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || photos.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        appendCycle()
      },
      { root: null, rootMargin: SENTINEL_ROOT_MARGIN, threshold: 0 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [photoKey, photos.length, appendCycle])

  if (photos.length === 0) return null

  const n = photos.length

  return (
    <>
      <div className="pt-14 pb-6 px-2 sm:px-3 md:px-4 mx-auto max-w-[2000px] columns-1 sm:columns-2 lg:columns-3 xl:columns-4 [column-gap:10px] sm:[column-gap:12px] md:[column-gap:14px]">
        {items.map(({ photo, key, globalIndex }) => (
          <GalleryPhoto
            key={key}
            photo={photo}
            alt={`Photograph ${n ? (globalIndex % n) + 1 : globalIndex + 1}`}
            sizes={GALLERY_SIZES}
            priority={globalIndex < PRIORITY_IMAGE_COUNT}
          />
        ))}
      </div>

      <div
        ref={sentinelRef}
        className="h-px w-full max-w-[2000px] mx-auto"
        aria-hidden
      />
    </>
  )
}
