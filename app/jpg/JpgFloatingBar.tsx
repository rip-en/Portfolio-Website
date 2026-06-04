import Link from 'next/link'

const linkClass =
  'pointer-events-auto font-mono text-[10px] md:text-[11px] tracking-wide text-neutral-500 transition-colors hover:text-neutral-200'

export function JpgFloatingBar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-6 py-4 md:px-10"
      aria-label="Portfolio navigation"
    >
      <Link href="/" className={linkClass}>
        ← enaz.dev
      </Link>
    </nav>
  )
}
