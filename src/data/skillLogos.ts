import {
  siCursor,
  siGit,
  siJavascript,
  siLaravel,
  siOdoo,
  siPhp,
  siPostgresql,
  siSass,
  siSharp,
  siVuedotjs,
} from 'simple-icons'

/** Classic Java coffee cup — monocromatic, fill via currentColor */
export const JAVA_LOGO_PATHS = [
  'M8 11.5h8c.8 0 1.5.7 1.5 1.5v3.5c0 2.2-1.8 4-4 4s-4-1.8-4-4v-3.5c0-.8.7-1.5 1.5-1.5z',
  'M7 11.5h10v1.2H7z',
  'M9.2 9.2c.35-.9.9-1.3.9-1.3s.55.4.9 1.3',
  'M12 8.6c.35-.9.9-1.3.9-1.3s.55.4.9 1.3',
  'M14.8 9.2c.35-.9.9-1.3.9-1.3s.55.4.9 1.3',
]

export type SkillLogo = string | string[]

export const SKILL_LOGOS: Record<string, SkillLogo> = {
  php: siPhp.path,
  java: JAVA_LOGO_PATHS,
  js: siJavascript.path,
  laravel: siLaravel.path,
  vue: siVuedotjs.path,
  csharp: siSharp.path,
  postgresql: siPostgresql.path,
  odoo: siOdoo.path,
  git: siGit.path,
  sass: siSass.path,
  cursor: siCursor.path,
}
