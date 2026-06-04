import type { CSSProperties } from 'react'
import type { PortfolioVideo } from '@/lib/portfolio-videos'
import { GalleryVideo } from './GalleryVideo'
import { cn } from '@/lib/utils'

type Props = {
  videos: PortfolioVideo[]
  showDivider?: boolean
}

export function GalleryVideos({ videos, showDivider }: Props) {
  if (videos.length === 0) return null

  return (
    <section
      className={cn(showDivider ? 'pb-16 md:pb-20' : 'pb-4')}
      aria-labelledby="gallery-videos-heading"
    >
      <h2
        id="gallery-videos-heading"
        className="gallery-section-in mb-10 font-mono text-[11px] uppercase tracking-[0.32em] text-neutral-500 md:mb-12"
      >
        Videography
      </h2>

      <ul className="m-0 flex list-none flex-col gap-12 p-0 md:gap-16">
        {videos.map((video, index) => (
          <li
            key={video.src}
            className="gallery-video-in"
            style={{ '--video-i': index } as CSSProperties}
          >
            <GalleryVideo video={video} index={index} total={videos.length} />
          </li>
        ))}
      </ul>

      {showDivider && (
        <div className="mt-16 h-px w-full bg-white/[0.06] md:mt-20" aria-hidden />
      )}
    </section>
  )
}
