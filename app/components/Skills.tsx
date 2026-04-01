'use client'

import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { cn } from '@/lib/utils'

const skills = [
  {
    title: 'Game Development',
    technologies: ['Unity', 'C#', 'Game Design', '3D Modeling']
  },
  {
    title: 'Programming Languages',
    technologies: ['Python', 'JavaScript', 'C#', 'PHP', 'SQL']
  },
  {
    title: 'Web Development',
    technologies: ['React', 'Next.js', 'HTML/CSS', 'Material UI', 'Responsive Design']
  },
  {
    title: 'AI & Machine Learning',
    technologies: ['TensorFlow', 'OpenAI', 'NumPy', 'Matplotlib', 'Data Analysis']
  },
  {
    title: 'Tools & Platforms',
    technologies: ['Firebase', 'Git', 'MySQL', 'Vercel', 'VS Code']
  }
]

export default function Skills() {
  return (
    <section id="skills" className="home-surface home-surface--skills py-24 pb-28 md:py-28 md:pb-32">
      <div className="home-surface-inner max-w-6xl mx-auto px-6 md:px-8">
        <div className="mb-12 text-center md:mb-14">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Toolkit
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-fade-in-up">
            Skills
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <Card
              key={skill.title}
              className={cn(
                'border-border/55 bg-card/90 shadow-[0_12px_40px_-22px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.03]',
                'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-border hover:shadow-[0_18px_48px_-24px_rgba(15,23,42,0.16)]',
                'dark:shadow-[0_14px_44px_-22px_rgba(0,0,0,0.55)] dark:ring-white/[0.05] dark:hover:shadow-[0_22px_52px_-20px_rgba(0,0,0,0.65)]',
                `animate-fade-in-up-delay-${(index % 3) + 1}`
              )}
            >
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg tracking-tight">{skill.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {skill.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="border border-border/50 bg-muted/50 text-xs font-medium shadow-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

