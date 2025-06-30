import { baseApi } from '../../core/BaseAPI'
import { UserBaseInfo, UserInfo } from './types'

export class UserService {
  static getUserInfo() {
    return baseApi.get<UserInfo>('https://ya-praktikum.tech/api/v2/auth/user')
  }

  static changeUserAvatar(data: File) {
    const formData = new FormData()
    formData.append('avatar', data)
    return baseApi.put<UserInfo>(
      'https://ya-praktikum.tech/api/v2/user/profile/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  }

  static updateUserData(data: UserBaseInfo) {
    return baseApi.put<UserInfo>(
      'https://ya-praktikum.tech/api/v2/user/profile',
      data
    )
  }
}
