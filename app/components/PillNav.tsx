'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export type PillNavItem = {
  label: string
  href: string
  ariaLabel?: string
}

export interface PillNavProps {
  logo?: string
  logoAlt?: string
  logoHref?: string
  items: PillNavItem[]
  className?: string
  ease?: string
  baseColor?: string
  pillColor?: string
  /** Must contrast with `baseColor` (hover circle fill), not `pillColor` */
  hoveredPillTextColor?: string
  pillTextColor?: string
  onMobileMenuClick?: () => void
  initialLoadAnimation?: boolean
}

function isExternalHref(href: string) {
  return (
    /^https?:\/\//i.test(href) ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('//')
  )
}

function useRouteMatch() {
  const pathname = usePathname()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const sync = () => setHash(typeof window !== 'undefined' ? window.location.hash : '')
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [pathname])

  const isActive = useCallback(
    (href: string) => {
      if (href.startsWith('/jpg') || href === '/jpg') {
        return pathname === '/jpg'
      }
      if (href.startsWith('/#')) {
        return pathname === '/' && hash === href.slice(1)
      }
      if (href.startsWith('#')) {
        return pathname === '/' && hash === href
      }
      return pathname === href
    },
    [pathname, hash]
  )

  return { pathname, hash, isActive }
}

export function PillNav({
  logo,
  logoAlt = 'Home',
  logoHref = '/',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}: PillNavProps) {
  const resolvedPillTextColor = pillTextColor ?? baseColor
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([])
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([])
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([])
  const logoImgRef = useRef<HTMLImageElement | null>(null)
  const logoIconRef = useRef<HTMLSpanElement | null>(null)
  const logoTweenRef = useRef<gsap.core.Animation | null>(null)
  const hamburgerRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const navItemsRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLAnchorElement | null>(null)
  const { isActive } = useRouteMatch()

  const layout = useCallback(() => {
    circleRefs.current.forEach((circle) => {
      if (!circle?.parentElement) return

      const pill = circle.parentElement as HTMLElement
      const rect = pill.getBoundingClientRect()
      const { width: w, height: h } = rect
      const R = ((w * w) / 4 + h * h) / (2 * h)
      const D = Math.ceil(2 * R) + 2
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
      const originY = D - delta

      circle.style.width = `${D}px`
      circle.style.height = `${D}px`
      circle.style.bottom = `-${delta}px`

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      })

      const label = pill.querySelector<HTMLElement>('.pill-label')
      const white = pill.querySelector<HTMLElement>('.pill-label-hover')

      if (label) gsap.set(label, { y: 0 })
      if (white) gsap.set(white, { y: h + 12, opacity: 0 })

      const index = circleRefs.current.indexOf(circle)
      if (index === -1) return

      tlRefs.current[index]?.kill()
      const tl = gsap.timeline({ paused: true })
      const dur = 1

      tl.to(circle, { scale: 1.2, xPercent: -50, duration: dur, ease, overwrite: 'auto' }, 0)

      if (label) {
        tl.to(label, { y: -(h + 8), duration: dur, ease, overwrite: 'auto' }, 0)
      }

      if (white) {
        gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 })
        tl.to(white, { y: 0, opacity: 1, duration: dur, ease, overwrite: 'auto' }, 0)
      }

      tlRefs.current[index] = tl
    })
  }, [ease])

  useEffect(() => {
    layout()

    const onResize = () => layout()
    window.addEventListener('resize', onResize)

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {})
    }

    const menu = mobileMenuRef.current
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 })
    }

    if (initialLoadAnimation) {
      const logoEl = logoRef.current
      const navItems = navItemsRef.current

      if (logoEl) {
        gsap.set(logoEl, { scale: 0 })
        gsap.to(logoEl, {
          scale: 1,
          duration: 0.6,
          ease,
        })
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' })
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease,
        })
      }
    }

    return () => {
      window.removeEventListener('resize', onResize)
      ;[...tlRefs.current].forEach((tl) => tl?.kill())
      tlRefs.current = []
      ;[...activeTweenRefs.current].forEach((tw) => tw?.kill())
      activeTweenRefs.current = []
    }
  }, [items, ease, initialLoadAnimation, layout])

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    })
  }

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto',
    })
  }

  const handleLogoEnter = () => {
    if (logo) {
      const img = logoImgRef.current
      if (!img) return
      logoTweenRef.current?.kill()
      gsap.set(img, { rotate: 0 })
      logoTweenRef.current = gsap.to(img, {
        rotate: 360,
        duration: 0.2,
        ease,
        overwrite: 'auto',
      })
      return
    }

    const el = logoIconRef.current
    if (!el) return
    logoTweenRef.current?.kill()
    gsap.set(el, { transformOrigin: '50% 50%' })

    const tl = gsap.timeline()
    tl.fromTo(
      el,
      { rotate: 0, scale: 1 },
      { scale: 1.2, rotate: 5, duration: 0.09, ease: 'power2.out' }
    )
    tl.to(el, { rotate: -18, duration: 0.06, ease: 'none' })
    tl.to(el, { rotate: 15, duration: 0.06, ease: 'none' })
    tl.to(el, { rotate: -11, duration: 0.05, ease: 'none' })
    tl.to(el, { rotate: 7, duration: 0.05, ease: 'none' })
    tl.to(el, { rotate: 0, scale: 1.1, duration: 0.1, ease: 'power2.out' })
    tl.to(el, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.42)' })
    logoTweenRef.current = tl
  }

  const handleLogoLeave = () => {
    if (logo) return
    const el = logoIconRef.current
    if (!el) return
    logoTweenRef.current?.kill()
    gsap.to(el, {
      rotate: 0,
      scale: 1,
      duration: 0.28,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)

    const hamburger = hamburgerRef.current
    const menu = mobileMenuRef.current

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line')
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease })
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease })
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease })
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease })
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' })
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center',
          }
        )
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' })
          },
        })
      }
    }

    onMobileMenuClick?.()
  }

  const cssVars = useMemo(
    () =>
      ({
        ['--base']: baseColor,
        ['--pill-bg']: pillColor,
        ['--hover-text']: hoveredPillTextColor,
        ['--pill-text']: resolvedPillTextColor,
        ['--nav-h']: '42px',
        ['--logo']: '36px',
        ['--pill-pad-x']: '18px',
        ['--pill-gap']: '3px',
      }) as React.CSSProperties,
    [baseColor, pillColor, hoveredPillTextColor, resolvedPillTextColor]
  )

  return (
    <div className={cn('relative z-[1000] w-full min-w-0 md:w-auto', className)}>
      <nav
        className="box-border flex w-full items-center justify-between md:justify-start md:gap-0"
        aria-label="Primary"
        style={cssVars}
      >
        <Link
          href={logoHref}
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          ref={(el) => {
            logoRef.current = el
          }}
          className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full p-2"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--base, #000)',
          }}
        >
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element -- optional remote / user-supplied logo URL
            <img
              src={logo}
              alt={logoAlt}
              ref={logoImgRef}
              className="block h-full w-full object-cover"
            />
          ) : (
            <span
              ref={logoIconRef}
              className="inline-flex will-change-transform text-[color:var(--pill-bg)]"
              aria-hidden
            >
              <Zap className="h-[18px] w-[18px]" strokeWidth={2.25} />
            </span>
          )}
        </Link>

        <div
          ref={navItemsRef}
          className="relative ml-2 hidden h-[var(--nav-h)] items-center rounded-full md:flex"
          style={{
            height: 'var(--nav-h)',
            background: 'var(--base, #000)',
          }}
        >
          <ul
            role="menubar"
            className="m-0 flex h-full list-none items-stretch p-[3px]"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const active = isActive(item.href)

              const pillStyle: React.CSSProperties = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)',
              }

              const PillContent = (
                <>
                  <span
                    className="hover-circle pointer-events-none absolute bottom-0 left-1/2 z-[1] block rounded-full"
                    style={{
                      background: 'var(--base, #000)',
                      willChange: 'transform',
                    }}
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el
                    }}
                  />
                  <span className="label-stack relative z-[2] inline-block leading-[1]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ color: 'inherit', willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: 'var(--hover-text)',
                        willChange: 'transform, opacity',
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {active && (
                    <span
                      className="absolute -bottom-[6px] left-1/2 z-[4] h-3 w-3 -translate-x-1/2 rounded-full"
                      style={{ background: 'var(--pill-bg)' }}
                      aria-hidden="true"
                    />
                  )}
                </>
              )

              const basePillClasses =
                'relative box-border inline-flex h-full cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-0 text-[16px] font-semibold uppercase leading-[0] tracking-[0.2px] no-underline'

              const external = isExternalHref(item.href)

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {external ? (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {PillContent}
                    </a>
                  ) : (
                    <Link
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <button
          ref={hamburgerRef}
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-full border-0 p-0 md:hidden"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--base, #000)',
          }}
        >
          <span
            className="hamburger-line h-0.5 w-4 origin-center rounded transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
          <span
            className="hamburger-line h-0.5 w-4 origin-center rounded transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        className="absolute left-4 right-4 top-[3em] z-[998] origin-top rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] md:hidden"
        style={{
          ...cssVars,
          background: 'var(--base, #f0f0f0)',
        }}
      >
        <ul className="m-0 flex flex-col gap-[3px] p-[3px]">
          {items.map((item) => {
            const defaultStyle: React.CSSProperties = {
              background: 'var(--pill-bg, #fff)',
              color: 'var(--pill-text, #fff)',
            }
            const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = 'var(--base)'
              e.currentTarget.style.color = 'var(--hover-text, #fff)'
            }
            const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = 'var(--pill-bg, #fff)'
              e.currentTarget.style.color = 'var(--pill-text, #fff)'
            }

            const linkClasses =
              'block rounded-[50px] px-4 py-3 text-[16px] font-medium transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]'

            const external = isExternalHref(item.href)

            if (external) {
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={() => setIsMobileMenuOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              )
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={linkClasses}
                  style={defaultStyle}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
