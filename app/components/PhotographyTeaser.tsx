import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getHomePreviewPhotos } from '@/lib/portfolio-photos'
import { cn } from '@/lib/utils'

const PREVIEW_SIZES = '(max-width: 640px) 100vw, 33vw'

export default function PhotographyTeaser() {
  const preview = getHomePreviewPhotos()

  return (
    <section id="photography" className="home-surface home-surface--photo py-24 md:py-32">
      <div className="home-surface-inner max-w-6xl mx-auto px-6 md:px-8">
        <div className="mb-12 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Photography
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Here are a few selected shots. See the full gallery at{' '}
              <span className="font-mono text-foreground/80">/jpg</span>.
            </p>
          </div>
          <Link
            href="/jpg"
            className={cn(
              'group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md border border-input',
              'bg-background/90 px-8 text-sm font-medium font-mono shadow-sm backdrop-blur-sm',
              'transition-all duration-200 hover:border-foreground/25 hover:bg-accent hover:text-accent-foreground hover:shadow-md'
            )}
          >
            Open gallery
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        {preview.length > 0 && (
          <div
            className={cn(
              'rounded-2xl border border-border/60 bg-card/40 p-3 sm:p-4 md:p-5',
              'shadow-[inset_0_1px_0_0_hsl(var(--border)/0.5),0_20px_50px_-28px_rgba(15,23,42,0.12)]',
              'ring-1 ring-black/[0.04] dark:bg-card/25 dark:shadow-[inset_0_1px_0_0_hsl(var(--border)/0.35),0_24px_56px_-28px_rgba(0,0,0,0.55)] dark:ring-white/[0.05]'
            )}
          >
            <div className="columns-1 gap-3 [column-gap:12px] sm:columns-3">
              {preview.map((photo, index) => (
                <Link
                  key={photo.src}
                  href="/jpg"
                  className="group mb-3 block overflow-hidden rounded-lg bg-muted/40 break-inside-avoid ring-1 ring-black/[0.04] dark:ring-white/[0.06]"
                >
                  <Image
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    alt="Photography preview"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes={PREVIEW_SIZES}
                    priority={index === 0}
                    quality={72}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
