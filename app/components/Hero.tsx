'use client'

import { ArrowDown } from 'lucide-react'
import { LetterGlitch } from './ui/letter-glitch'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

/** Monochrome glitch: black through mid grays to near-white */
const glitchPalette = ['#000000', '#171717', '#404040', '#737373', '#a3a3a3', '#e5e5e5', '#fafafa']

/** Occasional words that surface in the matrix (spaces removed in the effect) */
const heroGlitchWhispers = [
  'EBRAHIM',
  'RIP',
  'FIRETITAN',
]

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[min(100dvh,56rem)] flex-col justify-center overflow-hidden pt-28 pb-20 md:pb-24"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <LetterGlitch
          glitchColors={glitchPalette}
          glitchSpeed={88}
          outerVignette
          centerVignette
          smooth
          hiddenPhrases={heroGlitchWhispers}
          hiddenPhraseChance={0.3}
          className="min-h-full"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-black/35 to-background"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_0%,transparent_22%,transparent_78%,rgba(0,0,0,0.5)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-8">
        <div
          className={cn(
            'mx-auto max-w-2xl text-center md:max-w-3xl',
            'animate-fade-in'
          )}
        >
          <div className="mb-6 flex justify-center md:mb-8">
            <Badge
              variant="outline"
              className="border-white/20 bg-black/25 px-3 py-1 font-mono text-[0.65rem] font-normal uppercase tracking-[0.25em] text-white/85 backdrop-blur-md"
            >
              Freelance · Code & lens
            </Badge>
          </div>

          <h1 className="mb-4 font-sans text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl md:leading-[1.05] lg:text-7xl">
            Ebrahim Nazmul
          </h1>

          <p className="mx-auto mb-3 max-w-lg font-mono text-sm text-white/55 md:text-base">
            Freelance developer / photographer
          </p>

          <Button
            type="button"
            variant="hero"
            size="lg"
            onClick={scrollToProjects}
            className="font-mono text-sm uppercase tracking-widest"
          >
            View projects
            <ArrowDown size={16} aria-hidden className="opacity-80" />
          </Button>
        </div>
      </div>
    </section>
  )
}
