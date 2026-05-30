import { Link } from 'react-router-dom'
import BubbleBackground from '../components/BubbleBackground'

export default function NotFoundPage() {
  return (
    <div className="ocean-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <BubbleBackground />
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '2rem' }}>
        <div style={{ fontSize: '6rem', marginBottom: '1rem' }} className="animate-float">🌊</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: '6rem',
          color: 'var(--cyan)', marginBottom: '0', lineHeight: 1,
          textShadow: '0 0 60px rgba(6,182,212,0.5)',
        }}>404</h1>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--foam)', margin: '1rem 0 0.5rem', fontSize: '1.5rem' }}>
          Страница ушла на дно
        </h2>
        <p style={{ color: 'rgba(165,243,252,0.6)', marginBottom: '2rem' }}>
          Эта страница, как Атлантида — затоплена и недоступна
        </p>
        <Link to="/" className="btn-ocean" style={{ textDecoration: 'none' }}>
          🏠 Вернуться на поверхность
        </Link>
      </div>
    </div>
  )
}
