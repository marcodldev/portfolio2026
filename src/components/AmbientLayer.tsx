import { useScroll } from '../context/ScrollContext'

const SECTIONS = ['hero', 'about', 'projects', 'contact'] as const

export default function AmbientLayer() {
  const { currentSection } = useScroll()

  return (
    <div
      className="ambient-layer"
      data-section={SECTIONS[currentSection]}
      aria-hidden="true"
    />
  )
}
