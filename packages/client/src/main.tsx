import { createRoot } from 'react-dom/client'

import { App } from './app'
import { registerSW } from 'virtual:pwa-register'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(<App />)

const startServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    registerSW()
  }
}

startServiceWorker()
