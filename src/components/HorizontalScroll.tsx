import { type ReactNode } from 'react'
import { useScroll } from '../context/ScrollContext'

export default function HorizontalScroll({ children }: { children: ReactNode }) {
  const { currentSection, transitionMs } = useScroll()

  return (
    <div className="horizontal-scroll-viewport">
      <div
        className="horizontal-scroll-track"
        style={{
          transform: `translateX(-${currentSection * 100}vw)`,
          transition: `transform ${transitionMs}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
