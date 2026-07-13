import { assetUrl } from '../utils/assetUrl'

export interface Project {
  id: string
  title: string
  label: string
  shortDescription: string
  stack: string[]
  image: string
  imageFull: string
  github?: string
  demo?: string
}

interface ProjectSource {
  id: string
  title: string
  label: string
  shortDescription: string
  stack: string[]
  image: string
  github?: string
  demo?: string
}

function toWebpPaths(src: string) {
  const normalized = src.replace(/^\//, '')
  const dot = normalized.lastIndexOf('.')
  const withoutExt = dot === -1 ? normalized : normalized.slice(0, dot)
  const slash = withoutExt.lastIndexOf('/')
  const dir = slash === -1 ? '' : withoutExt.slice(0, slash)
  const name = slash === -1 ? withoutExt : withoutExt.slice(slash + 1)
  const prefix = dir ? `${dir}/` : ''

  return {
    thumb: `${prefix}thumbs/${name}.webp`,
    full: `${prefix}full/${name}.webp`,
  }
}

const PROJECTS_DATA: ProjectSource[] = [
  {
    id: 'vestifacile',
    title: 'VestiFacile',
    label: 'VestiFacile',
    shortDescription:
      'Porting del gestionale legacy CAT S.r.l. per negozi di abbigliamento: da PHP a modulo Odoo in Python.',
    stack: ['Python', 'Odoo', 'PostgreSQL', 'PHP'],
    image: 'projects/vestifacile.png',
  },
  {
    id: 'gateway-sdi',
    title: 'Gateway SDI',
    label: 'Gateway SDI',
    shortDescription:
      'Dashboard gestionale per canale accreditato verso il Sistema di Interscambio dell\'Agenzia delle Entrate.',
    stack: ['Python', 'PostgreSQL', 'REST API'],
    image: 'projects/gateway-sdi.jpg',
  },
  {
    id: 'spotify-web',
    title: 'Spotify Web App',
    label: 'Spotify',
    shortDescription:
      'Riproduzione della celebre piattaforma musicale in forma di web app.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: 'pagineweb/0.jpg',
  },
  {
    id: 'hover-gallery',
    title: 'Hover Gallery',
    label: 'Hover Gallery',
    shortDescription:
      'Sito con immagini dinamiche al passaggio del cursore e navbar fissa.',
    stack: ['HTML', 'CSS'],
    image: 'pagineweb/1.jpg',
  },
  {
    id: 'bootstrap-dashboard',
    title: 'Bootstrap Dashboard',
    label: 'Dashboard',
    shortDescription:
      'Dashboard con Bootstrap e componenti dinamici interattivi.',
    stack: ['HTML', 'CSS', 'Bootstrap'],
    image: 'pagineweb/2.jpg',
  },
  {
    id: 'bootstrap-mockup',
    title: 'Bootstrap Mockup',
    label: 'Mockup',
    shortDescription: 'Primo mockup responsive realizzato con Bootstrap.',
    stack: ['HTML', 'CSS', 'Bootstrap'],
    image: 'pagineweb/3.jpg',
  },
  {
    id: 'discord-clone',
    title: 'Discord Clone',
    label: 'Discord',
    shortDescription:
      'Riproduzione di una vecchia pagina Discord con HTML e CSS.',
    stack: ['HTML', 'CSS'],
    image: 'pagineweb/4.jpg',
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    label: 'Landing',
    shortDescription: 'Landing page statica realizzata con HTML e CSS.',
    stack: ['HTML', 'CSS'],
    image: 'pagineweb/5.jpg',
  },
  {
    id: 'dropbox-clone',
    title: 'Dropbox Clone',
    label: 'Dropbox',
    shortDescription:
      'Riproduzione della vecchia home Dropbox con HTML e CSS.',
    stack: ['HTML', 'CSS'],
    image: 'pagineweb/6.jpg',
  },
  {
    id: 'netflix-vue',
    title: 'Netflix Clone',
    label: 'Netflix',
    shortDescription:
      'Clone Netflix con contenuti da API, realizzato in Vue.js.',
    stack: ['Vue.js', 'JavaScript', 'API'],
    image: 'pagineweb/7.jpg',
  },
  {
    id: 'dc-comics',
    title: 'DC Comics',
    label: 'DC Comics',
    shortDescription: 'Riproduzione di una pagina DC Comics.',
    stack: ['HTML', 'CSS'],
    image: 'pagineweb/8.jpg',
  },
  {
    id: 'ristorante-x',
    title: 'Ristorante X',
    label: 'Ristorante X',
    shortDescription:
      'Home page per ristorante con Vue.js e navbar funzionante.',
    stack: ['Vue.js', 'JavaScript'],
    image: 'pagineweb/9.jpg',
  },
  {
    id: 'whatsapp-web',
    title: 'WhatsApp Web',
    label: 'WhatsApp',
    shortDescription:
      'Clone WhatsApp Web: filtro ricerca, chat selezionabili e risposta automatica.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    image: 'pagineweb/10.jpg',
  },
]

export const PROJECTS: Project[] = PROJECTS_DATA.map((project) => {
  const { thumb, full } = toWebpPaths(project.image)
  return {
    ...project,
    image: assetUrl(thumb),
    imageFull: assetUrl(full),
  }
})
