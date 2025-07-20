import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'

let router: ReturnType<typeof createBrowserRouter>

if (typeof window !== 'undefined') {
  router = createBrowserRouter(routes)
}

export const AppRouter = () => <RouterProvider router={router} />

export * from './ProtectedRoute'
