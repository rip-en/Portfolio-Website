import type { Metadata } from 'next'
import { getPortfolioPhotos } from '@/lib/portfolio-photos'
import { GalleryInfinite } from './GalleryInfinite'
import { JpgFloatingBar } from './JpgFloatingBar'

export const metadata: Metadata = {
  title: 'Photography | Ebrahim Nazmul',
  description: 'Photography portfolio — ebzi.jpg on Instagram.',
}

export default async function PhotographyPage() {
  const photos = await getPortfolioPhotos()

  return (
    <div className="relative min-h-screen bg-neutral-950">
      <JpgFloatingBar />

      <GalleryInfinite photos={photos} />

      {photos.length === 0 && (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500 font-mono px-8 text-center">
          Add images to{' '}
          <code className="mx-1 text-neutral-300">public/images/jpg</code>
        </p>
      )}
    </div>
  )
}
