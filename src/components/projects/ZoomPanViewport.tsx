import { useCallback, useEffect, useRef, useState } from 'react'

interface ZoomPanViewportProps {
  src: string
  alt: string
}

const MIN_SCALE = 1
const MAX_SCALE = 4

export default function ZoomPanViewport({ src, alt }: ZoomPanViewportProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null)

  const clampOffset = useCallback((nextScale: number, nextOffset: { x: number; y: number }) => {
    const el = viewportRef.current
    if (!el || nextScale <= 1) return { x: 0, y: 0 }

    const maxX = (el.clientWidth * (nextScale - 1)) / 2
    const maxY = (el.clientHeight * (nextScale - 1)) / 2

    return {
      x: Math.max(-maxX, Math.min(maxX, nextOffset.x)),
      y: Math.max(-maxY, Math.min(maxY, nextOffset.y)),
    }
  }, [])

  const reset = useCallback(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    reset()
  }, [src, reset])

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.15 : 0.15
    setScale((prev) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta))
      setOffset((o) => clampOffset(next, o))
      return next
    })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.x
    const dy = e.clientY - dragRef.current.y
    setOffset(clampOffset(scale, {
      x: dragRef.current.ox + dx,
      y: dragRef.current.oy + dy,
    }))
  }

  const onPointerUp = () => {
    dragRef.current = null
  }

  const zoomIn = () => {
    setScale((prev) => {
      const next = Math.min(MAX_SCALE, prev + 0.35)
      setOffset((o) => clampOffset(next, o))
      return next
    })
  }

  const zoomOut = () => {
    setScale((prev) => {
      const next = Math.max(MIN_SCALE, prev - 0.35)
      setOffset((o) => clampOffset(next, o))
      return next
    })
  }

  return (
    <div className="zoom-pan-wrap">
      <div className="zoom-pan-toolbar">
        <button type="button" onClick={zoomOut} aria-label="Riduci zoom" disabled={scale <= MIN_SCALE}>
          −
        </button>
        <span className="zoom-pan-level">{Math.round(scale * 100)}%</span>
        <button type="button" onClick={zoomIn} aria-label="Aumenta zoom" disabled={scale >= MAX_SCALE}>
          +
        </button>
        <button type="button" data-action="reset" onClick={reset} aria-label="Reimposta zoom" disabled={scale === 1 && offset.x === 0}>
          Reset
        </button>
      </div>
      <div
        ref={viewportRef}
        className={`zoom-pan-viewport ${scale > 1 ? 'zoom-pan-viewport--active' : ''}`}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={src}
          alt={alt}
          className="zoom-pan-image"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          }}
          draggable={false}
        />
      </div>
      <p className="zoom-pan-hint">Rotella per zoom · trascina per spostare</p>
    </div>
  )
}
