import { useCallback, useEffect, useRef, useState } from 'react'
import { TIMELINE_CHAPTERS } from '../../data/timeline'

const CYCLE_MS = 52_000

export default function VhsTimeline() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>(0)
  const lastTickRef = useRef<number>(0)

  const activeChapter = Math.min(
    TIMELINE_CHAPTERS.length - 1,
    Math.floor(progress * TIMELINE_CHAPTERS.length),
  )

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => !p)
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(rafRef.current)
      lastTickRef.current = 0
      return
    }

    const tick = (time: number) => {
      if (!lastTickRef.current) lastTickRef.current = time
      const delta = time - lastTickRef.current
      lastTickRef.current = time
      setProgress((p) => (p + delta / CYCLE_MS) % 1)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      lastTickRef.current = 0
    }
  }, [isPlaying])

  return (
    <div
      className={`vhs-timeline ${isPlaying ? 'is-playing' : ''}`}
      aria-label="Percorso professionale"
    >
      <div className="vhs-timeline-header">
        <button
          type="button"
          className="vhs-timeline-play"
          onClick={togglePlay}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pausa timeline' : 'Avvia timeline'}
        >
          {isPlaying ? 'PAUSE ⏸' : 'PLAY ▶'}
        </button>
      </div>

      <ol className="vhs-timeline-track">
        <span
          className="vhs-playhead"
          style={{ '--playhead': `${progress * 100}%` } as React.CSSProperties}
          aria-hidden="true"
        />
        {TIMELINE_CHAPTERS.map((chapter, i) => (
          <li
            key={chapter.title}
            className={`vhs-chapter ${isPlaying && i === activeChapter ? 'is-active' : ''}`}
          >
            <span className="vhs-chapter-time">{chapter.time}</span>
            {i > 0 && <span className="vhs-chapter-sep" aria-hidden="true" />}
            <h3 className="vhs-chapter-title">{chapter.title}</h3>
            <p className="vhs-chapter-desc">{chapter.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
