import './StampBadge.css'

export default function StampBadge() {
  return (
    <div className="stamp-badge" aria-label="制覇済み">
      <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="stamp-svg">
        <circle cx="30" cy="30" r="27" fill="none" stroke="#C25A18" strokeWidth="3" strokeDasharray="5 3" />
        <circle cx="30" cy="30" r="22" fill="rgba(232,115,44,0.85)" />
        <text x="30" y="25" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="'Zen Maru Gothic', sans-serif">制覇</text>
        <text x="30" y="38" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="'Zen Maru Gothic', sans-serif">MASUDA</text>
      </svg>
    </div>
  )
}
