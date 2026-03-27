import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const IG_URL = 'https://www.instagram.com/ebzi.jpg/'

const linkClass =
  'pointer-events-auto font-mono text-[10px] md:text-[11px] tracking-wide text-neutral-300 bg-black/50 backdrop-blur-md px-2.5 py-1.5 border border-white/10 hover:bg-black/70 hover:text-white transition-colors'

export function JpgFloatingBar() {
  return (
    <div className="fixed top-0 left-0 z-50 flex flex-wrap items-center gap-2 p-3 md:p-4 pointer-events-none">
      <Link href="/" className={linkClass}>
        enaz.dev
      </Link>
      <a
        href={IG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkClass} inline-flex items-center gap-1`}
      >
        @ebzi.jpg
        <ArrowUpRight size={12} className="opacity-70" aria-hidden />
      </a>
    </div>
  )
}
