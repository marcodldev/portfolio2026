import type { CSSProperties } from 'react'
import { useScroll } from '../../context/ScrollContext'

const LETTERS = [
  { char: 'P', color: '#5efcff' },
  { char: 'R', color: '#ffe566' },
  { char: 'O', color: '#ff3b3b' },
  { char: 'G', color: '#ff44cc' },
  { char: 'E', color: '#5bff8f' },
  { char: 'T', color: '#5efcff' },
  { char: 'T', color: '#ffe566' },
  { char: 'I', color: '#5bff8f' },
] as const

const TRAIL_DEPTH = 12

function ExtrudeLetter({ char, color, index }: { char: string; color: string; index: number }) {
  return (
    <span
      className="extrude-letter"
      style={{ '--letter-color': color, '--letter-i': index } as CSSProperties}
    >
      {Array.from({ length: TRAIL_DEPTH }, (_, i) => (
        <span
          key={i}
          className="extrude-trail"
          style={{ '--d': i + 1 } as CSSProperties}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
      <span className="extrude-face">{char}</span>
    </span>
  )
}

export default function ProjectsExtrudeLogo() {
  const { currentSection } = useScroll()
  const isActive = currentSection === 2

  return (
    <h2 className={`extrude-logo ${isActive ? 'is-active' : ''}`} aria-label="PROGETTI">
      {LETTERS.map((letter, i) => (
        <ExtrudeLetter key={i} char={letter.char} color={letter.color} index={i} />
      ))}
    </h2>
  )
}
