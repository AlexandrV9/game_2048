import bodyParser from 'body-parser'

import { Comment, Topic } from '../models'
import { app } from '../index'
import { checkAuth } from '../utils'

export const forumAPI = () => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.post('/forum/topics', async (req, res) => {
    try {
      await checkAuth(req, res)
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
    } catch (error) {
      console.error('Ошибка при создании топика:', error)
      res.status(500).json({ error: 'Не удалось создать топик' })
    }
  })

  app.get('/forum/topics', async (req, res) => {
    try {
      await checkAuth(req, res)
      const allTopics = await Topic.findAll()

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
    } catch (error) {
      console.error('Ошибка при создании топика:', error)
      res.status(500).json({ error: 'Не удалось создать топик' })
    }
  })

  app.get('/forum/topics/:id/comments', async (req, res) => {
    try {
      await checkAuth(req, res)
      const topicId = req.params.id
      const allComments = await Comment.findAll({
        where: {
          topicId: topicId,
        },
      })
      res.status(200).json(
        allComments.map(item => {
          return {
            id: item.id,
            content: item.content,
            created: item.created,
            authorLogin: item.authorLogin,
            topicId: item.topicId,
            replies: [],
          }
        })
      )
    } catch (error) {
      console.error('Ошибка при создании топика:', error)
      res.status(500).json({ error: 'Не удалось создать топик' })
    }
  })

  app.post('/forum/topics/:id/comments', async (req, res) => {
    try {
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
    } catch (error) {
      console.error('Ошибка при создании топика:', error)
      res.status(500).json({ error: 'Не удалось создать топик' })
    }
  })
}
