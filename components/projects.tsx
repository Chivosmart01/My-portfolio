'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { TiltSurface } from '@/components/tilt-surface'

const PROJECTS = [
  {
    title: 'Nigeria Events (EventHive)',
    description:
      'A discovery and publishing platform for events across Nigeria — browse by state, create listings, and highlight community activity with a polished marketing landing experience.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    color: 'bg-secondary/8',
    imageUrl: '/projects/eventhive-card.png',
    animateOnLoad: true,
    liveUrl: 'https://event-hive-ng.netlify.app',
    githubUrl: 'https://github.com/Chivosmart01/EventHive',
  },
  {
    title: 'Play Tic, Tac, Toe',
    description:
      'A browser-based two-player Tic-Tac-Toe game with editable player names, game status messaging, and a clean UI built with HTML, CSS, and JavaScript.',
    tools: ['HTML', 'CSS', 'JavaScript'],
    color: 'bg-secondary/8',
    imageUrl: '/projects/tictactoe-card.png',
    animateOnLoad: true,
    liveUrl: 'https://my-portfolio-jv6a.vercel.app',
    githubUrl: 'https://github.com/Chivosmart01/Tic-Tac-Toe--Project',
  },{
    title: 'My Tasks — Todo App',
    description:
      'A task manager with productivity stats, filters, sorting, tags, priorities, optional due dates, search, and a clean dashboard-style UI.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    color: 'bg-accent/8',
    imageUrl: '/projects/todo-app-card.png',
    animateOnLoad: true,
    liveUrl: 'https://task-list-chivs.netlify.app',
    githubUrl: 'https://github.com/Chivosmart01/Todo-app',
  },
] as const

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-14 mask-reveal-cinematic ${isVisible ? 'mask-reveal--in' : ''}`}
          style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}
        >
          <p className="text-accent text-sm font-mono tracking-widest uppercase mb-3">
            Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Featured Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.title}
              className={`h-full mask-reveal rounded-xl border border-border bg-card transition-[clip-path,border-color] duration-300 ease-out hover:border-accent/40 ${
                isVisible ? 'mask-reveal--in' : ''
              }`}
              style={{
                transitionDelay: isVisible ? `${idx * 110}ms` : '0ms',
              }}
            >
              <TiltSurface className="group h-full min-h-0 rounded-xl bg-card">
                <div className="relative h-44 overflow-hidden rounded-t-xl">
                  <div
                    className={`absolute inset-0 ${project.color} mask-reveal-media ${
                      isVisible ? 'mask-reveal--in' : ''
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${idx * 110 + 180}ms` : '0ms',
                    }}
                    aria-hidden
                  />
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className={`absolute inset-0 h-full w-full object-cover ${
                        project.animateOnLoad && isVisible ? 'project-image-onload' : ''
                      }`}
                      style={
                        project.animateOnLoad && isVisible
                          ? { animationDelay: `${idx * 110 + 260}ms` }
                          : undefined
                      }
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-background/25" aria-hidden />
                  <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-white shadow-md text-foreground hover:text-accent transition-colors"
                        aria-label={`View ${project.title} live`}
                      >
                        <ExternalLink size={18} />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-white shadow-md text-foreground hover:text-accent transition-colors"
                        aria-label={`View ${project.title} source`}
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 text-xs rounded-md bg-muted text-muted-foreground font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltSurface>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
