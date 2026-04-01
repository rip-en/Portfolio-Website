'use client'

import { useState, useEffect, useMemo } from 'react'
import { Sun, Moon } from 'lucide-react'
import { PillNav, type PillNavItem } from './PillNav'

const navItems: PillNavItem[] = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Photo', href: '/jpg' },
]

/** Pill track (--base) vs hover fill; hover label must contrast with --base */
function pillNavColors(isDark: boolean) {
  return {
    baseColor: isDark ? '#101010' : '#ffffff',
    pillColor: isDark ? '#ececec' : '#0a0a0a',
    pillTextColor: isDark ? '#101010' : '#ffffff',
    /** Text on expanded circle (circle uses --base); light on dark track, dark on light track */
    hoveredPillTextColor: isDark ? '#f5f5f5' : '#0a0a0a',
  }
}

export default function Navigation() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const isDark = theme === 'dark'
  const colors = useMemo(() => pillNavColors(isDark), [isDark])

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-[1000]">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-start justify-between gap-3 px-4 pt-4 md:items-center md:px-8">
        <PillNav
          logoHref="/"
          items={navItems}
          {...colors}
          className="min-w-0 flex-1"
        />
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="pointer-events-auto flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border transition-colors duration-200 hover:opacity-90"
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.1)',
            background: isDark ? '#101010' : '#ffffff',
            color: isDark ? '#e5e5e5' : '#404040',
          }}
        >
          {isDark ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
        </button>
      </div>
    </header>
  )
}
