import { createContext, useContext, type ReactNode } from 'react'
import { useHorizontalScroll } from '../hooks/useHorizontalScroll'

type ScrollContextType = ReturnType<typeof useHorizontalScroll>

const ScrollContext = createContext<ScrollContextType | null>(null)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scroll = useHorizontalScroll()
  return <ScrollContext.Provider value={scroll}>{children}</ScrollContext.Provider>
}

export function useScroll() {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useScroll must be used within ScrollProvider')
  return ctx
}
