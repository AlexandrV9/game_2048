export interface UserInfo extends UserBaseInfo {
  id: number
  display_name: string
  avatar?: string | null
}

export interface UserBaseInfo {
  first_name: string
  second_name: string
  phone: string
  login: string
  email: string
}

export interface SearchUser {
  login: string
}
