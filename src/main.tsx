import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const IS_IOS =
  typeof navigator !== 'undefined' &&
  /iP(hone|ad|od)/.test(navigator.userAgent) &&
  typeof window !== 'undefined'

if (IS_IOS) {
  let lastY = 0
  const preventOverscroll = (e: TouchEvent) => {
    if (e.cancelable && e.touches.length > 0) {
      const y = e.touches[0].clientY
      const deltaY = y - lastY
      lastY = y
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const atTop = window.scrollY <= 0
      const atBottom = maxScroll > 0 && window.scrollY >= maxScroll - 1
      const draggingDown = deltaY > 0
      const draggingUp = deltaY < 0
      if ((atTop && draggingDown) || (atBottom && draggingUp)) e.preventDefault()
    }
  }
  document.addEventListener('touchstart', () => {
    lastY = 0
  }, { passive: true })
  document.addEventListener('touchmove', preventOverscroll, { passive: false })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
