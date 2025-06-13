import { PendingPage } from '@/pages/Pending'
import { useAuth } from '@/shared/auth'
import { routesName } from '@/shared/configs/routes'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return <PendingPage />
  }

  if (isLoggedIn) {
    return <Outlet />
  }

  return <Navigate replace to={routesName.signin} />
}
