import './WelcomeBanner.css'

export default function WelcomeBanner({ onClose }) {
  return (
    <div className="welcome-overlay" role="dialog" aria-modal="true" aria-label="ようこそ">
      <div className="welcome-modal">
        <div className="welcome-icon">🗺️</div>
        <h1 className="welcome-title">益田スタンプラリーへようこそ！</h1>
        <p className="welcome-desc">
          島根県益田市の観光スポット・グルメ・絶景スポット<br />
          <strong>全20カ所</strong>を巡ってスタンプを集めよう！
        </p>
        <ul className="welcome-steps">
          <li>📍 スポットを訪問したら「<strong>制覇！</strong>」ボタンを押す</li>
          <li>🍪 記録はこのデバイスに自動で保存される</li>
          <li>🏆 20カ所すべて制覇で特別な演出が！</li>
        </ul>
        <button className="welcome-btn" onClick={onClose} autoFocus>
          さっそく始める！
        </button>
      </div>
    </div>
  )
}
