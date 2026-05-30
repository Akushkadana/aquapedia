import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearFavorites } from '../redux/slices/favoritesSlice'
import { useFavorites } from '../hooks/useAnimals'
import AnimalCard from '../components/AnimalCard'
import BubbleBackground from '../components/BubbleBackground'

export default function FavoritesPage() {
  const dispatch = useDispatch()
  const { favoriteAnimals, favoriteIds } = useFavorites()

  return (
    <div className="ocean-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <BubbleBackground />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--foam)', marginBottom: '0.25rem' }}>
              ⭐ Избранное
            </h1>
            <p style={{ color: 'rgba(165,243,252,0.6)' }}>
              {favoriteIds.length} животных в коллекции
            </p>
          </div>
          {favoriteAnimals.length > 0 && (
            <button
              className="btn-ghost"
              onClick={() => { if (window.confirm('Очистить всё избранное?')) dispatch(clearFavorites()) }}
              style={{ borderColor: 'rgba(239,68,68,0.4)', color: '#f87171' }}
            >✕ Очистить всё</button>
          )}
        </div>

        {/* Empty state */}
        {favoriteAnimals.length === 0 && (
          <div className="glass" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🌊</div>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foam)', marginBottom: '1rem' }}>
              Коллекция пуста
            </h2>
            <p style={{ color: 'rgba(165,243,252,0.6)', marginBottom: '2rem' }}>
              Добавляйте понравившихся животных в избранное, нажимая ⭐ на карточке
            </p>
            <Link to="/catalog" className="btn-ocean" style={{ textDecoration: 'none' }}>
              Перейти в каталог
            </Link>
          </div>
        )}

        {/* Grid */}
        {favoriteAnimals.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {favoriteAnimals.map((animal, i) => (
              <div key={animal.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.07}s` }}>
                <AnimalCard animal={animal} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
