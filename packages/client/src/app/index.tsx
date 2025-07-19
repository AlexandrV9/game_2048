import { Suspense, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { AppRouter } from './providers'
import image from '../shared/assets/2048.svg'
import { Provider } from 'react-redux'
import store from '@/app/store'
import './index.css'

export function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = image
    document.head.appendChild(link)
  }, [])

  return (
    <div className="h-[100vh] w-[100vw]">
      <Suspense fallback={null}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
        <ToastContainer />
      </Suspense>
    </div>
  )
}
