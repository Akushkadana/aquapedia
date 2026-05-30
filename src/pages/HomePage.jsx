import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadFacts, nextFact, prevFact } from '../redux/slices/factsSlice'
import { fetchAnimals } from '../redux/slices/animalsSlice'
import BubbleBackground from '../components/BubbleBackground'

const DEPTH_ZONES = [
  { name: 'Солнечная зона', depth: '0–200 м', desc: 'Яркий свет, богатая жизнь', color: '#fde68a', icon: '☀️' },
  { name: 'Сумеречная зона', depth: '200–1000 м', desc: 'Сумерки, высокое давление', color: '#818cf8', icon: '🌆' },
  { name: 'Полуночная зона', depth: '1000–4000 м', desc: 'Кромешная тьма', color: '#a78bfa', icon: '🌑' },
  { name: 'Абиссальная зона', depth: '4000–6000 м', desc: 'Почти безжизненные глубины', color: '#60a5fa', icon: '❄️' },
  { name: 'Хадальная зона', depth: '6000–11000 м', desc: 'Марианская впадина и глубже', color: '#f472b6', icon: '💀' },
]

export default function HomePage() {
  const dispatch = useDispatch()
  const { list: facts, status: factsStatus, currentIndex } = useSelector(s => s.facts)
  const { list: animals, status: animalsStatus } = useSelector(s => s.animals)

  useEffect(() => {
    if (factsStatus === 'idle') dispatch(loadFacts())
    if (animalsStatus === 'idle') dispatch(fetchAnimals())
  }, [dispatch, factsStatus, animalsStatus])

  const currentFact = facts[currentIndex]

  return (
    <div className="ocean-bg" style={{ position: 'relative', minHeight: '100vh' }}>
      <BubbleBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <section style={{
          textAlign: 'center', padding: '6rem 2rem 4rem',
          maxWidth: 900, margin: '0 auto',
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }} className="animate-float">🌊</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--foam)',
            letterSpacing: '0.05em',
            marginBottom: '1rem',
            textShadow: '0 0 60px rgba(6,182,212,0.5)',
          }}>
            AQUAPEDIA
          </h1>
          <p style={{
            fontSize: '1.2rem', color: 'rgba(165,243,252,0.7)',
            maxWidth: 600, margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}>
            Энциклопедия морских глубин — откройте тайны существ,<br/>
            населяющих 71% нашей планеты
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/catalog" className="btn-ocean" style={{ textDecoration: 'none', padding: '14px 32px', fontSize: '1rem' }}>
              🔍 Исследовать каталог
            </Link>
            <Link to="/add" className="btn-ghost" style={{ textDecoration: 'none', padding: '14px 32px', fontSize: '1rem' }}>
              ➕ Добавить животное
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section style={{ maxWidth: 1200, margin: '0 auto 4rem', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { value: animals.length || '12', label: 'Животных в базе', icon: '🐾' },
              { value: '5', label: 'Зон океана', icon: '🗺️' },
              { value: '71%', label: 'Поверхности Земли', icon: '🌍' },
              { value: '11 034м', label: 'Глубина Марианской впадины', icon: '📏' },
            ].map((stat, i) => (
              <div key={i} className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem', color: 'var(--cyan)',
                  marginBottom: '0.25rem',
                }}>{stat.value}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(165,243,252,0.6)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Fact of the day */}
        <section style={{ maxWidth: 800, margin: '0 auto 4rem', padding: '0 2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', textAlign: 'center',
            color: 'var(--foam)', marginBottom: '1.5rem', fontSize: '1.5rem',
          }}>💡 Факт об океане</h2>
          <div className="glass glow-card" style={{ padding: '2rem', textAlign: 'center', minHeight: 120 }}>
            {factsStatus === 'loading' && (
              <div style={{ color: 'var(--azure)' }} className="animate-shimmer">Загрузка фактов...</div>
            )}
            {factsStatus === 'failed' && (
              <div style={{ color: '#f87171' }}>Не удалось загрузить факты</div>
            )}
            {currentFact && (
              <>
                <p style={{
                  fontSize: '1.1rem', lineHeight: 1.7,
                  color: 'var(--pearl)', marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}>
                  "{currentFact.text}"
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button className="btn-ghost" onClick={() => dispatch(prevFact())}>← Назад</button>
                  <span style={{ color: 'var(--azure)', alignSelf: 'center', fontSize: '0.875rem' }}>
                    {currentIndex + 1} / {facts.length}
                  </span>
                  <button className="btn-ghost" onClick={() => dispatch(nextFact())}>Вперёд →</button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Depth zones */}
        <section style={{ maxWidth: 1200, margin: '0 auto 4rem', padding: '0 2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', textAlign: 'center',
            color: 'var(--foam)', marginBottom: '2rem', fontSize: '1.5rem',
          }}>🌊 Зоны океана</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {DEPTH_ZONES.map((zone, i) => (
              <div key={i} className="glass" style={{
                padding: '1rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
                borderLeft: `3px solid ${zone.color}`,
              }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{zone.icon}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, color: zone.color, marginRight: '1rem' }}>{zone.name}</span>
                  <span style={{ fontSize: '0.875rem', color: 'rgba(165,243,252,0.6)' }}>{zone.desc}</span>
                </div>
                <span style={{
                  fontFamily: 'monospace', fontSize: '0.875rem',
                  color: 'var(--azure)', whiteSpace: 'nowrap',
                }}>{zone.depth}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '2rem 2rem 6rem' }}>
          <Link to="/catalog" style={{
            display: 'inline-block', padding: '16px 48px',
            background: 'linear-gradient(135deg, var(--teal), var(--azure))',
            color: 'var(--foam)', textDecoration: 'none',
            borderRadius: 12, fontFamily: 'var(--font-display)',
            fontSize: '1rem', letterSpacing: '0.1em',
            boxShadow: '0 0 40px rgba(6,182,212,0.3)',
          }}>
            НАЧАТЬ ИССЛЕДОВАНИЕ
          </Link>
        </section>
      </div>
    </div>
  )
}
