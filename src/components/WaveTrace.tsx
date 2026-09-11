import type { CSSProperties } from 'react'

/* WaveTrace / MarkSpike — the shared signature motif: a neural waveform.
   Canonical geometry, recoloured never redrawn. */

const POINTS =
  '0,20 40,20 48,6 56,34 64,20 120,20 128,10 136,20 180,20 188,4 196,36 204,20 280,20'

type WaveProps = {
  color?: string
  width?: number | string
  strokeWidth?: number
  title?: string
  style?: CSSProperties
}

export function WaveTrace({
  color = 'var(--gold)',
  width = 280,
  strokeWidth = 2,
  title = 'Neural waveform trace',
  style = {},
}: WaveProps) {
  const w = typeof width === 'number' ? `${width}px` : width
  return (
    <svg
      viewBox="0 0 280 40"
      width={w}
      role="img"
      aria-label={title}
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      <polyline
        points={POINTS}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type MarkProps = {
  color?: string
  size?: number
  strokeWidth?: number
  style?: CSSProperties
  /* Ambient signal pulse (the nav trigger only): a second copy of the trace
     with pathLength=1 rides over the base one; CSS (.mark-pulse in global.css)
     sweeps a lit dash along it. The geometry is never touched. */
  pulse?: boolean
}

const SPIKE_POINTS = '2,16 10,16 13,5 17,27 20,16 30,16'

export function MarkSpike({
  color = 'var(--gold)',
  size = 32,
  strokeWidth = 2.6,
  style = {},
  pulse = false,
}: MarkProps) {
  const stroke = {
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label="JD Britt mark"
      className={pulse ? 'mark-spike is-pulsing' : 'mark-spike'}
      style={{ display: 'block', ...style }}
    >
      <polyline className="mark-base" points={SPIKE_POINTS} {...stroke} />
      {pulse && <polyline className="mark-pulse" points={SPIKE_POINTS} pathLength={1} {...stroke} />}
    </svg>
  )
}
