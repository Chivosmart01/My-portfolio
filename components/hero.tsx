'use client'

import { ArrowRight, Download } from 'lucide-react'
import { MagneticButton } from '@/components/magnetic-button'
import { useScrollY } from '@/hooks/use-scroll-y'

const SPECIALTIES = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] as const

export default function Hero() {
  const scrollY = useScrollY()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-[18%] h-72 w-72 rounded-full bg-accent/[0.07]"
        style={{
          transform: `translate3d(0, ${scrollY * 0.06}px, 0)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-[22%] h-56 w-56 rounded-full bg-secondary/[0.06]"
        style={{
          transform: `translate3d(0, ${scrollY * -0.04}px, 0)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          <div>
            <p className="text-accent text-sm font-mono mb-4 tracking-wide stagger-item stagger-delay-0">
              Hello, I&apos;m
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight stagger-item stagger-delay-1">
              Yusuf{' '}
              <span className="text-accent">Abdullahi</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed stagger-item stagger-delay-2">
              Senior Frontend Engineer building{' '}
              <span className="text-foreground font-medium">fast, accessible, and polished</span>{' '}
              web experiences with React, Next.js, and modern UI architecture.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 stagger-item stagger-delay-3">
            {SPECIALTIES.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-full border border-border bg-muted text-foreground text-sm font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2 flex-wrap stagger-item stagger-delay-4">
            <MagneticButton
              strength={0.2}
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-7 py-3 bg-accent text-white rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-accent/90 transition-colors"
            >
              View Projects
              <ArrowRight size={16} />
            </MagneticButton>
            <a
              href="/resume.pdf"
              download="Yusuf_Abdullahi_Resume.pdf"
              className="px-7 py-3 bg-foreground text-background rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-foreground/85 transition-colors"
            >
              <Download size={16} />
              Resume
            </a>
            <button
              type="button"
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-7 py-3 border border-border text-foreground rounded-lg font-semibold text-sm hover:bg-muted transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
