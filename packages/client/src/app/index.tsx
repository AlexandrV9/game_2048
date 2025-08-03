import { Suspense, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { AppRouter, ReduxProvider } from './providers'

import image from '../shared/assets/2048.svg'
import store from '@/app/store'

import './index.css'

export function App() {
  useEffect(() => {
    const abortController = new AbortController()

    const fetchServerData = async () => {
      try {
        const url = `http://localhost:${__SERVER_PORT__}`
        const response = await fetch(url, { signal: abortController.signal })
        const data = await response.json()
        console.log(data)
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Fetch error:', error)
        }
      }
    }

    fetchServerData()

    return () => {
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = image
    document.head.appendChild(link)

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  return (
    <div className="h-[100vh] w-[100vw]">
      <Suspense fallback={null}>
        <ReduxProvider store={store}>
          <AppRouter />
        </ReduxProvider>
        <ToastContainer />
      </Suspense>
    </div>
  )
}
