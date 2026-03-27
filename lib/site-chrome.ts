/** Routes where the global nav + footer are hidden (full-bleed experiences). */
export const FULL_BLEED_GALLERY_PATH = '/jpg' as const

export function isFullBleedPath(pathname: string | null | undefined): boolean {
  return pathname === FULL_BLEED_GALLERY_PATH
}
