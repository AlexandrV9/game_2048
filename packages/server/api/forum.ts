import bodyParser from 'body-parser'

import { Topic } from '../models'
import { app } from '../index'
import { checkAuth } from '../utils'

export const forumAPI = () => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.post('/forum/topic', async (req, res) => {
    try {
      await checkAuth(req, res)
      console.log(req.body)
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

  app.get('/forum/topic', async (req, res) => {
    try {
      await checkAuth(req, res)
      console.log(req.body)
      const newTopic = await Topic.findAll()

      res.status(200).json(
        newTopic.map(item => {
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
}
