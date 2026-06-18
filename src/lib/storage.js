const KEY = 'masuda_visited'
const INTRO_KEY = 'masuda_intro_seen'

export function loadVisited() {
  const match = document.cookie.match(new RegExp(`${KEY}=([^;]+)`))
  if (!match) return new Set()
  return new Set(decodeURIComponent(match[1]).split(',').filter(Boolean))
}

export function saveVisited(ids) {
  const value = encodeURIComponent([...ids].join(','))
  const maxAge = 60 * 60 * 24 * 365
  document.cookie = `${KEY}=${value};path=/;max-age=${maxAge};SameSite=Lax`
}

export function hasSeenIntro() {
  return document.cookie.includes(`${INTRO_KEY}=1`)
}

export function markIntroSeen() {
  document.cookie = `${INTRO_KEY}=1;path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
}

export function resetVisited() {
  document.cookie = `${KEY}=;path=/;max-age=0`
}
