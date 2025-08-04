import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

import { YA_API_URL } from '../constants'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cookies = req.headers.cookie
    if (!cookies) {
      res.status(403).json({ error: 'Not authorized' })
      return
    }

    const response = await axios.get(`${YA_API_URL}/auth/user`, {
      headers: {
        Cookie: cookies,
        'Content-Type': 'application/json',
      },
    })

    if (response.status !== 200 || !response.data.id) {
      res.status(403).json({ error: 'Invalid auth data' })
      return
    }
    next()
  } catch (error) {
    console.error('Auth check error:', error)
    res.status(500).json({ error: 'Authorization failed' })
    return
  }
}
