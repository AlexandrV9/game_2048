import { createRoot } from 'react-dom/client'

import { App } from './app'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(<App />)

const startServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('public/serviceWorker.ts')
        .then(registration => {
          console.log(
            'ServiceWorker зарегистрирован успешно: ',
            registration.scope
          )
        })
        .catch(error => {
          console.log('ServiceWorker не зарегистрирован: ', error)
        })
    })
  }
}

startServiceWorker()
