import { useEffect } from 'react'
import { useScroll } from '../../context/ScrollContext'
import type { Project } from '../../data/projects'
import VhsCase from './VhsCase'
import ZoomPanViewport from './ZoomPanViewport'

interface ProjectLightboxProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  const { setScrollLocked } = useScroll()

  useEffect(() => {
    setScrollLocked(!!project)
    return () => setScrollLocked(false)
  }, [project, setScrollLocked])

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={project.title}>
      <button type="button" className="project-lightbox-backdrop" onClick={onClose} aria-label="Chiudi" />
      <div className="project-lightbox-panel">
        <button type="button" className="project-lightbox-close" onClick={onClose} aria-label="Chiudi">
          ✕
        </button>

        <VhsCase expanded>
          <ZoomPanViewport src={project.imageFull} alt={project.title} />
          <span className="vhs-case-label">{project.label}</span>
        </VhsCase>

        <div className="project-lightbox-info">
          <h3>{project.title}</h3>
          <p>{project.shortDescription}</p>
          <ul className="project-lightbox-stack">
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          {(project.github || project.demo) && (
            <div className="project-lightbox-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">Demo</a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
