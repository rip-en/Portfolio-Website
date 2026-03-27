'use client'

import { usePathname } from 'next/navigation'
import { isFullBleedPath } from '@/lib/site-chrome'
import Navigation from './Navigation'

export function ConditionalNav() {
  const pathname = usePathname()
  if (isFullBleedPath(pathname)) return null
  return <Navigation />
}
