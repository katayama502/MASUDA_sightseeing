import { useEffect, useRef } from 'react'
import './CelebrationOverlay.css'

function createConfetti(canvas) {
  const ctx = canvas.getContext('2d')
  const W = canvas.width = window.innerWidth
  const H = canvas.height = window.innerHeight
  const colors = ['#2F7D5B', '#1F7A9C', '#E8732C', '#F49A5C', '#4FA77C', '#FFFFFF']
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H - H,
    w: 8 + Math.random() * 8,
    h: 4 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: 2 + Math.random() * 3,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.15,
  }))

  let frame
  let elapsed = 0
  const draw = () => {
    elapsed++
    ctx.clearRect(0, 0, W, H)
    pieces.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W }
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.globalAlpha = elapsed > 150 ? Math.max(0, 1 - (elapsed - 150) / 100) : 1
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    })
    if (elapsed < 250) frame = requestAnimationFrame(draw)
    else ctx.clearRect(0, 0, W, H)
  }
  frame = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(frame)
}

export default function CelebrationOverlay({ onClose }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const stop = createConfetti(canvasRef.current)
    return stop
  }, [])

  const shareText = encodeURIComponent('益田市の観光スポット20カ所をすべて制覇しました！✨ #益田スタンプラリー #島根県益田市')

  return (
    <div className="celebration" role="dialog" aria-modal="true" aria-label="全制覇おめでとう">
      <canvas ref={canvasRef} className="celebration__canvas" aria-hidden="true" />
      <div className="celebration__modal">
        <div className="celebration__medal">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#E8732C" />
            <circle cx="50" cy="50" r="40" fill="#F49A5C" />
            <circle cx="50" cy="50" r="34" fill="#E8732C" />
            <text x="50" y="45" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="'Zen Maru Gothic',sans-serif">益田</text>
            <text x="50" y="60" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="'Zen Maru Gothic',sans-serif">マスター</text>
            <text x="50" y="73" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="7" fontFamily="'Zen Maru Gothic',sans-serif">認定</text>
          </svg>
        </div>
        <h2 className="celebration__title">🎉 全スポット制覇！</h2>
        <p className="celebration__msg">
          益田市の全20スポットを制覇しました！<br />
          あなたは<strong>益田マスター</strong>です！
        </p>
        <div className="celebration__share">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="celebration__share-btn celebration__share-btn--x"
          >
            𝕏 でシェア
          </a>
          <a
            href={`https://line.me/R/msg/text/?${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="celebration__share-btn celebration__share-btn--line"
          >
            LINE でシェア
          </a>
        </div>
        <button className="celebration__close" onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  )
}
