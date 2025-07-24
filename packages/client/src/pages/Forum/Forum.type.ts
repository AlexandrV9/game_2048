export interface User {
  id?: number
  first_name: string
  second_name: string
  login: string
  email: string
  password?: string
  phone?: string
  avatar?: string
  display_name: string
}

export interface Author {
  id?: number
  first_name: string
  second_name: string
  login: string
  email: string
  phone?: string
  avatar?: string
  display_name: string
}

export interface Comment {
  id: number
  content: string
  created: Date
  authorLogin: string
  topicId?: number
  topic?: Topic
  parentCommentId?: number
  childComments?: Comment[]
}

export interface Topic {
  id: number
  topic: string
  author: string
  created: Date
  comments?: Comment[]
}
