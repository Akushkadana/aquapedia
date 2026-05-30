import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useAnimals'
import { ZONE_COLORS } from '../utils/constants'

export default function AnimalCard({ animal, style }) {
  const { toggle, isFavorite } = useFavorites()
  const fav = isFavorite(animal.id)
  const zoneColor = ZONE_COLORS[animal.zone] || '#06b6d4'

  return (
    <div className="glass animal-card" style={{
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      {/* Zone accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: `linear-gradient(90deg, transparent, ${zoneColor}, transparent)`,
      }} />

      {/* Favorite button */}
      <button
        onClick={(e) => { e.preventDefault(); toggle(animal.id) }}
        style={{
          position: 'absolute', top: 14, right: 14,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '1.2rem', transition: 'transform 0.2s',
          filter: fav ? 'none' : 'grayscale(1) opacity(0.5)',
        }}
        title={fav ? 'Убрать из избранного' : 'В избранное'}
      >⭐</button>

      {/* Emoji */}
      <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
        {animal.emoji}
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        color: 'var(--foam)',
        marginBottom: '0.25rem',
        lineHeight: 1.3,
      }}>{animal.name}</h3>

      <p style={{
        fontStyle: 'italic', fontSize: '0.8rem',
        color: 'var(--azure)', marginBottom: '0.75rem',
      }}>{animal.latinName}</p>

      <p style={{
        fontSize: '0.85rem', color: 'rgba(165,243,252,0.7)',
        lineHeight: 1.5, marginBottom: '1rem',
        display: '-webkit-box', WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{animal.description}</p>

      {/* Tags row */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span className="badge" style={{
          background: `${zoneColor}20`,
          color: zoneColor,
          border: `1px solid ${zoneColor}40`,
        }}>{animal.zoneName}</span>
        <span className="badge" style={{
          background: 'rgba(6,182,212,0.15)',
          color: 'var(--cyan)',
          border: '1px solid rgba(6,182,212,0.3)',
        }}>{animal.class}</span>
      </div>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1rem' }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: animal.statusColor || '#6b7280',
          flexShrink: 0,
        }} />
        <span style={{ fontSize: '0.75rem', color: 'rgba(165,243,252,0.6)' }}>
          {animal.status}
        </span>
      </div>

      <Link to={`/animal/${animal.id}`} style={{
        display: 'block', textAlign: 'center',
        padding: '8px', borderRadius: 8,
        background: 'linear-gradient(135deg, rgba(14,116,144,0.4), rgba(6,182,212,0.2))',
        border: '1px solid rgba(6,182,212,0.3)',
        color: 'var(--cyan)', textDecoration: 'none',
        fontSize: '0.875rem', fontWeight: 600,
        transition: 'all 0.2s',
      }}>Подробнее →</Link>
    </div>
  )
}
