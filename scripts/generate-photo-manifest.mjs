/**
 * Build-time only: scans public/images/jpg and writes lib/photo-manifest.json
 * and lib/video-manifest.json. Keeps image-size out of the Next.js server bundle.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { imageSizeFromFile } from 'image-size/fromFile'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PORTFOLIO_DIR = path.join(ROOT, 'public', 'images', 'jpg')
const PHOTO_OUT = path.join(ROOT, 'lib', 'photo-manifest.json')
const VIDEO_OUT = path.join(ROOT, 'lib', 'video-manifest.json')

const IMAGE_FILE = /\.(jpe?g|png|webp|gif)$/i
const VIDEO_FILE = /\.mp4$/i
const DEFAULT_DIM = { width: 1600, height: 1200 }

/** Use display-oriented dimensions (respect EXIF rotation). */
function displayDimensions(dim) {
  let width = dim.width
  let height = dim.height
  const o = dim.orientation
  if (typeof o === 'number' && o >= 5 && o <= 8) {
    ;[width, height] = [height, width]
  }
  return { width, height }
}

/**
 * Generate a tiny base64 LQIP (low-quality image placeholder) so the browser can
 * paint a blurred preview instantly while the optimized image streams in.
 * Returns a `data:` URL string, or null if it can't be produced.
 */
async function buildBlurDataURL(fullPath) {
  try {
    const buffer = await sharp(fullPath)
      .rotate()
      .resize(20, 20, { fit: 'inside' })
      .webp({ quality: 45 })
      .toBuffer()
    return `data:image/webp;base64,${buffer.toString('base64')}`
  } catch {
    return null
  }
}

async function buildPhotoManifest() {
  if (!fs.existsSync(PORTFOLIO_DIR)) {
    fs.writeFileSync(PHOTO_OUT, '[]\n')
    console.log('generate-photo-manifest: no public/images/jpg — wrote empty photo manifest.')
    return 0
  }

  const names = fs
    .readdirSync(PORTFOLIO_DIR)
    .filter((name) => IMAGE_FILE.test(name) && !name.startsWith('.'))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true })
    )

  const results = await Promise.all(
    names.map(async (name) => {
      const fullPath = path.join(PORTFOLIO_DIR, name)
      let width = DEFAULT_DIM.width
      let height = DEFAULT_DIM.height
      try {
        const dim = await imageSizeFromFile(fullPath)
        if (
          typeof dim.width === 'number' &&
          typeof dim.height === 'number' &&
          dim.width > 0 &&
          dim.height > 0
        ) {
          const oriented = displayDimensions(dim)
          width = oriented.width
          height = oriented.height
        }
      } catch {
        // keep defaults
      }
      const blurDataURL = await buildBlurDataURL(fullPath)
      return {
        src: `/images/jpg/${encodeURIComponent(name)}`,
        width,
        height,
        ...(blurDataURL ? { blurDataURL } : {}),
      }
    })
  )

  fs.mkdirSync(path.dirname(PHOTO_OUT), { recursive: true })
  fs.writeFileSync(PHOTO_OUT, `${JSON.stringify(results, null, 2)}\n`)
  return results.length
}

function buildVideoManifest() {
  if (!fs.existsSync(PORTFOLIO_DIR)) {
    fs.writeFileSync(VIDEO_OUT, '[]\n')
    return 0
  }

  const names = fs
    .readdirSync(PORTFOLIO_DIR)
    .filter((name) => VIDEO_FILE.test(name) && !name.startsWith('.'))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true })
    )

  const results = names.map((name) => ({
    src: `/images/jpg/${encodeURIComponent(name)}`,
    name,
  }))

  fs.mkdirSync(path.dirname(VIDEO_OUT), { recursive: true })
  fs.writeFileSync(VIDEO_OUT, `${JSON.stringify(results, null, 2)}\n`)
  return results.length
}

async function main() {
  const photoCount = await buildPhotoManifest()
  const videoCount = buildVideoManifest()
  console.log(
    `generate-photo-manifest: wrote ${photoCount} photo(s) and ${videoCount} video(s).`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
