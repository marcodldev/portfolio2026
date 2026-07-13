import type { Skill } from '../../data/skills'
import { JAVA_LOGO_PATHS, SKILL_LOGOS } from '../../data/skillLogos'

function JavaLogo() {
  const [cup, rim, ...steam] = JAVA_LOGO_PATHS
  return (
    <>
      <path d={cup} fill="currentColor" />
      <path d={rim} fill="currentColor" />
      {steam.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      ))}
    </>
  )
}

export default function SkillIcon({ skill }: { skill: Skill }) {
  const logo = SKILL_LOGOS[skill.id]
  const paths = logo ? (Array.isArray(logo) ? logo : [logo]) : []

  return (
    <div className="skill-icon">
      <div className="skill-icon-box">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
          aria-label={skill.name}
        >
          {skill.id === 'java' ? (
            <JavaLogo />
          ) : (
            paths.map((d) => (
              <path key={d.slice(0, 16)} d={d} fill="currentColor" />
            ))
          )}
        </svg>
      </div>
      <span className="skill-icon-name">{skill.name}</span>
    </div>
  )
}
