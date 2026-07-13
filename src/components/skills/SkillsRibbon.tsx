import { SKILLS } from '../../data/skills'
import SkillIcon from './SkillIcon'

export default function SkillsRibbon() {
  return (
    <div className="skills-ribbon">
      <div className="skills-ribbon-header">
        <span className="vhs-label">▶ TECH_STACK</span>
      </div>
      <div className="skills-ribbon-scroll">
        <div className="skills-ribbon-track skills-ribbon-track--marquee">
          {SKILLS.map((skill) => (
            <SkillIcon key={skill.id} skill={skill} />
          ))}
          {SKILLS.map((skill) => (
            <SkillIcon key={`${skill.id}-dup`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  )
}
