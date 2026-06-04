import manifest from './video-manifest.json'

export type PortfolioVideo = {
  src: string
  name: string
}

const videos: PortfolioVideo[] = manifest as PortfolioVideo[]

/** Static list from `lib/video-manifest.json` (regenerate: `npm run photos:manifest`). */
export function getPortfolioVideos(): PortfolioVideo[] {
  return videos
}
