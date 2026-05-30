import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAnimal } from '../redux/slices/animalsSlice'
import { useFavorites } from '../hooks/useAnimals'
import { ZONE_COLORS } from '../utils/constants'
import BubbleBackground from '../components/BubbleBackground'

export default function AnimalDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const animal = useSelector(s => s.animals.list.find(a => a.id === Number(id)))
  const { toggle, isFavorite } = useFavorites()

  if (!animal) {
    return (
      <div className="ocean-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem' }}>🔭</div>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foam)', margin: '1rem 0' }}>
            Животное не найдено
          </h2>
          <Link to="/catalog" className="btn-ocean" style={{ textDecoration: 'none', display: 'inline-block' }}>
            ← В каталог
          </Link>
        </div>
      </div>
    )
  }

  const zoneColor = ZONE_COLORS[animal.zone] || '#06b6d4'
  const fav = isFavorite(animal.id)

  const handleDelete = () => {
    if (window.confirm(`Удалить "${animal.name}"?`)) {
      dispatch(deleteAnimal(animal.id))
      navigate('/catalog')
    }
  }

  const stats = [
    { label: 'Размер', value: animal.size, icon: '📏' },
    { label: 'Вес', value: animal.weight, icon: '⚖️' },
    { label: 'Глубина', value: animal.depth, icon: '🌊' },
    { label: 'Продолжительность жизни', value: animal.lifespan, icon: '⏳' },
    { label: 'Питание', value: animal.diet, icon: '🍽️' },
    { label: 'Обитание', value: animal.habitat, icon: '🗺️' },
  ]

  return (
    <div className="ocean-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <BubbleBackground />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--azure)', textDecoration: 'none', fontSize: '0.875rem' }}>Главная</Link>
          <span style={{ color: 'var(--azure)' }}>/</span>
          <Link to="/catalog" style={{ color: 'var(--azure)', textDecoration: 'none', fontSize: '0.875rem' }}>Каталог</Link>
          <span style={{ color: 'var(--azure)' }}>/</span>
          <span style={{ color: 'var(--foam)', fontSize: '0.875rem' }}>{animal.name}</span>
        </div>

        {/* Main card */}
        <div className="glass" style={{ padding: '2.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 4,
            background: `linear-gradient(90deg, transparent, ${zoneColor}, transparent)`,
          }} />

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Emoji big */}
            <div style={{
              fontSize: '6rem', textAlign: 'center',
              flexShrink: 0, width: 140,
              filter: 'drop-shadow(0 0 30px rgba(6,182,212,0.4))',
            }} className="animate-float">{animal.emoji}</div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <span className="badge" style={{
                  background: `${zoneColor}20`, color: zoneColor, border: `1px solid ${zoneColor}40`,
                }}>{animal.zoneName}</span>
                <span className="badge" style={{
                  background: 'rgba(6,182,212,0.15)', color: 'var(--cyan)', border: '1px solid rgba(6,182,212,0.3)',
                }}>{animal.class}</span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem', color: 'var(--foam)', marginBottom: '0.25rem',
              }}>{animal.name}</h1>
              <p style={{ fontStyle: 'italic', color: 'var(--azure)', marginBottom: '1rem' }}>
                {animal.latinName}
              </p>

              {/* Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: animal.statusColor, flexShrink: 0 }} />
                <span style={{ color: animal.statusColor, fontSize: '0.9rem', fontWeight: 500 }}>
                  {animal.status}
                </span>
              </div>

              <p style={{ color: 'rgba(165,243,252,0.8)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1.5rem' }}>
                {animal.description}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn-ocean" onClick={() => toggle(animal.id)}>
                  {fav ? '⭐ В избранном' : '☆ В избранное'}
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#f87171', borderRadius: 8,
                    padding: '10px 16px', cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}
                >🗑️ Удалить</button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem', marginBottom: '1.5rem',
        }}>
          {stats.map((s, i) => (
            <div key={i} className="glass" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span>{s.icon}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--azure)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {s.label}
                </span>
              </div>
              <div style={{ color: 'var(--foam)', fontWeight: 600 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Fun fact */}
        <div className="glass glow-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cyan)', marginBottom: '0.75rem' }}>
            🧠 Интересный факт
          </h3>
          <p style={{ color: 'rgba(165,243,252,0.8)', lineHeight: 1.7, fontStyle: 'italic' }}>
            {animal.funFact}
          </p>
        </div>

        {/* Tags */}
        {animal.tags && (
          <div className="glass" style={{ padding: '1rem 1.5rem' }}>
            <span style={{ color: 'var(--azure)', fontSize: '0.875rem', marginRight: '0.75rem' }}>Теги:</span>
            {animal.tags.map(tag => (
              <span key={tag} className="badge" style={{
                background: 'rgba(6,182,212,0.1)',
                color: 'var(--glow)', border: '1px solid rgba(6,182,212,0.2)',
                marginRight: '0.5rem',
              }}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/catalog" className="btn-ghost" style={{ textDecoration: 'none' }}>← Назад к каталогу</Link>
        </div>
      </div>
    </div>
  )
}
