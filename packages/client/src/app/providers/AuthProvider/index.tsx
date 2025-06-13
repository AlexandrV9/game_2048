import { AuthService } from '@/shared/api'
import { ReqSignInByLogin, ReqSignUp } from '@/shared/api/services/auth/types'
import { AuthContext } from '@/shared/auth'
import { isPublicRoute, routesName } from '@/shared/configs/routes'
import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const AuthProvider = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  const signInByLogin = useCallback(async (data: ReqSignInByLogin) => {
    return AuthService.signInByLogin(data).then(res => {
      if (res?.status === 200) {
        setIsLoggedIn(true)
        navigate(routesName.home)
      }
      return res
    })
  }, [])

  const signUp = useCallback(async (data: ReqSignUp) => {
    return AuthService.signUp(data)
  }, [])

  const checkIsAuth = useCallback(async () => {
    return AuthService.getUserInfo().then(res => {
      if (res?.status === 200) {
        setIsLoggedIn(true)

        if (isPublicRoute(location.pathname)) {
          navigate(routesName.home)
        }
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [])

  const signOut = useCallback(async () => {
    return AuthService.logout().then(res => {
      navigate(routesName.signin)
      return res
    })
  }, [])

  useEffect(() => {
    checkIsAuth().finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, signUp, signInByLogin, signOut }}>
      <Outlet />
    </AuthContext.Provider>
  )
}
