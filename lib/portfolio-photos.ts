import manifest from './photo-manifest.json'

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

const photos: PortfolioPhoto[] = manifest as PortfolioPhoto[]

function basenameFromPhotoSrc(src: string): string {
  const tail = src.split('/').pop() ?? ''
  try {
    return decodeURIComponent(tail)
  } catch {
    return tail
  }
}

/** Static list from `lib/photo-manifest.json` (regenerate: `npm run photos:manifest`). */
export function getPortfolioPhotos(): PortfolioPhoto[] {
  return photos
}

export function getHomePreviewPhotos(): PortfolioPhoto[] {
  if (photos.length === 0) return []

  if (HOME_PHOTOGRAPHY_PREVIEW.length === 0) {
    return photos.slice(0, 3)
  }

  const byLowerName = new Map<string, PortfolioPhoto>()
  for (const photo of photos) {
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
