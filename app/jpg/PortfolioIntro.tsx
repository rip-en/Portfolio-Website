import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'

const IG_URL = 'https://www.instagram.com/ebzi.jpg/'

type Props = {
  photoCount: number
  videoCount: number
}

export function PortfolioIntro({ photoCount, videoCount }: Props) {
  const parts: string[] = []
  if (videoCount > 0) {
    parts.push(`${videoCount} ${videoCount === 1 ? 'clip' : 'clips'}`)
  }
  if (photoCount > 0) {
    parts.push(`${photoCount} ${photoCount === 1 ? 'photo' : 'photos'}`)
  }

  return (
    <header className="portfolio-intro mx-auto max-w-6xl px-6 md:px-10 pt-24 pb-12 md:pt-28 md:pb-16 border-b border-white/[0.06]">
      <p
        className="portfolio-intro__line font-mono text-[11px] uppercase tracking-[0.32em] text-neutral-500"
        style={{ '--intro-i': 0 } as CSSProperties}
      >
        Portfolio
      </p>
      <h1
        className="portfolio-intro__line mt-4 text-3xl font-light tracking-tight text-neutral-100 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
        style={{ '--intro-i': 1 } as CSSProperties}
      >
        Photography &amp; videography
      </h1>
      <p
        className="portfolio-intro__line mt-5 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base"
        style={{ '--intro-i': 2 } as CSSProperties}
      >
        A selection of photos and videos I&apos;ve taken.
      </p>

      {parts.length > 0 && (
        <p
          className="portfolio-intro__line mt-6 font-mono text-[11px] tracking-wide text-neutral-600"
          style={{ '--intro-i': 3 } as CSSProperties}
        >
          {parts.join(' · ')}
        </p>
      )}

      <a
        href={IG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="portfolio-intro__line mt-8 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-neutral-400 transition-colors hover:text-neutral-200"
        style={{ '--intro-i': 4 } as CSSProperties}
      >
        @ebzi.jpg
        <ArrowUpRight size={13} className="opacity-70" aria-hidden />
      </a>

      <Link
        href="/"
        className="portfolio-intro__line mt-4 block font-mono text-[11px] tracking-wide text-neutral-600 transition-colors hover:text-neutral-400 md:hidden"
        style={{ '--intro-i': 5 } as CSSProperties}
      >
        ← Back to enaz.dev
      </Link>
    </header>
  )
}
