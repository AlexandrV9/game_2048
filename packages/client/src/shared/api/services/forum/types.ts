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
