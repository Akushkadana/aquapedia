import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnimals, setSearchQuery, setFilterZone, setFilterClass, deleteAnimal } from '../redux/slices/animalsSlice'
import { useAnimals, useFilters } from '../hooks/useAnimals'
import AnimalCard from '../components/AnimalCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import BubbleBackground from '../components/BubbleBackground'
import { ZONES, CLASSES } from '../utils/constants'

export default function CatalogPage() {
  const dispatch = useDispatch()
  const { animals, status, error } = useAnimals()
  const { searchQuery, filterZone, filterClass } = useFilters()
  const allAnimals = useSelector(s => s.animals.list)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchAnimals())
  }, [dispatch, status])

  const handleDelete = (id, name) => {
    if (window.confirm(`Удалить "${name}" из каталога?`)) {
      dispatch(deleteAnimal(id))
    }
  }

  return (
    <div className="ocean-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <BubbleBackground />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem', color: 'var(--foam)', marginBottom: '0.5rem',
          }}>📖 Каталог морских животных</h1>
          <p style={{ color: 'rgba(165,243,252,0.6)' }}>
            {status === 'succeeded' ? `${animals.length} из ${allAnimals.length} животных` : 'Загрузка...'}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              className="ocean-input"
              type="text"
              placeholder="🔍 Поиск по названию или описанию..."
              value={searchQuery}
              onChange={e => dispatch(setSearchQuery(e.target.value))}
              style={{ flex: '1 1 300px' }}
            />
            <select
              className="ocean-input"
              value={filterZone}
              onChange={e => dispatch(setFilterZone(e.target.value))}
              style={{ flex: '0 1 200px' }}
            >
              {ZONES.map(z => <option key={z.value} value={z.value}>{z.label}</option>)}
            </select>
            <select
              className="ocean-input"
              value={filterClass}
              onChange={e => dispatch(setFilterClass(e.target.value))}
              style={{ flex: '0 1 200px' }}
            >
              {CLASSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            {(searchQuery || filterZone !== 'all' || filterClass !== 'all') && (
              <button className="btn-ghost" onClick={() => {
                dispatch(setSearchQuery(''))
                dispatch(setFilterZone('all'))
                dispatch(setFilterClass('all'))
              }}>✕ Сбросить</button>
            )}
          </div>
        </div>

        {/* States */}
        {status === 'loading' && <LoadingSkeleton count={6} />}
        {status === 'failed' && (
          <ErrorMessage message={error} onRetry={() => dispatch(fetchAnimals())} />
        )}
        {status === 'succeeded' && animals.length === 0 && (
          <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔭</div>
            <h3 style={{ color: 'var(--foam)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
              Ничего не найдено
            </h3>
            <p style={{ color: 'rgba(165,243,252,0.6)' }}>
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}

        {/* Grid */}
        {status === 'succeeded' && animals.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {animals.map((animal, i) => (
              <div key={animal.id} style={{ position: 'relative', animationDelay: `${i * 0.05}s` }} className="animate-fadeInUp">
                <AnimalCard animal={animal} />
                <button
                  onClick={() => handleDelete(animal.id, animal.name)}
                  style={{
                    position: 'absolute', bottom: 60, right: 14,
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#f87171', borderRadius: 6,
                    padding: '4px 10px', fontSize: '0.75rem',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  title="Удалить"
                  onMouseEnter={e => e.target.style.background = 'rgba(239,68,68,0.2)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(239,68,68,0.1)'}
                >🗑️</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
