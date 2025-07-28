import { Topic, Comment } from '@/pages/Forum/Forum.type'
import { serverApi } from '../../core/BaseAPI'
import {
  CommentData,
  CreateComment,
  CreateReply,
  GetComment,
  GetReply,
  ResponseCreateTopic,
  TopicCreate,
} from './types'

export class ForumService {
  static getTopics() {
    const res = serverApi.get<Topic[]>('/forum/topics')
    return res
  }

  static createTopic(data: TopicCreate) {
    const res = serverApi.post<ResponseCreateTopic>('/forum/topics', {
      topic: data.topic,
      created: data.created,
      authorLogin: data.author,
      comments: data.comments,
    })
    return res
  }

  static getReply(data: GetReply) {
    const res = serverApi.get<Comment[]>(`/forum/comments/${data.commentId}`)
    return res
  }

  static createReply(data: CreateReply) {
    const res = serverApi.post<CommentData>(
      `/forum/comments/${data.commentId}`,
      {
        content: data.content,
        authorLogin: data.authorLogin,
      }
    )
    return res
  }

  static getComment(data: GetComment) {
    const res = serverApi.get<Comment[]>(
      `/forum/topics/${data.topicId}/comments`
    )
    return res
  }

  static createComment(data: CreateComment) {
    const res = serverApi.post<Comment>(
      `/forum/topics/${data.topicId}/comments`,
      {
        content: data.content,
        authorLogin: data.authorLogin,
      }
    )
    return res
  }
}
