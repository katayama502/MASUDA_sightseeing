import { useState, useEffect, useCallback } from 'react'
import { SPOTS } from './data/spots'
import { loadVisited, saveVisited, hasSeenIntro, markIntroSeen, resetVisited } from './lib/storage'
import Header from './components/Header'
import ProgressBar from './components/ProgressBar'
import FilterBar from './components/FilterBar'
import SpotGrid from './components/SpotGrid'
import SpotModal from './components/SpotModal'
import CelebrationOverlay from './components/CelebrationOverlay'
import WelcomeBanner from './components/WelcomeBanner'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [visited, setVisited] = useState(() => loadVisited())
  const [activeCategory, setActiveCategory] = useState('すべて')
  const [showUnvisitedOnly, setShowUnvisitedOnly] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [prevCount, setPrevCount] = useState(0)

  useEffect(() => {
    if (!hasSeenIntro()) {
      setShowWelcome(true)
      markIntroSeen()
    }
  }, [])

  const handleToggleVisit = useCallback((id) => {
    setVisited(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(30)
        }
      }
      saveVisited(next)
      return next
    })
  }, [])

  useEffect(() => {
    if (visited.size === SPOTS.length && prevCount < SPOTS.length && visited.size > 0) {
      setShowCelebration(true)
    }
    setPrevCount(visited.size)
  }, [visited.size])

  const handleReset = useCallback(() => {
    if (window.confirm('制覇記録をすべてリセットしますか？')) {
      resetVisited()
      setVisited(new Set())
      setShowCelebration(false)
    }
  }, [])

  const spotsWithVisited = useCallback(
    (list) => list.map(spot => ({ ...spot, visited: visited.has(spot.id) })),
    [visited]
  )

  const filteredSpots = spotsWithVisited(
    SPOTS.filter(spot => {
      const catMatch = activeCategory === 'すべて' || spot.category === activeCategory
      const visitedMatch = !showUnvisitedOnly || !visited.has(spot.id)
      return catMatch && visitedMatch
    })
  )

  // モーダルに表示するスポットは常に最新のvisited状態を反映
  const modalSpot = selectedSpot
    ? { ...selectedSpot, visited: visited.has(selectedSpot.id) }
    : null

  const handleOpenDetail = useCallback((spot) => {
    setSelectedSpot(spot)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setSelectedSpot(null)
  }, [])

  return (
    <div className="app">
      {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}
      <Header visitedCount={visited.size} total={SPOTS.length} />
      <main className="main">
        <ProgressBar visitedCount={visited.size} total={SPOTS.length} />
        <FilterBar
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
          showUnvisitedOnly={showUnvisitedOnly}
          onToggleUnvisited={() => setShowUnvisitedOnly(v => !v)}
        />
        <SpotGrid
          spots={filteredSpots}
          onToggleVisit={handleToggleVisit}
          onOpenDetail={handleOpenDetail}
        />
      </main>
      <Footer onReset={handleReset} />
      {modalSpot && (
        <SpotModal
          spot={modalSpot}
          onClose={handleCloseDetail}
          onToggleVisit={handleToggleVisit}
        />
      )}
      {showCelebration && (
        <CelebrationOverlay onClose={() => setShowCelebration(false)} />
      )}
    </div>
  )
}
