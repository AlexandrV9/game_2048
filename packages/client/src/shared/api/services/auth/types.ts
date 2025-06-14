import { User } from '../../../types'

export type ReqSignUp = {
  firstName: string
  secondName: string
  login: string
  email: string
  password: string
  phone: string
}

export type ResSignUp = {
  id: number
}

export type ReqSignInByLogin = {
  login: string
  password: string
}

export type ResSignInByLogin = void

export type ReqGetUserInfo = User
