import Section from '../Section'
import Button from '../Button'
import { CONTACT_EMAIL } from '../../data/contact'
import { useScroll } from '../../context/ScrollContext'

const contacts = [
  { label: 'GitHub', value: 'github.com/marcodldev', href: 'https://github.com/marcodldev' },
  { label: 'LinkedIn', value: 'linkedin.com/in/marco-de-lisi', href: 'https://www.linkedin.com/in/marco-de-lisi-46b6861b3/' },
  { label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
]

export default function Contact() {
  const { currentSection } = useScroll()

  return (
    <Section number="04" index={3} className="contact">
      <div className={`contact-inner ${currentSection === 3 ? 'is-active' : ''}`}>
        <span className="vhs-label">▶ TAPE_04 · CONTACT</span>
        <h2 className="contact-headline section-title--serif">
          HAI UN&apos;IDEA? TRASFORMIAMOLA IN REALTÀ
        </h2>
        <p className="section-desc contact-desc">
          Web application, backend o software gestionale: se vuoi capire come dare
          forma al tuo progetto, parliamone insieme. Scrivimi — senza formalismi,
          con obiettivi chiari.
        </p>
        <div className="contact-row">
          <Button href={`mailto:${CONTACT_EMAIL}`}>INVIA EMAIL</Button>
          <div className="contact-links">
            {contacts.map((c) => (
              <a key={c.label} className="contact-item" href={c.href} target="_blank" rel="noopener noreferrer">
                <span className="contact-label">{c.label}</span>
                <span className="contact-value">{c.value}</span>
              </a>
            ))}
          </div>
        </div>
        <footer className="footer contact-footer">
          <span>© {new Date().getFullYear()} Marco De Lisi — Software Developer</span>
          <span className="footer-tag">Portfolio</span>
          <span>TAPE_04</span>
        </footer>
      </div>
    </Section>
  )
}
