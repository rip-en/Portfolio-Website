'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export type LetterGlitchProps = {
  glitchColors?: string[]
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  characters?: string
  className?: string
  /** Words or short phrases (spaces stripped) that occasionally flash in the matrix */
  hiddenPhrases?: string[]
  /** 0–1: probability per glitch tick that a phrase is injected */
  hiddenPhraseChance?: number
}

const DEFAULT_COLORS = ['#2b4539', '#61dca3', '#61b3dc']

export function LetterGlitch({
  glitchColors = DEFAULT_COLORS,
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
  className,
  hiddenPhrases = ['CHANGE THE GAME', 'HESITATION IS DEFEAT'],
  hiddenPhraseChance = 0.4,
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const glitchColorsRef = useRef(glitchColors)
  const charPoolRef = useRef<string[]>(Array.from(characters))
  const hiddenPhrasesRef = useRef(hiddenPhrases)
  const hiddenPhraseChanceRef = useRef(hiddenPhraseChance)

  glitchColorsRef.current = glitchColors
  charPoolRef.current = Array.from(characters)
  hiddenPhrasesRef.current = hiddenPhrases
  hiddenPhraseChanceRef.current = hiddenPhraseChance

  const letters = useRef<
    {
      char: string
      color: string
      targetColor: string
      colorProgress: number
    }[]
  >([])
  const grid = useRef({ columns: 0, rows: 0 })
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const lastGlitchTime = useRef(Date.now())

  const fontSize = 16
  const charWidth = 10
  const charHeight = 20

  const getRandomChar = () => {
    const pool = charPoolRef.current
    return pool[Math.floor(Math.random() * pool.length)] ?? '?'
  }

  const getRandomColor = () => {
    const palette = glitchColorsRef.current
    return palette[Math.floor(Math.random() * palette.length)] ?? '#ffffff'
  }

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
      return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  const parseRgbOrHex = (color: string) => {
    const rgb = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(color.trim())
    if (rgb) {
      return { r: +rgb[1], g: +rgb[2], b: +rgb[3] }
    }
    return hexToRgb(color)
  }

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    }
    return `rgb(${result.r}, ${result.g}, ${result.b})`
  }

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth)
    const rows = Math.ceil(height / charHeight)
    return { columns, rows }
  }

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows }
    const totalLetters = columns * rows
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }))
  }

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return
    const canvas = canvasRef.current
    if (!canvas) return

    const { width, height } = canvas.getBoundingClientRect()
    if (width === 0 || height === 0) return

    const ctx = context.current
    ctx.clearRect(0, 0, width, height)
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = 'top'

    const cols = grid.current.columns
    letters.current.forEach((letter, index) => {
      const x = (index % cols) * charWidth
      const y = Math.floor(index / cols) * charHeight
      ctx.fillStyle = letter.color
      ctx.fillText(letter.char, x, y)
    })
  }

  const injectHiddenPhrase = () => {
    const phrases = hiddenPhrasesRef.current
    if (!phrases.length || letters.current.length === 0) return

    const raw = phrases[Math.floor(Math.random() * phrases.length)]
    const phrase = raw.replace(/\s+/g, '').toUpperCase()
    if (!phrase.length) return

    const { columns, rows } = grid.current
    const len = Math.min(phrase.length, columns)
    const col = Math.floor(Math.random() * Math.max(1, columns - len + 1))
    const row = Math.floor(Math.random() * rows)
    const palette = glitchColorsRef.current
    const whisperColor =
      palette[Math.min(palette.length - 1, Math.floor(palette.length * 0.88))] ?? palette[0]

    for (let i = 0; i < len; i++) {
      const idx = row * columns + col + i
      if (idx >= letters.current.length) break
      const L = letters.current[idx]
      L.char = phrase[i]
      L.targetColor = whisperColor
      if (!smooth) {
        L.color = L.targetColor
        L.colorProgress = 1
      } else {
        L.colorProgress = 0
      }
    }
  }

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05))

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length)
      const cell = letters.current[index]
      if (!cell) continue

      cell.char = getRandomChar()
      cell.targetColor = getRandomColor()

      if (!smooth) {
        cell.color = cell.targetColor
        cell.colorProgress = 1
      } else {
        cell.colorProgress = 0
      }
    }

    if (
      hiddenPhrasesRef.current.length > 0 &&
      Math.random() < hiddenPhraseChanceRef.current
    ) {
      injectHiddenPhrase()
    }
  }

  const handleSmoothTransitions = () => {
    let needsRedraw = false
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress = Math.min(1, letter.colorProgress + 0.05)

        const startRgb = parseRgbOrHex(letter.color)
        const endRgb = hexToRgb(letter.targetColor)
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress)
          needsRedraw = true
        }
      }
    })

    if (needsRedraw) {
      drawLetters()
    }
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const rect = parent.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height)
    initializeLetters(columns, rows)
    drawLetters()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false }) ?? canvas.getContext('2d')
    if (!ctx) return
    context.current = ctx
    resizeCanvas()

    const animate = () => {
      const now = Date.now()
      if (now - lastGlitchTime.current >= glitchSpeed) {
        updateLetters()
        drawLetters()
        lastGlitchTime.current = now
      }

      if (smooth) {
        handleSmoothTransitions()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    let resizeTimeout: ReturnType<typeof setTimeout>

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current as number)
        resizeCanvas()
        animationRef.current = requestAnimationFrame(animate)
      }, 100)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current as number)
      } else {
        lastGlitchTime.current = Date.now()
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(animationRef.current!)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- RAF loop; pools via refs; restart on glitchSpeed/smooth
  }, [glitchSpeed, smooth])

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-black',
        className
      )}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {outerVignette && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle,_rgba(0,0,0,0)_55%,_rgba(0,0,0,0.92)_100%)]" />
      )}
      {centerVignette && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle,_rgba(0,0,0,0.75)_0%,_rgba(0,0,0,0)_55%)]" />
      )}
    </div>
  )
}
