/**
 * Build-time only: scans public/images/jpg and writes lib/photo-manifest.json.
 * Keeps image-size out of the Next.js server bundle (Vercel function size limit).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { imageSizeFromFile } from 'image-size/fromFile'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PORTFOLIO_DIR = path.join(ROOT, 'public', 'images', 'jpg')
const OUT = path.join(ROOT, 'lib', 'photo-manifest.json')

const IMAGE_FILE = /\.(jpe?g|png|webp|gif)$/i
const DEFAULT_DIM = { width: 1600, height: 1200 }

async function main() {
  if (!fs.existsSync(PORTFOLIO_DIR)) {
    fs.writeFileSync(OUT, '[]\n')
    console.log('generate-photo-manifest: no public/images/jpg — wrote empty manifest.')
    return
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
          width = dim.width
          height = dim.height
        }
      } catch {
        // keep defaults
      }
      return {
        src: `/images/jpg/${encodeURIComponent(name)}`,
        width,
        height,
      }
    })
  )

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, `${JSON.stringify(results, null, 2)}\n`)
  console.log(
    `generate-photo-manifest: wrote ${results.length} item(s) to lib/photo-manifest.json`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
