import { useEffect, useState } from 'react'
import { useScroll } from '../../context/ScrollContext'
import { TAPE_LABELS, TAPE_NAMES } from '../../hooks/useHorizontalScroll'

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function RecHud() {
  const { currentSection } = useScroll()
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setSeconds(0)
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [currentSection])

  return (
    <div className="rec-hud" aria-live="polite" aria-label={`Registrazione ${TAPE_NAMES[currentSection]}`}>
      <span className="rec-hud-dot" aria-hidden="true">●</span>
      <span className="rec-hud-rec">REC</span>
      <span className="rec-hud-time">{formatTime(seconds)}</span>
      <span className="rec-hud-tape">{TAPE_LABELS[currentSection]}</span>
    </div>
  )
}
