import { Request, Response } from 'express'
import { app } from './index'

export const Get = (
  url: string,
  fn: (req: Request, res: Response) => unknown
) => {
  app.get(url, async (req: Request, res: Response) => {
    try {
      await fn(req, res)
    } catch (error) {
      console.error('Произошла внутренняя ошибка сервера: ', error)
      res.status(500).json({ error: 'Произошла внутренняя ошибка сервера' })
    }
  })
}

export const Post = (
  url: string,
  fn: (req: Request, res: Response) => unknown
) => {
  app.post(url, async (req: Request, res: Response) => {
    try {
      await fn(req, res)
    } catch (error) {
      console.error('Произошла внутренняя ошибка сервера: ', error)
      res.status(500).json({ error: 'Произошла внутренняя ошибка сервера' })
    }
  })
}
