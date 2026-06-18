import { useEffect, useRef } from 'react'
import StampBadge from './StampBadge'
import './SpotModal.css'

const CATEGORY_COLORS = {
  '絶景': 'var(--cat-scenery)',
  '自然': 'var(--cat-nature)',
  '歴史': 'var(--cat-history)',
  '文化': 'var(--cat-culture)',
  'パワースポット': 'var(--cat-power)',
  'グルメ': 'var(--cat-gourmet)',
}

const CATEGORY_GRADIENTS = {
  '絶景':       'linear-gradient(135deg, #1F7A9C 0%, #3FA3C4 50%, #87CEEB 100%)',
  '自然':       'linear-gradient(135deg, #1E5A3F 0%, #2F7D5B 50%, #4FA77C 100%)',
  '歴史':       'linear-gradient(135deg, #8B6914 0%, #B08458 50%, #D9C0A3 100%)',
  '文化':       'linear-gradient(135deg, #5B3D8E 0%, #8E6FA8 50%, #C4A8D8 100%)',
  'パワースポット': 'linear-gradient(135deg, #8B1A35 0%, #C9456B 50%, #F0899F 100%)',
  'グルメ':     'linear-gradient(135deg, #C25A18 0%, #E8732C 50%, #F5A972 100%)',
}

const CATEGORY_ICONS = {
  '絶景': '🏔️', '自然': '🌿', '歴史': '🏯',
  '文化': '🎨', 'パワースポット': '⛩️', 'グルメ': '🍜',
}

export default function SpotModal({ spot, onClose, onToggleVisit }) {
  const dialogRef = useRef(null)
  const catColor = CATEGORY_COLORS[spot.category] || 'var(--color-primary)'
  const gradient = CATEGORY_GRADIENTS[spot.category] || CATEGORY_GRADIENTS['絶景']

  const imgSrc = `https://images.unsplash.com/photo-${spot.unsplashId}?w=800&h=450&fit=crop&auto=format&q=80`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.mapQuery)}`

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label={spot.name}>
      <div className="modal" ref={dialogRef} tabIndex={-1}>
        {/* ヘッダー画像 */}
        <div className="modal__hero" style={{ background: gradient }}>
          <img
            src={imgSrc}
            alt={spot.name}
            className="modal__hero-img"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="modal__hero-overlay" />
          <div className="modal__hero-content">
            <div className="modal__category-badge" style={{ background: catColor }}>
              {CATEGORY_ICONS[spot.category]} {spot.category}
            </div>
            <h2 className="modal__title">{spot.name}</h2>
            <div className="modal__location">📍 {spot.address}</div>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="閉じる">✕</button>
          {spot.visited && (
            <div className="modal__stamp">
              <StampBadge />
            </div>
          )}
        </div>

        {/* コンテンツ */}
        <div className="modal__body">
          {/* 詳細説明 */}
          <section className="modal__section">
            <p className="modal__desc">
              {spot.detailDescription.split('\n\n').map((para, i) => (
                <span key={i}>{para}<br /><br /></span>
              ))}
            </p>
          </section>

          {/* インフォグリッド */}
          <section className="modal__info-grid">
            <div className="modal__info-item">
              <div className="modal__info-label">🌸 ベストシーズン</div>
              <div className="modal__info-value">{spot.bestSeason}</div>
            </div>
            <div className="modal__info-item">
              <div className="modal__info-label">🚌 アクセス</div>
              <div className="modal__info-value">{spot.access}</div>
            </div>
          </section>

          {/* ポイント */}
          <section className="modal__section">
            <h3 className="modal__section-title">💡 訪問ポイント</h3>
            <ul className="modal__tips">
              {spot.tips.map((tip, i) => (
                <li key={i} className="modal__tip">{tip}</li>
              ))}
            </ul>
          </section>

          {/* タグ */}
          <div className="modal__tags">
            {spot.tags.map(tag => (
              <span key={tag} className="modal__tag">#{tag}</span>
            ))}
          </div>

          {/* アクションボタン */}
          <div className="modal__actions">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal__map-btn"
            >
              🗺️ Google マップで開く
            </a>
            <button
              className={`modal__stamp-btn ${spot.visited ? 'modal__stamp-btn--visited' : ''}`}
              onClick={() => onToggleVisit(spot.id)}
            >
              {spot.visited ? '✓ 制覇済み！（取り消す）' : '🏆 制覇！'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
