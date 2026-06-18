import { useState } from 'react'
import StampBadge from './StampBadge'
import './SpotCard.css'

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

export default function SpotCard({ spot, onToggleVisit, onOpenDetail }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [stampAnim, setStampAnim] = useState(false)

  const handleToggle = (e) => {
    e.stopPropagation()
    if (!spot.visited) {
      setStampAnim(true)
      setTimeout(() => setStampAnim(false), 600)
    }
    onToggleVisit(spot.id)
  }

  const imgSrc = `https://images.unsplash.com/photo-${spot.unsplashId}?w=600&h=400&fit=crop&auto=format&q=75`
  const gradient = CATEGORY_GRADIENTS[spot.category] || CATEGORY_GRADIENTS['絶景']
  const catColor = CATEGORY_COLORS[spot.category] || 'var(--color-primary)'
  const showPlaceholder = !imgLoaded || imgError

  return (
    <article
      className={`spot-card ${spot.visited ? 'spot-card--visited' : ''}`}
      onClick={() => onOpenDetail(spot)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpenDetail(spot)}
      aria-label={`${spot.name} の詳細を見る`}
    >
      <div className="spot-card__image-wrap">
        <div
          className="spot-card__placeholder"
          style={{ background: gradient, opacity: showPlaceholder ? 1 : 0 }}
          aria-hidden="true"
        >
          <span className="spot-card__placeholder-icon">{CATEGORY_ICONS[spot.category]}</span>
          <span className="spot-card__placeholder-name">{spot.name}</span>
        </div>
        <img
          src={imgSrc}
          alt={spot.name}
          className="spot-card__image"
          loading="lazy"
          style={{ opacity: imgLoaded && !imgError ? 1 : 0 }}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
        <div className="spot-card__category-badge" style={{ background: catColor }}>
          {spot.category}
        </div>
        {spot.visited && (
          <div className={`spot-card__stamp-wrap ${stampAnim ? 'spot-card__stamp-wrap--anim' : ''}`}>
            <StampBadge />
          </div>
        )}
        <div className="spot-card__detail-hint">タップして詳細 →</div>
      </div>
      <div className="spot-card__body">
        <div className="spot-card__location">📍 {spot.location}</div>
        <h2 className="spot-card__name">{spot.name}</h2>
        <p className="spot-card__desc">{spot.description}</p>
        <div className="spot-card__tags">
          {spot.tags.map(tag => (
            <span key={tag} className="spot-card__tag">#{tag}</span>
          ))}
        </div>
        <button
          className={`spot-card__btn ${spot.visited ? 'spot-card__btn--visited' : ''}`}
          onClick={handleToggle}
          aria-label={spot.visited ? `${spot.name} の制覇を取り消す` : `${spot.name} を制覇する`}
        >
          {spot.visited ? '✓ 制覇済み！' : '🏆 制覇！'}
        </button>
      </div>
    </article>
  )
}
