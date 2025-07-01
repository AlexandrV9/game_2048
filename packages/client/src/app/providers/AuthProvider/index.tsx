import { AuthService } from '@/shared/api'
import { ReqSignInByLogin, ReqSignUp } from '@/shared/api/services/auth/types'
import { AuthContext } from '@/shared/auth'
import {
  isAuthRoute,
  isProtectedRoute,
  routesName,
} from '@/shared/configs/routes'
import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { logout, setUser } from '@/app/features/userSlice'

export const AuthProvider = () => {
  const dispatch = useDispatch()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  const signInByLogin = useCallback(async (data: ReqSignInByLogin) => {
    try {
      const res = await AuthService.signInByLogin(data)

      if (res?.status === 200) {
        setIsLoggedIn(true)
        toast.success('Добро пожаловать!')
        navigate(routesName.home)
      } else {
        throw new Error('Authorization failed')
      }
    } catch {
      toast.error('Упс, что-то пошло не так. Попробуйте снова')
    }
  }, [])

  const signUp = useCallback(async (data: ReqSignUp) => {
    try {
      const res = await AuthService.signUp(data)

      if (res?.status === 200) {
        navigate(routesName.signIn)
      } else {
        throw new Error('Registration failed')
      }
    } catch {
      toast.error('Упс, что-то пошло не так. Попробуйте снова')
    }
  }, [])

  const checkIsAuth = useCallback(async () => {
    try {
      const res = await AuthService.getUserInfo()

      if (res?.status === 200) {
        setIsLoggedIn(true)
        dispatch(setUser(res.data))

        if (isAuthRoute(location.pathname)) {
          navigate(routesName.home)
        }
      } else {
        setIsLoggedIn(false)

        if (isProtectedRoute(location.pathname)) {
          navigate(routesName.signIn)
        }
      }
    } catch {
      setIsLoggedIn(false)
    }
  }, [location.pathname])

  const signOut = useCallback(async () => {
    try {
      const res = await AuthService.logout()
      window.close()

      if (res?.status === 200) {
        dispatch(logout())
        setIsLoggedIn(false)
        navigate(routesName.signIn)
      }
    } catch {
      /* empty */
    }
  }, [location.pathname])

  useEffect(() => {
    checkIsAuth().finally(() => {
      setIsLoading(false)
    })
  }, [checkIsAuth])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, signUp, signInByLogin, signOut }}>
      <Outlet />
    </AuthContext.Provider>
  )
}
