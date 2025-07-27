import { baseApi, serverApi } from '../../core/BaseAPI'
import { UserBaseInfo, UserInfo } from './types'

export class UserService {
  static getUserInfo() {
    return serverApi.get<UserInfo>('/yandex-api/auth/user')
  }

  static changeUserAvatar(data: File) {
    const formData = new FormData()
    formData.append('avatar', data)
    return serverApi.put<UserInfo>(
      '/yandex-api/user/profile/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  }

  static updateUserData(data: UserBaseInfo) {
    return serverApi.put<UserInfo>('/yandex-api/user/profile', data)
  }
}
