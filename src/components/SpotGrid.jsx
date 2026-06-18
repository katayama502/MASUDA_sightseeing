import SpotCard from './SpotCard'
import './SpotGrid.css'

export default function SpotGrid({ spots, onToggleVisit, onOpenDetail }) {
  if (spots.length === 0) {
    return (
      <div className="spot-grid__empty">
        <span>🔍</span>
        <p>該当するスポットがありません</p>
        <p className="spot-grid__empty-sub">フィルターを変えてみてください</p>
      </div>
    )
  }

  return (
    <div className="spot-grid">
      {spots.map(spot => (
        <SpotCard key={spot.id} spot={spot} onToggleVisit={onToggleVisit} onOpenDetail={onOpenDetail} />
      ))}
    </div>
  )
}
