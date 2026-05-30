export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="glass" style={{
      padding: '2rem', textAlign: 'center', maxWidth: 500, margin: '2rem auto',
      border: '1px solid rgba(239,68,68,0.3)',
      background: 'rgba(239,68,68,0.05)',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
      <h3 style={{ color: '#f87171', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
        Ошибка загрузки
      </h3>
      <p style={{ color: 'rgba(165,243,252,0.7)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        {message || 'Произошла неизвестная ошибка'}
      </p>
      {onRetry && (
        <button className="btn-ocean" onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  )
}
