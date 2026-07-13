import Section from '../Section'
import Button from '../Button'
import { useScroll } from '../../context/ScrollContext'

export default function Hero() {
  const { goToSection, currentSection } = useScroll()
  const isActive = currentSection === 0

  return (
    <Section number="01" index={0} className="hero">
      <div className={`hero-inner ${isActive ? 'is-active' : ''}`}>
        <div className="hero-text">
          <span className="vhs-label">▶ TAPE_01 · HOME</span>
          <h1 className="hero-title hero-title--serif">
            <span className="title-line">MARCO</span>
            <span className="title-line">DE LISI</span>
          </h1>
          <p className="hero-role">
            <span className="hero-blink">●</span>
            FULL STACK DEVELOPER · WEB APPLICATIONS
          </p>
          <p className="hero-desc">
            Full Stack Developer con esperienza su software gestionali, backend e
            integrazioni Odoo. Sviluppo web applications con PHP, Java e PostgreSQL,
            potenziato da strumenti AI per analisi, sviluppo e qualità del codice —
            dal concept al deploy in produzione.
          </p>
          <div className="hero-actions">
            <Button onClick={() => goToSection(2)}>VIEW PROJECTS</Button>
            <Button onClick={() => goToSection(3)} variant="ghost">CONTACT</Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
