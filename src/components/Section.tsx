interface SectionProps {
  number: string
  index: number
  children: React.ReactNode
  className?: string
}

export default function Section({ number, index, children, className = '' }: SectionProps) {
  return (
    <section className={`section ${className}`} data-index={index}>
      <span className="section-number">{number}</span>
      <div className="section-content">{children}</div>
    </section>
  )
}
