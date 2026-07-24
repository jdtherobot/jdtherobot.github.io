import { useState, type FormEvent } from 'react'
import Button from './Button'
import type { ProjectFlag } from '../content/projects'

/* FlagCheck — minimalist CTF flag submission. Paste a Flag{…}, it is hashed
   locally (SHA-256 via crypto.subtle) and compared against the known digests;
   solved challenges persist per-browser in localStorage. No network round-trip,
   and no plaintext flags beyond what the writeups already print. */

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function loadSolved(key: string): string[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

type Props = { flags: ProjectFlag[]; storageKey: string }

export default function FlagCheck({ flags, storageKey }: Props) {
  const key = `flag-check:${storageKey}`
  const [solved, setSolved] = useState<string[]>(() => loadSolved(key))
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const flag = value.trim()
    if (!flag) return
    if (!('crypto' in window) || !crypto.subtle) {
      setStatus({ ok: false, text: 'Flag checking needs a secure (https) context.' })
      return
    }
    const digest = await sha256Hex(flag)
    const hit = flags.find((f) => f.sha256 === digest)
    if (!hit) {
      setStatus({ ok: false, text: 'Not a flag we recognize — check case, spaces, and symbols.' })
      return
    }
    const next = solved.includes(hit.id) ? solved : [...solved, hit.id]
    setSolved(next)
    try {
      localStorage.setItem(key, JSON.stringify(next))
    } catch {
      /* private browsing — the ✓ still shows for this visit */
    }
    setValue('')
    setStatus({ ok: true, text: `✓ ${hit.label} — solved` })
  }

  return (
    <div style={{ border: '1px solid var(--edge)', padding: '16px 18px', marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 12 }}>
        <div className="ey">Flag check · {solved.length}/{flags.length}</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {flags.map((f) => {
            const done = solved.includes(f.id)
            return (
              <span
                key={f.id}
                className="stencil"
                style={{ fontSize: 11, opacity: done ? 1 : 0.55, color: done ? 'var(--gold)' : undefined }}
              >
                {done ? '✓' : '·'} {f.label}
              </span>
            )
          })}
        </div>
      </div>
      <form onSubmit={submit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (status) setStatus(null)
          }}
          placeholder="Flag{…}"
          aria-label="Submit a flag"
          spellCheck={false}
          style={{
            flex: '1 1 220px',
            minWidth: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-btn)',
            letterSpacing: 'var(--ls-btn)',
            color: 'var(--text)',
            background: 'transparent',
            border: '1px solid var(--edge)',
            borderRadius: 'var(--radius)',
            padding: '11px 12px',
          }}
        />
        <Button type="submit" variant="outline">
          Check
        </Button>
      </form>
      {status && (
        <p
          className="stencil"
          role="status"
          style={{ fontSize: 12, margin: '10px 0 0', color: status.ok ? 'var(--gold)' : undefined, opacity: status.ok ? 1 : 0.7 }}
        >
          {status.text}
        </p>
      )}
    </div>
  )
}
