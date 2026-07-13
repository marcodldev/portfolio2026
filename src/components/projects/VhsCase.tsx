import type { ReactNode } from 'react'

interface VhsCaseProps {
  children: ReactNode
  expanded?: boolean
  className?: string
}

export default function VhsCase({ children, expanded, className = '' }: VhsCaseProps) {
  return (
    <div className={`vhs-case ${expanded ? 'vhs-case--expanded' : ''} ${className}`.trim()}>
      <span className="vhs-case-band vhs-case-band--top" aria-hidden="true">
        <span className="vhs-case-window vhs-case-window--left">
          <span className="vhs-case-reel" />
        </span>
        <span className="vhs-case-window vhs-case-window--right">
          <span className="vhs-case-reel" />
        </span>
      </span>
      <div className="vhs-case-body">{children}</div>
      <span className="vhs-case-band vhs-case-band--bottom" aria-hidden="true">
        <span className="vhs-case-window vhs-case-window--left">
          <span className="vhs-case-reel" />
        </span>
        <span className="vhs-case-window vhs-case-window--right">
          <span className="vhs-case-reel" />
        </span>
      </span>
    </div>
  )
}
