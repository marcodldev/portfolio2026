import { useLayoutEffect, useRef } from 'react'

interface DomCommentProps {
  text: string
}

/** Inserisce un commento HTML nel DOM (visibile in Inspector, non a schermo). */
export default function DomComment({ text }: DomCommentProps) {
  const anchorRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const anchor = anchorRef.current
    if (!anchor?.parentNode) return
    anchor.parentNode.insertBefore(document.createComment(`\n${text}\n`), anchor)
    anchor.remove()
  }, [text])

  return <span ref={anchorRef} />
}
