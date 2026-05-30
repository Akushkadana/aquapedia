export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass" style={{ padding: '1.5rem' }}>
          <div className="skeleton" style={{ height: 80, marginBottom: 16 }} />
          <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 14, width: '50%', marginBottom: 16 }} />
          <div className="skeleton" style={{ height: 60, marginBottom: 12 }} />
          <div className="skeleton" style={{ height: 36 }} />
        </div>
      ))}
    </div>
  )
}
