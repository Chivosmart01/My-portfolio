'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { CV_DOWNLOAD_FILENAME, CV_HREF } from '@/lib/resume'

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
] as const

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [overlayMounted, setOverlayMounted] = useState(false)
  const [spotlightOpen, setSpotlightOpen] = useState(false)
  const spotlightOpenRef = useRef(spotlightOpen)

  spotlightOpenRef.current = spotlightOpen

  const openDrawer = useCallback(() => {
    setOverlayMounted(true)
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setSpotlightOpen(true)
      return
    }

    setSpotlightOpen(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSpotlightOpen(true))
    })
  }, [])

  const closeDrawer = useCallback(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setSpotlightOpen(false)
    if (reduced) {
      setOverlayMounted(false)
    }
  }, [])

  const toggleDrawer = useCallback(() => {
    if (overlayMounted && spotlightOpenRef.current) {
      closeDrawer()
      return
    }
    if (overlayMounted && !spotlightOpenRef.current) {
      return
    }
    openDrawer()
  }, [overlayMounted, openDrawer, closeDrawer])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!overlayMounted) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [overlayMounted, closeDrawer])

  useEffect(() => {
    if (!overlayMounted) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [overlayMounted])

  useEffect(() => {
    if (spotlightOpen || !overlayMounted) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) return

    const id = window.setTimeout(() => {
      setOverlayMounted(false)
    }, 520)

    return () => window.clearTimeout(id)
  }, [spotlightOpen, overlayMounted])

  const handlePanelTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName !== 'clip-path') return
    if (!spotlightOpenRef.current) {
      setOverlayMounted(false)
    }
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    closeDrawer()
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center relative">
        <a
          href="#"
          className="text-xl font-bold text-foreground tracking-tight hover:text-accent transition-colors"
        >
          Yusuf<span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="nav-underline relative pb-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              {link.label}
            </button>
          ))}
          <a
            href={CV_HREF}
            download={CV_DOWNLOAD_FILENAME}
            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-accent/90 transition-colors"
          >
            <Download size={15} />
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={toggleDrawer}
          className="md:hidden relative z-[60] text-foreground hover:text-accent transition-colors p-1 -mr-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-expanded={overlayMounted && spotlightOpen}
          aria-controls="mobile-spotlight-drawer"
          aria-label={overlayMounted && spotlightOpen ? 'Close menu' : 'Open menu'}
        >
          {overlayMounted ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {overlayMounted ? (
        <div className="md:hidden">
          <button
            type="button"
            className={`fixed inset-0 z-40 mobile-spotlight-backdrop ${
              spotlightOpen ? 'mobile-spotlight-backdrop--open' : ''
            } bg-foreground/20 backdrop-blur-[2px]`}
            aria-label="Close menu"
            onClick={closeDrawer}
          />

          <div className="fixed inset-0 z-40 pointer-events-none flex justify-end items-start pt-[4.75rem] px-4 pb-6">
            <div
              id="mobile-spotlight-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className={`pointer-events-auto w-full max-w-[min(20rem,88vw)] border border-border bg-white/95 shadow-xl shadow-foreground/10 backdrop-blur-md mobile-spotlight-panel ${
                spotlightOpen ? 'mobile-spotlight-panel--open' : ''
              } ${spotlightOpen ? 'mobile-spotlight-drawer--items' : ''}`}
              onTransitionEnd={handlePanelTransitionEnd}
            >
              <div className="px-5 py-5 space-y-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="mobile-spotlight-item block w-full text-left py-2.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href={CV_HREF}
                  download={CV_DOWNLOAD_FILENAME}
                  onClick={() => closeDrawer()}
                  className="mobile-spotlight-cta mt-3 w-full px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors"
                >
                  <Download size={15} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
