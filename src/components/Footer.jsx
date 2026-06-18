import './Footer.css'

export default function Footer({ onReset }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__info">
          <span>🌿 益田スタンプラリー</span>
          <span className="footer__sep">|</span>
          <span>島根県益田市 観光めぐり</span>
        </div>
        <button className="footer__reset" onClick={onReset}>
          記録をリセット
        </button>
      </div>
    </footer>
  )
}
