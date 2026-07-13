import { useScroll } from '../../context/ScrollContext'

export default function VhsTapeTransition() {
  const { isTransitioning } = useScroll()

  if (!isTransitioning) return null

  return (
    <div className="vhs-tape-transition" aria-hidden="true">
      <div className="vhs-tape-transition-glitch" />
      <div className="vhs-tape-transition-bands">
        <span className="vhs-band vhs-band--pink" />
        <span className="vhs-band vhs-band--red" />
        <span className="vhs-band vhs-band--orange" />
      </div>
    </div>
  )
}
