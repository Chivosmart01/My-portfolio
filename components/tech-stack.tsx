'use client'

import { useEffect, useRef, useState } from 'react'

const TECHNOLOGIES = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'State & Data',
    items: ['Redux', 'Zustand'],
  },
  {
    category: 'Tools & Testing',
    items: ['Jest', 'React Testing Library', 'Vitest'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'MongoDB', 'Express', 'SQL'],
  },
] as const

export default function TechStack() {
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
    <section ref={ref} className="py-24 px-6 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-14 mask-reveal-cinematic ${isVisible ? 'mask-reveal--in' : ''}`}
          style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}
        >
          <p className="text-accent text-sm font-mono tracking-widest uppercase mb-3">
            Technologies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Tech Stack
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TECHNOLOGIES.map((tech, idx) => (
            <div
              key={tech.category}
              className={`rounded-xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5 cursor-default mask-reveal ${
                isVisible ? 'mask-reveal--in' : ''
              }`}
              style={{
                transitionDelay: isVisible ? `${100 + idx * 100}ms` : '0ms',
              }}
            >
              <h3 className="text-base font-semibold text-foreground mb-4">
                {tech.category}
              </h3>
              <ul className="space-y-2.5">
                {tech.items.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground text-sm flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
