import { createContext, useContext, useState } from 'react'
import { AuthService } from '../api'
import { ReqSignInByLogin, ReqSignUp } from '../api/services/auth/types'
import { Outlet, useNavigate } from 'react-router-dom'

export type IAuthContext = {
  isLoggedIn: boolean
  signInByLogin: (data: ReqSignInByLogin) => void
  signUp: (data: ReqSignUp) => void
}

export const AuthContext = createContext<IAuthContext>(null!)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('AuthContext.Provider not found')
  }

  return context
}

export const AuthProvider = () => {
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const signInByLogin = async (data: ReqSignInByLogin) => {
    console.log(data)
  }

  const signUp = async (data: ReqSignUp) => {
    const res = await AuthService.signUp(data)

    console.log(res?.data)

    if (res?.status != 200) {
      return
    }

    // navigate('/signin')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, signUp, signInByLogin }}>
      <Outlet />
    </AuthContext.Provider>
  )
}
