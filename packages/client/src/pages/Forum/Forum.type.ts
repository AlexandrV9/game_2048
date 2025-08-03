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
  replies?: Comment[]
  author?: Author
}

interface TopicEmoji {
  code: string
  count: number
  users: string[]
}

export interface EmojiObj {
  id: number
  code: string
}

export type TopicEmojiList = Record<number, TopicEmoji>
export interface Topic {
  id: number
  topic: string
  author: string
  created: Date
  comments?: Comment[]
  reactions?: TopicEmojiList
}

export interface ReactionObj {
  status: 'added' | 'removed'
  reaction?: {
    id: number
    topicId: number
    emojiId: number
    authorLogin: string
  }
}
