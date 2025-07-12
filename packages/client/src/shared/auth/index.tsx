import { createContext, useContext } from 'react'
import { ReqSignInByLogin, ReqSignUp } from '../api/services/auth/types'

export type IAuthContext = {
  isLoggedIn: boolean
  isLoading: boolean
  signInByLogin: (data: ReqSignInByLogin) => Promise<void>
  signUp: (data: ReqSignUp) => Promise<void>
  signOut: () => Promise<void>
  signInByOAuth: (code: string) => Promise<void>
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('AuthContext.Provider not found')
  }

  return context
}
