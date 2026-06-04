import type { Metadata } from 'next'
import { getPortfolioPhotos } from '@/lib/portfolio-photos'
import { getPortfolioVideos } from '@/lib/portfolio-videos'
import { Gallery } from './Gallery'
import { JpgFloatingBar } from './JpgFloatingBar'
import { PortfolioIntro } from './PortfolioIntro'

export const metadata: Metadata = {
  title: 'Photo & Video | Ebrahim Nazmul',
  description:
    'Photography and videography portfolio — stills and motion work. @ebzi.jpg on Instagram.',
}

export default function PhotographyPage() {
  const photos = getPortfolioPhotos()
  const videos = getPortfolioVideos()
  const isEmpty = photos.length === 0 && videos.length === 0

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 [overflow-anchor:none]">
      <JpgFloatingBar />

      {!isEmpty && (
        <PortfolioIntro photoCount={photos.length} videoCount={videos.length} />
      )}

      <Gallery photos={photos} videos={videos} />

      {isEmpty && (
        <p className="absolute inset-0 flex items-center justify-center px-8 text-center font-mono text-sm text-neutral-500 max-w-md mx-auto">
          Add photos or{' '}
          <code className="mx-1 text-neutral-300">.mp4</code> clips to{' '}
          <code className="mx-1 text-neutral-300">public/images/jpg</code>
          , then run{' '}
          <code className="mx-1 text-neutral-300">npm run photos:manifest</code>
          .
        </p>
      )}
    </div>
  )
}
