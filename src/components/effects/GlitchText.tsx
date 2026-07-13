import { useEffect, useState } from 'react'

interface GlitchTextProps {
  text: string
  as?: 'h1' | 'h2' | 'span'
  className?: string
  active?: boolean
}

export default function GlitchText({ text, as: Tag = 'span', className = '', active = true }: GlitchTextProps) {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    if (!active) return
    setGlitch(true)
    const t = setTimeout(() => setGlitch(false), 600)
    return () => clearTimeout(t)
  }, [active, text])

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 400)
    }, 8000)
    return () => clearInterval(interval)
  }, [active])

  return (
    <Tag className={`glitch-text ${glitch ? 'is-glitching' : ''} ${className}`} data-text={text}>
      {text}
    </Tag>
  )
}
