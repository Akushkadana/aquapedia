import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFavoriteIds } from '../redux/slices/favoritesSlice'

export default function Navbar() {
  const location = useLocation()
  const favoriteIds = useSelector(selectFavoriteIds)

  const links = [
    { to: '/', label: 'Главная', icon: '🏠' },
    { to: '/catalog', label: 'Каталог', icon: '📖' },
    { to: '/favorites', label: `Избранное (${favoriteIds.length})`, icon: '⭐' },
    { to: '/add', label: 'Добавить', icon: '➕' },
  ]

  return (
    <nav style={{
      background: 'rgba(4,15,31,0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(6,182,212,0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.8rem' }}>🌊</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            color: 'var(--cyan)',
            letterSpacing: '0.05em',
          }}>AQUAPEDIA</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {links.map(link => (
            <Link key={link.to} to={link.to} style={{
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              color: location.pathname === link.to ? 'var(--deep)' : 'var(--foam)',
              background: location.pathname === link.to
                ? 'linear-gradient(135deg, var(--azure), var(--cyan))'
                : 'transparent',
              border: location.pathname === link.to ? 'none' : '1px solid rgba(6,182,212,0.2)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
