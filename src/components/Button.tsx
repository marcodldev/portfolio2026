import { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'ghost'
}

export default function Button({ children, onClick, href, variant = 'primary' }: ButtonProps) {
  const className = `btn btn-${variant}`

  const content = (
    <>
      <span>{children}</span>
      <svg className="btn-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </>
  )

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return (
    <button className={className} onClick={onClick} type="button">
      {content}
    </button>
  )
}
