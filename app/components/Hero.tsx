'use client'

import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="home" className="min-h-[70vh] flex items-center relative pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-8 w-full">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-3 tracking-tight text-black dark:text-white">
            Ebrahim Nazmul
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-5 font-normal max-w-lg mx-auto">
            Freelance Developer / Photographer
          </p>
          <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-500 mb-10 font-normal max-w-2xl mx-auto leading-relaxed">
            
          </p>

          <button
            type="button"
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 px-8 py-3 border border-black dark:border-white text-black dark:text-white font-medium transition-colors duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            View projects
            <ArrowDown size={16} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}
