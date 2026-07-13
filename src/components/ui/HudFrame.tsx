import type { ReactNode } from 'react'

interface HudFrameProps {
  children: ReactNode
  className?: string
  label?: string
}

export default function HudFrame({ children, className = '', label }: HudFrameProps) {
  return (
    <div className={`hud-frame ${className}`}>
      {label && <span className="hud-frame-label">{label}</span>}
      <span className="hud-corner hud-corner-tl" />
      <span className="hud-corner hud-corner-tr" />
      <span className="hud-corner hud-corner-bl" />
      <span className="hud-corner hud-corner-br" />
      {children}
    </div>
  )
}
