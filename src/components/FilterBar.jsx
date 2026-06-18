import { CATEGORIES } from '../data/spots'
import './FilterBar.css'

const CATEGORY_ICONS = {
  'すべて': '🗺️',
  '絶景': '🏔️',
  '自然': '🌿',
  '歴史': '🏯',
  '文化': '🎨',
  'パワースポット': '⛩️',
  'グルメ': '🍜',
}

export default function FilterBar({ activeCategory, onChangeCategory, showUnvisitedOnly, onToggleUnvisited }) {
  return (
    <div className="filter-bar-wrapper">
      <div className="filter-bar">
        <div className="filter-chips" role="tablist" aria-label="カテゴリフィルター">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`filter-chip ${activeCategory === cat ? 'filter-chip--active' : ''} filter-chip--${cat}`}
              onClick={() => onChangeCategory(cat)}
            >
              <span>{CATEGORY_ICONS[cat]}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>
        <button
          className={`filter-toggle ${showUnvisitedOnly ? 'filter-toggle--active' : ''}`}
          onClick={onToggleUnvisited}
          aria-pressed={showUnvisitedOnly}
        >
          {showUnvisitedOnly ? '✓ 未制覇のみ' : '未制覇のみ'}
        </button>
      </div>
    </div>
  )
}
