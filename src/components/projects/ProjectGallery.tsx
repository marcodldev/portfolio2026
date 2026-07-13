import { useState } from 'react'
import { PROJECTS, type Project } from '../../data/projects'
import ProjectLightbox from './ProjectLightbox'
import VhsCase from './VhsCase'

function VhsProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      className="vhs-case-btn"
      onClick={onOpen}
      aria-label={`Apri screenshot ${project.title}`}
    >
      <VhsCase>
        <img
          src={project.image}
          alt=""
          className="vhs-case-image"
          loading="lazy"
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
      <p className="videoteca-room-label">VIDEOTECA · SCREENSHOT</p>
      <div className="projects-gallery" role="list" aria-label="Progetti web">
        {PROJECTS.map((project) => (
          <VhsProjectCard
            key={project.id}
            project={project}
            onOpen={() => setActive(project)}
          />
        ))}
      </div>
      <ProjectLightbox project={active} onClose={() => setActive(null)} />
    </div>
  )
}
