import Hero from './components/Hero'
import Projects from './components/Projects'
import PhotographyTeaser from './components/PhotographyTeaser'
import Skills from './components/Skills'

export default function Home() {
  return (
    <div className="relative bg-background">
      <Hero />
      <div className="relative z-10 bg-background">
        <Projects />
        <PhotographyTeaser />
        <Skills />
      </div>
    </div>
  )
}
