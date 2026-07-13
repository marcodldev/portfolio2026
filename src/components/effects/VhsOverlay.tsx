import { useEffect, useRef, useState } from 'react'

function scheduleGlitch(
  onGlitch: () => void,
  timers: ReturnType<typeof setTimeout>[],
) {
  const delay = 8000 + Math.random() * 7000
  const id = setTimeout(() => {
    onGlitch()
    scheduleGlitch(onGlitch, timers)
  }, delay)
  timers.push(id)
}

export default function VhsOverlay() {
  const [isGlitching, setIsGlitching] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const screen = document.querySelector('.vhs-screen')

    const triggerGlitch = () => {
      const duration = 260 + Math.random() * 140
      setIsGlitching(true)
      screen?.classList.add('vhs-glitching')

      const endId = setTimeout(() => {
        setIsGlitching(false)
        screen?.classList.remove('vhs-glitching')
      }, duration)
      timersRef.current.push(endId)
    }

    scheduleGlitch(triggerGlitch, timersRef.current)

    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
      screen?.classList.remove('vhs-glitching')
    }
  }, [])

  return (
    <div className="vhs-overlay" aria-hidden="true">
      <div className="vhs-overlay-flicker" />
      <div className="vhs-overlay-scanlines" />
      <div className="vhs-overlay-noise" />
      <div className="vhs-overlay-vignette" />
      <div className="vhs-overlay-tracking" />
      <div className={`vhs-overlay-glitch ${isGlitching ? 'is-active' : ''}`}>
        <div className="vhs-glitch-slice vhs-glitch-slice--1" />
        <div className="vhs-glitch-slice vhs-glitch-slice--2" />
        <div className="vhs-glitch-chroma vhs-glitch-chroma--r" />
        <div className="vhs-glitch-chroma vhs-glitch-chroma--b" />
      </div>
    </div>
  )
}
