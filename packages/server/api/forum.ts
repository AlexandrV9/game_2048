import bodyParser from 'body-parser'

import { Comment, Reply, Topic } from '../models'
import { app } from '../index'
import { Get, Post } from '../utils'

export const forumAPI = () => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  Get('/forum/topics', async (_, res) => {
    const allTopics = await Topic.findAll({
      include: [Comment],
    })

    res.status(200).json(
      allTopics.map(item => {
        return {
          id: item.id,
          topic: item.topic,
          created: item.created,
          author: item.authorLogin,
          comments: item.comments,
        }
      })
    )
  })

  Post('/forum/topics', async (req, res) => {
    const newTopic = await Topic.create({
      topic: req.body.topic,
      created: req.body.created,
      authorLogin: req.body.author,
      comments: req.body.comments,
    })
    res.status(201).json({
      id: newTopic.id,
      topic: newTopic.topic,
      created: newTopic.created,
      author: newTopic.authorLogin,
      comments: newTopic.comments,
    })
  })

  Get('/forum/topics/:id/comments', async (req, res) => {
    const topicId = req.params.id
    const allComments = await Comment.findAll({
      where: {
        topicId: topicId,
      },
      include: [Reply],
    })

    const responseData = allComments.map(item => {
      const comment = {
        id: item.id,
        content: item.content,
        created: item.created,
        authorLogin: item.authorLogin,
        topicId: item.topicId,
        replies: item.replies,
      }
      return comment
    })
    res.status(200).json(
      responseData.map(item => {
        return item
      })
    )
  })

  Post('/forum/topics/:id/comments', async (req, res) => {
    const topicId = req.params.id
    const newComment = await Comment.create({
      content: req.body.content,
      created: new Date(),
      authorLogin: req.body.authorLogin,
      topicId: topicId,
    })
    res.status(201).json({
      id: newComment.id,
      content: newComment.content,
      created: newComment.created,
      authorLogin: newComment.authorLogin,
      topicId: newComment.topicId,
      replies: [],
    })
  })

  Get('/forum/comments/:id', async (req, res) => {
    const commentId = req.params.id
    const allReplies = await Reply.findAll({
      where: {
        commentId: commentId,
      },
    })

    const responseData = allReplies.map(item => {
      const reply = {
        id: item.id,
        content: item.content,
        created: item.created,
        authorLogin: item.authorLogin,
        commentId: item.commentId,
      }
      return reply
    })
    res.status(200).json(
      responseData.map(item => {
        return item
      })
    )
  })

  Post('/forum/comments/:id', async (req, res) => {
    const commentId = req.params.id
    const newReply = await Reply.create({
      content: req.body.content,
      created: new Date(),
      authorLogin: req.body.authorLogin,
      commentId: commentId,
    })
    res.status(201).json({
      id: newReply.id,
      content: newReply.content,
      created: newReply.created,
      authorLogin: newReply.authorLogin,
      commentId: newReply.commentId,
    })
  })

  Get('/forum/comments/:id/reaction', async (_, res) => {
    res.status(200)
  })

  Post('/forum/comments/:id/reaction', async (_, res) => {
    res.status(201)
  })
}
