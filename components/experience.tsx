'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle } from 'lucide-react'

const EXPERIENCES = [
  {
    company: 'ROVA',
    role: 'Senior Frontend Engineer',
    period: '2025 — Present',
    achievements: [
      'Built an internet banking platform for FCMB UK serving thousands of daily users',
      'Wrote automated tests achieving 85%+ code coverage across critical paths',
      'Partnered with FCMB UK stakeholders to scope features and align delivery timelines',
      'Collaborated with DevOps to streamline CI/CD pipelines and monitoring',
    ],
  },
  {
    company: 'Tech Service',
    role: 'Frontend Engineer',
    period: '2024 — 2025',
    achievements: [
      'Developed a core banking web app handling high-volume transaction workflows',
      'Implemented end-to-end testing strategy with Jest and React Testing Library',
      'Optimized API layer and caching, reducing average page load time by 50%',
    ],
  },
  {
    company: 'MKAN',
    role: 'Frontend Developer',
    period: '2021 — 2023',
    achievements: [
      'Built responsive web applications serving 40K+ active users',
      'Established component testing practices across the frontend team',
      'Improved application performance through code splitting and lazy loading',
    ],
  },
] as const

export default function Experience() {
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
    <section id="experience" ref={ref} className="py-24 px-6 bg-muted">
      <div className="max-w-3xl mx-auto">
        <div
          className={`text-center mb-14 mask-reveal-cinematic ${isVisible ? 'mask-reveal--in' : ''}`}
          style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}
        >
          <p className="text-accent text-sm font-mono tracking-widest uppercase mb-3">
            Career
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Experience
          </h2>
        </div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.company}
              className={`rounded-xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-md mask-reveal-cinematic ${
                isVisible ? 'mask-reveal--in' : ''
              }`}
              style={{
                transitionDelay: isVisible ? `${140 + idx * 130}ms` : '0ms',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {exp.role}
                  </h3>
                  <p className="text-accent font-medium text-sm">{exp.company}</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono bg-muted px-3 py-1 rounded-md whitespace-nowrap self-start">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2">
                {exp.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed"
                  >
                    <CheckCircle size={15} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>{achievement}</span>
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
