import { useMemo } from 'react'

export default function BubbleBackground() {
  const bubbles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 20 + 5,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
  })), [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {bubbles.map(b => (
        <div key={b.id} style={{
          position: 'absolute',
          bottom: '-50px',
          left: `${b.left}%`,
          width: b.size,
          height: b.size,
          borderRadius: '50%',
          border: '1px solid rgba(6,182,212,0.3)',
          background: 'rgba(6,182,212,0.05)',
          animation: `bubble ${b.duration}s ${b.delay}s infinite linear`,
        }} />
      ))}
    </div>
  )
}
