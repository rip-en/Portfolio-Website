import type { PortfolioPhoto } from '@/lib/portfolio-photos'

export type GalleryItem = {
  photo: PortfolioPhoto
  key: string
  globalIndex: number
}

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashSeed(photoKey: string, visitSeed: number, cycleIndex: number): number {
  let h = 2166136261 ^ visitSeed ^ cycleIndex * 374761393
  const str = photoKey
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function shuffleWithRng<T>(items: T[], rng: () => number): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Avoid the same `src` at the end of one cycle and the start of the next. */
function fixBoundaryWithPrevious(
  perm: PortfolioPhoto[],
  lastFromPrevious: PortfolioPhoto | null
): PortfolioPhoto[] {
  if (!lastFromPrevious || perm.length <= 1) return perm
  if (perm[0].src !== lastFromPrevious.src) return perm

  const swapIdx = perm.findIndex((p, i) => i > 0 && p.src !== lastFromPrevious.src)
  if (swapIdx === -1) return perm

  const out = [...perm]
  ;[out[0], out[swapIdx]] = [out[swapIdx], out[0]]
  return out
}

/** Best-effort: no two identical `src` adjacent in one cycle (duplicate files only). */
function reduceAdjacentSameSrc(perm: PortfolioPhoto[]): PortfolioPhoto[] {
  if (perm.length < 2) return perm
  const out = [...perm]

  for (let i = 1; i < out.length; i++) {
    if (out[i].src !== out[i - 1].src) continue

    const swapIdx = out.findIndex((p, j) => j > i && p.src !== out[i - 1].src)
    if (swapIdx === -1) break

    ;[out[i], out[swapIdx]] = [out[swapIdx], out[i]]
  }

  return out
}

export function buildCyclePermutation(
  photos: PortfolioPhoto[],
  lastFromPrevious: PortfolioPhoto | null,
  cycleIndex: number,
  photoKey: string,
  visitSeed: number
): PortfolioPhoto[] {
  const n = photos.length
  if (n === 0) return []
  if (n === 1) return [photos[0]]

  const rng = mulberry32(hashSeed(photoKey, visitSeed, cycleIndex))
  let perm = shuffleWithRng([...photos], rng)
  perm = fixBoundaryWithPrevious(perm, lastFromPrevious)
  perm = reduceAdjacentSameSrc(perm)
  return perm
}

export function buildGalleryItems(
  photos: PortfolioPhoto[],
  cycles: number,
  visitSeed: number,
  photoKey: string
): GalleryItem[] {
  const out: GalleryItem[] = []
  let globalIndex = 0
  let lastPhoto: PortfolioPhoto | null = null

  for (let c = 0; c < cycles; c++) {
    const cycle = buildCyclePermutation(photos, lastPhoto, c, photoKey, visitSeed)
    for (let i = 0; i < cycle.length; i++) {
      out.push({
        photo: cycle[i],
        key: `cycle-${c}-idx-${i}-${cycle[i].src}-${globalIndex}`,
        globalIndex,
      })
      globalIndex += 1
    }
    lastPhoto = cycle[cycle.length - 1]
  }

  return out
}
