import './ProgressBar.css'

export default function ProgressBar({ visitedCount, total }) {
  const pct = total > 0 ? (visitedCount / total) * 100 : 0
  const isComplete = visitedCount === total

  return (
    <div className="progress-section">
      <div className="progress-header">
        <div className="progress-title">
          {isComplete ? '🎉 全スポット制覇達成！' : `${visitedCount}/${total} スポットを制覇`}
        </div>
        <div className="progress-pct">{Math.round(pct)}%</div>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={visitedCount} aria-valuemin={0} aria-valuemax={total}>
        <div
          className={`progress-fill ${isComplete ? 'progress-fill--complete' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="progress-stamps">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`progress-stamp ${i < visitedCount ? 'progress-stamp--filled' : ''}`}
            title={i < visitedCount ? '制覇済み' : '未制覇'}
          />
        ))}
      </div>
    </div>
  )
}
