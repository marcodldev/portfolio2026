import { ScrollProvider } from './context/ScrollContext'
import TopNav from './components/layout/TopNav'
import VhsTapeTransition from './components/effects/VhsTapeTransition'
import RecHud from './components/effects/RecHud'
import VhsOverlay from './components/effects/VhsOverlay'
import HorizontalScroll from './components/HorizontalScroll'
import AmbientLayer from './components/AmbientLayer'
import VhsSynthScene from './components/effects/VhsSynthScene'
import Hero from './components/sections/Hero'
import AboutSkills from './components/sections/AboutSkills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <ScrollProvider>
      <div className="vhs-screen">
        <AmbientLayer />
        <VhsSynthScene />
        <TopNav />
        <RecHud />
        <HorizontalScroll>
          <Hero />
          <AboutSkills />
          <Projects />
          <Contact />
        </HorizontalScroll>
      </div>
      <VhsOverlay />
      <VhsTapeTransition />
    </ScrollProvider>
  )
}
