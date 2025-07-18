import ReactDOM from 'react-dom/client'

import { App } from './app'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />)

const startServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    registerSW()
  }
}

startServiceWorker()
