'use client'

import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

const MAX_TILT_DEG = 7

const SHADOW_IDLE =
  '0 14px 32px -10px rgba(15, 23, 42, 0.1), 0 6px 14px -6px rgba(15, 23, 42, 0.06)'

type TiltSurfaceProps = {
  children: ReactNode
  className?: string
}

export function TiltSurface({ children, className }: TiltSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [surfaceStyle, setSurfaceStyle] = useState<CSSProperties>({
    boxShadow: SHADOW_IDLE,
  })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    const rotateX = -py * 2 * MAX_TILT_DEG
    const rotateY = px * 2 * MAX_TILT_DEG
    const shadowX = -rotateY * 1.35
    const shadowY = rotateX * 1.1

    setSurfaceStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
      boxShadow: `${shadowX}px ${shadowY + 10}px 36px rgba(15, 23, 42, 0.12), 0 4px 14px rgba(15, 23, 42, 0.06)`,
      transition: 'box-shadow 0.12s ease-out, transform 0.08s ease-out',
    })
  }

  const handleLeave = () => {
    if (reducedMotion) return
    setSurfaceStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      boxShadow: SHADOW_IDLE,
      transition:
        'box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    })
  }

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        ...surfaceStyle,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
