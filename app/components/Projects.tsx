'use client'

import { ExternalLink, Github, Globe } from 'lucide-react'
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
  },
  {
    name: 'INGAGE Events',
    domain: 'playingage.com',
    href: 'https://www.playingage.com',
    description: 'INGAGE events hosted at XP Tavern.',
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
  'rounded border border-border bg-transparent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground'

const linkPillClass =
  'inline-flex items-center gap-1.5 rounded border border-foreground/20 bg-transparent px-2 py-1 text-[10px] font-medium text-foreground transition-colors hover:bg-foreground hover:text-background'

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 text-center tracking-tight animate-fade-in-up">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-14">
          {featuredSites.map((site) => (
            <a
              key={site.href}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group flex flex-col rounded-lg border border-border bg-card p-6 md:p-8',
                'transition-all duration-200 hover:border-foreground/25 hover:shadow-md',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                  {site.name}
                </h3>
                <ExternalLink
                  size={18}
                  className="shrink-0 text-muted-foreground opacity-60 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {site.description}
              </p>
              <span className="font-mono text-xs text-foreground/80 border-t border-border pt-4">
                {site.domain}
              </span>
            </a>
          ))}
        </div>

        <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Other work
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={cn(
                'flex flex-col overflow-hidden border transition-shadow duration-200 hover:shadow-md h-full',
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
