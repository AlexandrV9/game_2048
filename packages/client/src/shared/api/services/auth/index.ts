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

  static signInByOAuth(code: string) {
    return baseApi.post('/oauth/yandex', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI_OAUTH,
      client_id: import.meta.env.VITE_CLIENT_ID_OAUTH,
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

export class OAuthService {
  static async getAuthorizationUrl() {
    const queryParams = new URLSearchParams({
      client_id: import.meta.env.VITE_CLIENT_ID_OAUTH,
      response_type: 'code',
      redirect_uri: import.meta.env.VITE_REDIRECT_URI_OAUTH,
    })

    const url = `https://oauth.yandex.ru/authorize?${queryParams.toString()}`
    return url
  }

  static async signInByOAuth(code: string) {
    return baseApi.post('/oauth/yandex', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI_OAUTH,
      client_id: import.meta.env.VITE_CLIENT_ID_OAUTH,
      // client_secret: import.meta.env.VITE_CODE_OAUTH,
    })
  }
}
