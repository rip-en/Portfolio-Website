import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getHomePreviewPhotos } from '@/lib/portfolio-photos'

const PREVIEW_SIZES = '(max-width: 640px) 100vw, 33vw'

export default function PhotographyTeaser() {
  const preview = getHomePreviewPhotos()

  return (
    <section
      id="photography"
      className="py-24 md:py-32 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase mb-3">
              Photography
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black dark:text-white">
              Still learning, still shooting
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
              A small set of frames while the portfolio grows. Full gallery lives at{' '}
              <span className="font-mono text-gray-800 dark:text-gray-300">/jpg</span>.
            </p>
          </div>
          <Link
            href="/jpg"
            className="group inline-flex items-center gap-2 font-mono text-sm text-black dark:text-white border border-gray-300 dark:border-gray-600 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200 shrink-0"
          >
            Open gallery
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {preview.length > 0 && (
          <div className="columns-1 sm:columns-3 gap-3 [column-gap:12px]">
            {preview.map((photo, index) => (
              <Link
                key={photo.src}
                href="/jpg"
                className="break-inside-avoid mb-3 block overflow-hidden bg-gray-100 dark:bg-gray-900 group"
              >
                <Image
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt="Photography preview"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes={PREVIEW_SIZES}
                  priority={index === 0}
                  quality={72}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
