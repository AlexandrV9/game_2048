import { Suspense, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { AppRouter } from './providers'

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

  return (
    <div className="h-[100vh] w-[100vw]">
      <Suspense fallback={null}>
        <AppRouter />
        <ToastContainer />
      </Suspense>
    </div>
  )
}
