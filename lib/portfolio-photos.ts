import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import { imageSizeFromFile } from 'image-size/fromFile'

/** Portfolio-only folder: `public/images/jpg` */
const PORTFOLIO_DIR = path.join(process.cwd(), 'public', 'images', 'jpg')

const IMAGE_FILE = /\.(jpe?g|png|webp|gif)$/i

const DEFAULT_DIM = { width: 1600, height: 1200 } as const

export type PortfolioPhoto = {
  src: string
  width: number
  height: number
}

/**
 * Which gallery images appear on the home page (`PhotographyTeaser`), in order.
 * Use exact filenames as in `public/images/jpg` (matching is case-insensitive).
 * Leave empty to show the first 3 images from the gallery (sorted by filename).
 */
export const HOME_PHOTOGRAPHY_PREVIEW: string[] = [
  'img1.JPEG',
  'img2.JPEG',
  'im67.JPEG',
]

function basenameFromPhotoSrc(src: string): string {
  const tail = src.split('/').pop() ?? ''
  try {
    return decodeURIComponent(tail)
  } catch {
    return tail
  }
}

async function readDimensions(
  fullPath: string
): Promise<{ width: number; height: number }> {
  try {
    const dim = await imageSizeFromFile(fullPath)
    const w = dim.width
    const h = dim.height
    if (typeof w === 'number' && typeof h === 'number' && w > 0 && h > 0) {
      return { width: w, height: h }
    }
  } catch {
    // fall through
  }
  return { ...DEFAULT_DIM }
}

/** One scan of `public/images/jpg`; cached per request (RSC). */
export const getPortfolioPhotos = cache(async (): Promise<PortfolioPhoto[]> => {
  if (!fs.existsSync(PORTFOLIO_DIR)) return []

  const names = fs
    .readdirSync(PORTFOLIO_DIR)
    .filter((name) => IMAGE_FILE.test(name) && !name.startsWith('.'))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true })
    )

  return Promise.all(
    names.map(async (name) => {
      const fullPath = path.join(PORTFOLIO_DIR, name)
      const { width, height } = await readDimensions(fullPath)
      return {
        src: `/images/jpg/${encodeURIComponent(name)}`,
        width,
        height,
      }
    })
  )
})

export async function getHomePreviewPhotos(): Promise<PortfolioPhoto[]> {
  const all = await getPortfolioPhotos()
  if (all.length === 0) return []

  if (HOME_PHOTOGRAPHY_PREVIEW.length === 0) {
    return all.slice(0, 3)
  }

  const byLowerName = new Map<string, PortfolioPhoto>()
  for (const photo of all) {
    const base = basenameFromPhotoSrc(photo.src)
    byLowerName.set(base.toLowerCase(), photo)
  }

  const out: PortfolioPhoto[] = []
  for (const name of HOME_PHOTOGRAPHY_PREVIEW) {
    const photo = byLowerName.get(name.trim().toLowerCase())
    if (photo) out.push(photo)
  }
  return out
}
