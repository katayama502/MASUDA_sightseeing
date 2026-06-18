import { useEffect, useState } from 'react'
import './Header.css'

export default function Header({ visitedCount, total }) {
  const [scrolled, setScrolled] = useState(false)
  const isComplete = visitedCount === total

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <div className="header__logo">
          <span className="header__logo-icon">🗺️</span>
          <div>
            <div className="header__logo-title">益田スタンプラリー</div>
            <div className="header__logo-sub">島根県益田市 観光めぐり</div>
          </div>
        </div>
        <div className={`header__badge ${isComplete ? 'header__badge--complete' : ''}`}>
          {isComplete && <span className="header__crown">👑</span>}
          <span className="header__count">{visitedCount}</span>
          <span className="header__sep">/</span>
          <span className="header__total">{total}</span>
          <span className="header__label">制覇</span>
        </div>
      </div>
    </header>
  )
}
