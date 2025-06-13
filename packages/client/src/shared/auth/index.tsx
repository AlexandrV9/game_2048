import { createContext, useContext } from 'react'
import {
  ReqSignInByLogin,
  ReqSignUp,
  ResSignUp,
} from '../api/services/auth/types'

import { AxiosResponse } from 'axios'

export type IAuthContext = {
  isLoggedIn: boolean
  isLoading: boolean
  signInByLogin: (
    data: ReqSignInByLogin
  ) => Promise<AxiosResponse<void, unknown> | undefined>
  signUp: (
    data: ReqSignUp
  ) => Promise<AxiosResponse<ResSignUp, unknown> | undefined>
  signOut: () => Promise<AxiosResponse<unknown, unknown> | undefined>
}

export const AuthContext = createContext<IAuthContext>(null!)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('AuthContext.Provider not found')
  }

  return context
}
