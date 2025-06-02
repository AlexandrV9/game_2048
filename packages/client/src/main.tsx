import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App'
import { router, routesName } from './core/Routes'
import './index.css'

const routeList = []
for (const item in routesName) {
  routeList.push(
    <li>
      <a href={routesName[item]}>{item}</a>
    </li>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <span>
      <h1>ссылки роутера</h1>
      <p>
        если нажать просто "profile", то перекинет на 404, если добавить id, то
        на нужный профиль
      </p>
      <ul>{routeList}</ul>
    </span>
    <RouterProvider router={router} />
  </React.StrictMode>
)
