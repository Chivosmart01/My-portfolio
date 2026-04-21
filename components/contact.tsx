'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, Github, Send } from 'lucide-react'

const SOCIAL_LINKS = [
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:abdulyusufade@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdullahi-yusuf-334881379',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/Chivosmart01',
  },
] as const

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors hover:border-accent/40'

  return (
    <section id="contact" ref={ref} className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div
          className={`mask-reveal ${isVisible ? 'mask-reveal--in' : ''}`}
          style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}
        >
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-mono tracking-widest uppercase mb-3">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Open to new opportunities and interesting projects. Let&apos;s connect.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mb-12">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={handleChange('name')}
                className={inputClasses}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                className={inputClasses}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                value={formData.message}
                onChange={handleChange('message')}
                className={`${inputClasses} resize-none`}
                placeholder="Your message"
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-accent text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors group"
            >
              Send Message
              <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <div className="border-t border-border pt-8">
            <p className="text-center text-muted-foreground text-sm mb-5">
              Or find me on these platforms
            </p>
            <div className="flex justify-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="w-11 h-11 rounded-lg border border-border bg-card text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors flex items-center justify-center"
                  title={label}
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <footer className="text-center mt-14 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Designed & built by{' '}
              <span className="text-foreground font-medium">Yusuf Abdullahi</span>
            </p>
          </footer>
        </div>
      </div>
    </section>
  )
}
