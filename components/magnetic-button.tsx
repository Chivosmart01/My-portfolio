'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

type MagneticButtonProps = React.ComponentProps<'button'> & {
  strength?: number
}

export function MagneticButton({
  className,
  children,
  strength = 0.22,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const reducedMotion = usePrefersReducedMotion()

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion) return
    const btn = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setOffset({ x, y })
  }

  const handleLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        className,
        'transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform'
      )}
      style={{
        transform:
          reducedMotion || (offset.x === 0 && offset.y === 0)
            ? undefined
            : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </button>
  )
}
