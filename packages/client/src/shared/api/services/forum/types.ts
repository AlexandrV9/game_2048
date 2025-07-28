export interface TopicCreate {
  topic: string
  author: string
  created: Date
  comments: []
}

export interface ResponseCreateTopic {
  id: number
  topic: string
  author: string
  created: Date
  comments: string
}

export interface GetReply {
  commentId: number
}

export interface CreateReply {
  commentId: number
  content: string
  authorLogin: string
}

export interface GetComment {
  topicId: number
}

export interface CreateComment {
  topicId: number
  content: string
  authorLogin: string
}

export interface CommentData {
  id: string
  authorLogin: string
  content: string
  created: string
  commentId: number
}
