import { useState } from 'react'
import { PROJECTS, type Project } from '../../data/projects'
import ProjectLightbox from './ProjectLightbox'
import VhsCase from './VhsCase'

function VhsProjectCard({
  project,
  onOpen,
  priority,
}: {
  project: Project
  onOpen: () => void
  priority: 'high' | 'low'
}) {
  return (
    <button
      type="button"
      className="vhs-case-btn"
      onClick={onOpen}
      aria-label={`Apri ${project.title}`}
    >
      <VhsCase>
        <img
          src={project.image}
          alt=""
          className="vhs-case-image"
          loading="lazy"
          decoding="async"
          fetchPriority={priority}
        />
        <span className="vhs-case-label">{project.label}</span>
      </VhsCase>
    </button>
  )
}

export default function ProjectGallery() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <div className="projects-gallery-wrap">
      <p className="videoteca-room-label">▶ VIDEOTECA · PROGETTI</p>
      <div className="projects-gallery" role="list" aria-label="Progetti web">
        {PROJECTS.map((project, index) => (
          <VhsProjectCard
            key={project.id}
            project={project}
            onOpen={() => setActive(project)}
            priority={index < 3 ? 'high' : 'low'}
          />
        ))}
      </div>
      <ProjectLightbox project={active} onClose={() => setActive(null)} />
    </div>
  )
}
