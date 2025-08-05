import bodyParser from 'body-parser'

import { Comment, Emoji, Reaction, Reply, Topic } from '../models'
import { app } from '../index'
import { Get, Post } from '../utils'

export const forumAPI = () => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  Get('/forum/topics', async (_, res) => {
    const allTopics = await Topic.findAll({
      include: [
        Comment,
        {
          model: Reaction,
          include: [Emoji],
        },
      ],
    })

    const response = allTopics.map(topic => {
      const groupedReactions = topic.reactions.reduce((acc, reaction) => {
        const id = reaction.emoji.id
        const code = reaction.emoji.code
        if (!acc[id]) {
          acc[id] = { code, count: 0, users: [] }
        }
        acc[id].count++
        acc[id].users.push(reaction.authorLogin)
        return acc
      }, {} as Record<number, { code: string; count: number; users: string[] }>)

      return {
        id: topic.id,
        topic: topic.topic,
        created: topic.created,
        author: topic.authorLogin,
        comments: topic.comments,
        reactions: groupedReactions,
      }
    })

    res.status(200).json(response)
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

  Post('/forum/topics/:id/reaction', async (req, res) => {
    const topicId = Number(req.params.id)
    const { emojiId, authorLogin } = req.body

    if (!emojiId || !authorLogin) {
      return res
        .status(400)
        .json({ error: 'emojiId и authorLogin обязательны' })
    }

    const existing = await Reaction.findOne({
      where: {
        topicId,
        emojiId,
        authorLogin,
      },
    })

    if (existing) {
      await existing.destroy()
    } else {
      await Reaction.create({
        topicId,
        emojiId,
        authorLogin,
      })
    }

    const reactions = await Reaction.findAll({
      where: { topicId },
      include: [{ model: Emoji, attributes: ['code'] }],
    })

    const emojiMap: Record<
      number,
      { code: string; count: number; users: string[] }
    > = {}

    reactions.forEach(r => {
      if (!r.emoji || !r.emoji.code) return

      if (!emojiMap[r.emojiId]) {
        emojiMap[r.emojiId] = {
          code: r.emoji.code,
          count: 0,
          users: [],
        }
      }

      emojiMap[r.emojiId].count++
      emojiMap[r.emojiId].users.push(r.authorLogin)
    })

    return res.status(200).json(emojiMap)
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

  Get('/forum/emojis', async (_, res) => {
    try {
      const allEmojis = await Emoji.findAll()
      res.status(200).json(allEmojis)
    } catch (error) {
      console.error('Error fetching emojis:', error)
      res.status(500).json({ error: 'Failed to load emojis' })
    }
  })
}
