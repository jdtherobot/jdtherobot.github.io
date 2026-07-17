import Button from './Button'
import { PRIMARY_LINKS } from '../content/links'

/* The four primary exits (Résumé / GitHub / LinkedIn / Email), repeated in the
   Hero and Contact sections. Résumé is gold-primary; the rest are outline. */

export default function PrimaryExits() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {PRIMARY_LINKS.map((l) => (
        <Button
          key={l.label}
          href={l.href}
          variant={l.variant}
          {...(l.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        >
          {l.label} {l.arrow}
        </Button>
      ))}
    </div>
  )
}
