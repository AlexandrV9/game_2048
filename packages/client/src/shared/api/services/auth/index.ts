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
    return baseApi.post<ResSignUp>('/auth/signup', data)
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
