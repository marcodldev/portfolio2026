import { useCallback, useEffect, useRef, useState } from 'react'

export const SECTION_COUNT = 4

export const SECTION_IDS = ['home', 'about', 'projects', 'contact'] as const

export const TAPE_LABELS = ['TAPE_01', 'TAPE_02', 'TAPE_03', 'TAPE_04'] as const

export const TAPE_NAMES = ['HOME', 'ABOUT', 'PROJECTS', 'CONTACT'] as const

function getTimings() {
  const mobile = window.matchMedia('(max-width: 768px)').matches
  return {
    glitchMs: mobile ? 320 : 400,
    scrollCooldown: mobile ? 480 : 520,
    transitionMs: mobile ? 360 : 420,
  }
}

function canScrollVertically(target: EventTarget | null, deltaY: number): boolean {
  let node = target instanceof Element ? target : null
  while (node && node !== document.body) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowY === 'auto' || overflowY === 'scroll') {
      const el = node as HTMLElement
      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll > 1) {
        if (deltaY > 0 && el.scrollTop < maxScroll - 1) return true
        if (deltaY < 0 && el.scrollTop > 1) return true
      }
    }
    node = node.parentElement
  }
  return false
}

export function useHorizontalScroll() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionTarget, setTransitionTarget] = useState(0)
  const [transitionMs, setTransitionMs] = useState(420)
  const isScrolling = useRef(false)
  const scrollLocked = useRef(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const currentRef = useRef(0)

  const setScrollLocked = useCallback((locked: boolean) => {
    scrollLocked.current = locked
  }, [])

  useEffect(() => {
    const sync = () => setTransitionMs(getTimings().transitionMs)
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  const goToSection = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(SECTION_COUNT - 1, index))
    if (clamped === currentRef.current || isScrolling.current) return

    const { glitchMs, scrollCooldown, transitionMs: tMs } = getTimings()
    setTransitionMs(tMs)

    isScrolling.current = true
    setTransitionTarget(clamped)
    setIsTransitioning(true)

    setTimeout(() => {
      currentRef.current = clamped
      setCurrentSection(clamped)
    }, glitchMs)

    setTimeout(() => {
      setIsTransitioning(false)
      isScrolling.current = false
    }, scrollCooldown)
  }, [])

  const goNext = useCallback(() => goToSection(currentRef.current + 1), [goToSection])
  const goPrev = useCallback(() => goToSection(currentRef.current - 1), [goToSection])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollLocked.current) {
        if (canScrollVertically(e.target, e.deltaY)) return
        e.preventDefault()
        return
      }
      if (canScrollVertically(e.target, e.deltaY)) return
      e.preventDefault()
      if (isScrolling.current) return
      if (Math.abs(e.deltaY) < 10) return
      if (e.deltaY > 0) goNext()
      else goPrev()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrollLocked.current) return
      if (isScrolling.current) return
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollLocked.current) return
      if (isScrolling.current) return
      const mobile = window.matchMedia('(max-width: 768px)').matches

      if (mobile) {
        const deltaX = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(deltaX) < 40) return
        if (deltaX > 0) goNext()
        else goPrev()
        return
      }

      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < 50) return
      if (deltaY > 0) goNext()
      else goPrev()
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goNext, goPrev])

  return {
    currentSection,
    goToSection,
    goNext,
    goPrev,
    isTransitioning,
    isBooting: isTransitioning,
    transitionTarget,
    transitionMs,
    sectionCount: SECTION_COUNT,
    tapeLabel: TAPE_LABELS[currentSection],
    tapeName: TAPE_NAMES[currentSection],
    setScrollLocked,
  }
}
