import { Suspense, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { AppRouter, ReduxProvider } from './providers'

import image from '../shared/assets/2048.svg'
import store from '@/app/store'

import './index.css'
import { ThemeProvider } from '@/shared/lib'

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
        <ReduxProvider store={store}>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </ReduxProvider>
        <ToastContainer />
      </Suspense>
    </div>
  )
}
