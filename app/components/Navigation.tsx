'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, Moon } from 'lucide-react'

const navLinkClass =
  'text-gray-600 dark:text-gray-300 font-medium text-sm tracking-wide hover:text-black dark:hover:text-white transition-colors duration-150 relative after:content-[\'\'] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-black dark:after:bg-white after:transition-all after:duration-250 hover:after:w-full'

export default function Navigation() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-250">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center py-6">
          <Link
            href="/"
            className="font-mono text-lg font-semibold text-black dark:text-white hover:opacity-70 transition-opacity duration-150"
          >
            enaz.dev
          </Link>
          
          <div className="flex items-center gap-8">
            <ul className="flex gap-8 list-none">
              <li>
                <Link href="/#projects" className={navLinkClass}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#skills" className={navLinkClass}>
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/jpg"
                  className={`${navLinkClass} ${pathname === '/jpg' ? 'text-black dark:text-white after:w-full' : ''}`}
                >
                  Photo
                </Link>
              </li>
            </ul>
            
            <button
              onClick={toggleTheme}
              className="bg-transparent border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 p-2 rounded-md hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150 w-9 h-9 flex items-center justify-center relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <span className="transition-transform duration-150 hover:rotate-180">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}


