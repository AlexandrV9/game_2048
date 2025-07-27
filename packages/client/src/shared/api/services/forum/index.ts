import { serverApi } from '../../core/BaseAPI'
import { ResponseCreateTopic, TopicCreate } from './types'

export class ForumService {
  static createTopic(data: TopicCreate) {
    const resp = serverApi.post<ResponseCreateTopic>('/forum/topic', {
      topic: data.topic,
      created: data.created,
      authorLogin: data.author,
      comments: data.comments,
    })
    console.log(resp)
    return resp
  }
}
