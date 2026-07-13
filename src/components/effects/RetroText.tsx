interface RetroTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'span'
  className?: string
  variant?: 'default' | 'accent' | 'yellow'
}

export default function RetroText({
  text,
  as: Tag = 'span',
  className = '',
  variant = 'default',
}: RetroTextProps) {
  return (
    <Tag className={`retro-text retro-text--${variant} ${className}`}>
      <span className="retro-layer retro-layer-pink" aria-hidden="true">
        {text}
      </span>
      <span className="retro-layer retro-layer-green" aria-hidden="true">
        {text}
      </span>
      <span className="retro-layer retro-layer-yellow" aria-hidden="true">
        {text}
      </span>
      <span className="retro-main">{text}</span>
    </Tag>
  )
}
