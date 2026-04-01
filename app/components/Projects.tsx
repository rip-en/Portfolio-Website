'use client'

import { ArrowUpRight, ExternalLink, Github, Globe } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const featuredSites = [
  {
    name: 'PlayUnite',
    domain: 'playunite.pro',
    href: 'https://www.playunite.pro',
    description: 'Professional Pokémon Unite esports platform.',
    image: '/images/pup.png',
    tags: ['Next.js', 'Firebase', 'Tailwind'],
  },
  {
    name: 'INGAGE Events',
    domain: 'playingage.com',
    href: 'https://www.playingage.com',
    description: 'INGAGE events hosted at XP Tavern.',
    image: '/images/ingage-events.png',
    tags: ['Next.js', 'Supabase', 'Stripe'],
  },
] as const

const projects = [
  {
    title: 'ApprentEase Platform',
    description: 'A comprehensive community platform helping users achieve apprenticeships, serving 400+ active users with real-time matching and guidance systems.',
    technologies: ['Next.js', 'Material UI', 'Firebase'],
    dates: '2024',
    image: '/images/apprentease.png',
    links: [
      {
        icon: <Globe size={11} />,
        type: 'Live',
        href: 'https://www.apprentease.co',
      },
    ],
  },
  {
    title: 'Multiplayer FPS Game',
    description: 'A zombie round-based shooter with comprehensive account system, leaderboards, and in-game shop. Built from scratch in Unity.',
    technologies: ['C#', 'Unity', 'PHP', 'MySQL'],
    dates: '2024',
    image: '/images/nea1.png',
    links: [
      {
        icon: <Github size={11} />,
        type: 'Code',
        href: 'https://github.com/rip-en/NEA-2024---Invictus',
      },
    ],
  },
  {
    title: 'AI Support Chatbot',
    description: 'Intelligent customer support bot for the ApprentEase community, helping users with degree apprenticeship queries using OpenAI.',
    technologies: ['Next.js', 'OpenAI', 'React'],
    dates: '2024',
    image: '/images/chatbot.png',
    links: [
      {
        icon: <Globe size={11} />,
        type: 'Try Bot',
        href: 'https://apprentease-support-bot.vercel.app',
      },
    ],
  },
  {
    title: 'Inventory Management System',
    description: 'Full-stack inventory management application with real-time updates, user authentication, and comprehensive dashboard.',
    technologies: ['Next.js', 'Firebase', 'Material UI'],
    dates: '2024',
    image: '/images/inventory.png',
    links: [
      {
        icon: <Globe size={11} />,
        type: 'Live Demo',
        href: 'https://voidinventory.vercel.app',
      },
    ],
  },
]

const tagClass =
  'rounded-md border border-border/70 bg-muted/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground shadow-sm shadow-black/[0.03] dark:shadow-black/30'

const linkPillClass =
  'inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-background/80 px-2 py-1 text-[10px] font-medium text-foreground shadow-sm transition-all hover:border-foreground/30 hover:bg-foreground hover:text-background hover:shadow-md'

const featuredCardClass = cn(
  'group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm',
  'shadow-[0_14px_48px_-18px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.04]',
  'transition-all duration-300 ease-out',
  'hover:-translate-y-1 hover:border-violet-500/25 hover:shadow-[0_24px_56px_-20px_rgba(15,23,42,0.22),0_0_0_1px_rgba(139,92,246,0.12)]',
  'dark:shadow-[0_18px_56px_-20px_rgba(0,0,0,0.65)] dark:ring-white/[0.06]',
  'dark:hover:border-violet-400/30 dark:hover:shadow-[0_28px_64px_-22px_rgba(0,0,0,0.75),0_0_48px_-12px_rgba(139,92,246,0.18)]'
)

export default function Projects() {
  return (
    <section id="projects" className="home-surface home-surface--projects py-24 md:py-28">
      <div className="home-surface-inner max-w-6xl mx-auto px-6 md:px-8">
        <div className="mb-12 text-center md:mb-14">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Selected work
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-fade-in-up">
            Projects
          </h2>
        </div>

        <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {featuredSites.map((site) => (
            <a
              key={site.href}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                featuredCardClass,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-card">
                <Image
                  src={site.image}
                  alt={`${site.name} site preview`}
                  fill
                  className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <span className="absolute right-3 top-3 inline-flex rounded-md bg-background/85 p-1.5 text-foreground shadow-sm ring-1 ring-border/60 backdrop-blur-sm transition group-hover:bg-violet-500/15 group-hover:ring-violet-500/30">
                  <ExternalLink size={16} className="opacity-80" aria-hidden />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {site.name}
                </h3>
                <p className="mb-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {site.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-1">
                  {site.tags.map((tag) => (
                    <span key={tag} className={tagClass}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                  <span className="font-mono text-xs text-muted-foreground">{site.domain}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 transition group-hover:translate-x-0.5 group-hover:text-violet-500 dark:text-violet-400 dark:group-hover:text-violet-300">
                    Visit
                    <ArrowUpRight size={14} className="opacity-90" aria-hidden />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Other work
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={cn(
                'flex h-full flex-col overflow-hidden border-border/55 bg-card/90 shadow-[0_10px_36px_-20px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-[0_16px_44px_-22px_rgba(15,23,42,0.18)] dark:shadow-[0_12px_40px_-18px_rgba(0,0,0,0.55)] dark:ring-white/[0.05] dark:hover:shadow-[0_20px_48px_-18px_rgba(0,0,0,0.65)]',
                `animate-fade-in-up-delay-${(index % 3) + 1}`
              )}
            >
              <Link href={project.links[0]?.href || '#'} className="block shrink-0">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={160}
                    className="h-28 w-full object-cover object-top"
                  />
                )}
              </Link>
              <CardHeader className="px-3 pt-3 pb-0 space-y-1">
                <CardTitle className="text-sm font-semibold leading-snug line-clamp-2">
                  {project.title}
                </CardTitle>
                <time className="font-mono text-[10px] text-muted-foreground">{project.dates}</time>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col px-3 py-2">
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span key={tech} className={tagClass}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="px-3 pb-3 pt-0 flex flex-wrap gap-1">
                {project.links.map((link, idx) => (
                  <Link href={link.href} key={idx} target="_blank" rel="noopener noreferrer">
                    <span className={linkPillClass}>
                      {link.icon}
                      {link.type}
                    </span>
                  </Link>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
