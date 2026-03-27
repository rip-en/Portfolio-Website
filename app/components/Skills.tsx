'use client'

import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

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
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center tracking-tight animate-fade-in-up">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <Card 
              key={skill.title}
              className={`hover:shadow-lg transition-all duration-300 ease-out animate-fade-in-up-delay-${(index % 3) + 1}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{skill.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {skill.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs"
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

