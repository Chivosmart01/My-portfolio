'use client'

import { useEffect, useRef, useState } from 'react'
import { Code2, Palette, Zap, Shield, Globe, Layers, type LucideIcon } from 'lucide-react'

interface Skill {
  name: string
  icon: LucideIcon
  stat: string
  label: string
}

const SKILLS: Skill[] = [
  { name: 'Component Architecture', icon: Layers, stat: '50+', label: 'Components Built' },
  { name: 'Performance Optimization', icon: Zap, stat: '3x', label: 'Faster Load Times' },
  { name: 'Design Systems', icon: Palette, stat: '5+', label: 'Systems Created' },
  { name: 'Accessibility', icon: Shield, stat: 'WCAG', label: '2.1 Compliant' },
  { name: 'API Integration', icon: Globe, stat: '20+', label: 'APIs Integrated' },
  { name: 'State Management', icon: Code2, stat: '4+', label: 'Years Experience' },
]

export default function About() {
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
    <section id="about" ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-14 mask-reveal-cinematic ${isVisible ? 'mask-reveal--in' : ''}`}
          style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}
        >
          <p className="text-accent text-sm font-mono tracking-widest uppercase mb-3">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Crafting Digital Experiences
          </h2>
        </div>

        <div
          className={`max-w-3xl mx-auto mb-16 space-y-5 mask-reveal-cinematic ${isVisible ? 'mask-reveal--in' : ''}`}
          style={{ transitionDelay: isVisible ? '120ms' : '0ms' }}
        >
          <p className="text-muted-foreground text-lg leading-relaxed text-center">
            I&apos;m a frontend engineer with{' '}
            <span className="text-foreground font-medium">4+ years of experience</span>{' '}
            building scalable web applications. I focus on creating accessible,
            performant interfaces that solve real problems and feel great to use.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed text-center">
            My work spans component libraries, design systems, and full-stack React applications.
            I care deeply about clean code, testing, and helping teams ship with confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {SKILLS.map((skill, idx) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.name}
                className={`group cursor-default mask-reveal ${isVisible ? 'mask-reveal--in' : ''}`}
                style={{ transitionDelay: isVisible ? `${200 + idx * 95}ms` : '0ms' }}
              >
                <div className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-accent" />
                  </div>

                  <p className="text-2xl font-bold text-foreground mb-0.5">
                    {skill.stat}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">
                    {skill.label}
                  </p>

                  <p className="text-sm font-medium text-card-foreground">
                    {skill.name}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={`mt-14 flex justify-center mask-reveal-media ${isVisible ? 'mask-reveal--in' : ''}`}
          style={{ transitionDelay: isVisible ? '520ms' : '0ms' }}
        >
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-border bg-muted">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-sm text-muted-foreground">
              Currently open to new opportunities
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
