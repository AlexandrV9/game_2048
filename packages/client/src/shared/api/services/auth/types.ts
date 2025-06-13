import { User } from '../../../types'

export type ReqSignUp = {
  first_name: string
  second_name: string
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
