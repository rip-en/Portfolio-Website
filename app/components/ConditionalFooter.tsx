'use client'

import { usePathname } from 'next/navigation'
import { isFullBleedPath } from '@/lib/site-chrome'
import Footer from './Footer'

export function ConditionalFooter() {
  const pathname = usePathname()
  if (isFullBleedPath(pathname)) return null
  return <Footer />
}
