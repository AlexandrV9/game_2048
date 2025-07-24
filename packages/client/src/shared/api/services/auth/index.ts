import { baseApi, serverApi } from '../../core/BaseAPI'
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

  static signInByOAuth(code: string) {
    return serverApi.post('/yandex-api/oauth/yandex', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI_OAUTH,
      client_id: import.meta.env.VITE_CLIENT_ID_OAUTH,
    })
  }

  static signInByLogin(data: ReqSignInByLogin) {
    return serverApi.post<ResSignInByLogin>('/yandex-api/auth/signin', data)
  }

  static getUserInfo() {
    return serverApi.get<ReqGetUserInfo>('/yandex-api/auth/user')
  }

  static logout() {
    return serverApi.post('/yandex-api/auth/logout')
  }
}
