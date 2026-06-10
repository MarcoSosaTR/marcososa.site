import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function resetScrollPosition() {
  const root = document.documentElement
  const previousScrollBehavior = root.style.scrollBehavior

  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)

  if (document.scrollingElement) {
    document.scrollingElement.scrollTop = 0
  }

  document.body.scrollTop = 0
  root.scrollTop = 0
  root.style.scrollBehavior = previousScrollBehavior
}

export function scheduleScrollReset() {
  resetScrollPosition()

  const frame = window.requestAnimationFrame(resetScrollPosition)
  const timeout = window.setTimeout(resetScrollPosition, 0)
  const delayedTimeout = window.setTimeout(resetScrollPosition, 50)

  return () => {
    window.cancelAnimationFrame(frame)
    window.clearTimeout(timeout)
    window.clearTimeout(delayedTimeout)
  }
}

export function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    return scheduleScrollReset()
  }, [pathname, search])

  return null
}
