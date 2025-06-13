import { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '../shared/routes/index.js'

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
    <div className="App">
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  )
}
