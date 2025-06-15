import { baseApi } from '../../core/BaseAPI'
import {
  ReqSignUp,
  ReqSignInByLogin,
  ResSignUp,
  ResSignInByLogin,
  ReqGetUserInfo,
} from './types'

export class AuthService {
  static signUp(data: ReqSignUp) {
    return baseApi.post<ResSignUp>('/auth/signup', {
      first_name: data.firstName,
      second_name: data.secondName,
      login: data.login,
      email: data.email,
      password: data.password,
      phone: data.phone,
    })
  }

  static signInByLogin(data: ReqSignInByLogin) {
    return baseApi.post<ResSignInByLogin>('/auth/signin', data)
  }

  static getUserInfo() {
    return baseApi.get<ReqGetUserInfo>('/auth/user')
  }

  static logout() {
    return baseApi.post('/auth/logout')
  }
}
