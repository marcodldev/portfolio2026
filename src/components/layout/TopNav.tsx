import { useEffect, useState } from 'react'
import { useScroll } from '../../context/ScrollContext'
import { RESUME_DOWNLOAD_NAME, RESUME_URL } from '../../data/resume'
import BrandLogo from './BrandLogo'

const NAV = [
  { label: 'HOME', index: 0 },
  { label: 'ABOUT', index: 1 },
  { label: 'PROJECTS', index: 2 },
  { label: 'CONTACT', index: 3 },
]

export default function TopNav() {
  const { currentSection, goToSection, isBooting, setScrollLocked } = useScroll()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setScrollLocked(menuOpen)
    return () => setScrollLocked(false)
  }, [menuOpen, setScrollLocked])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [currentSection])

  const handleNav = (index: number) => {
    goToSection(index)
    setMenuOpen(false)
  }

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <button
          className="top-nav-brand"
          onClick={() => handleNav(0)}
          disabled={isBooting}
          type="button"
          aria-label="Marco De Lisi — Home"
        >
          <BrandLogo />
        </button>

        <nav className="top-nav-links top-nav-links--desktop" aria-label="Navigazione sezioni">
          {NAV.map(({ label, index }) => (
            <button
              key={label}
              className={`top-nav-link ${currentSection === index ? 'active' : ''}`}
              onClick={() => handleNav(index)}
              disabled={isBooting}
              type="button"
            >
              {label}
            </button>
          ))}
        </nav>

        <a
          className="top-nav-resume top-nav-resume--desktop"
          href={RESUME_URL}
          download={RESUME_DOWNLOAD_NAME}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="top-nav-resume-text">VIEW RESUME</span>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>

        <button
          type="button"
          className={`top-nav-toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
          aria-controls="top-nav-mobile-menu"
        >
          <span className="top-nav-toggle-bar" />
          <span className="top-nav-toggle-bar" />
          <span className="top-nav-toggle-bar" />
        </button>
      </div>

      <div
        id="top-nav-mobile-menu"
        className={`top-nav-mobile ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="top-nav-mobile-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Chiudi menu"
          tabIndex={menuOpen ? 0 : -1}
        />
        <nav className="top-nav-mobile-panel" aria-label="Menu mobile">
          <p className="top-nav-mobile-label">▶ MENU</p>
          {NAV.map(({ label, index }) => (
            <button
              key={label}
              type="button"
              className={`top-nav-mobile-link ${currentSection === index ? 'active' : ''}`}
              onClick={() => handleNav(index)}
              disabled={isBooting}
              tabIndex={menuOpen ? 0 : -1}
            >
              {label}
            </button>
          ))}
          <a
            className="top-nav-mobile-resume"
            href={RESUME_URL}
            download={RESUME_DOWNLOAD_NAME}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            VIEW RESUME
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  )
}
