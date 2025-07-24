import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

import { YA_API_URL } from './constants'

export const checkAuth = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  try {
    const cookies = req.headers.cookie
    if (!cookies) {
      return res.status(403).json({ error: 'Not authorized' })
    }

    const response = await axios.get(`${YA_API_URL}/auth/user`, {
      headers: {
        Cookie: cookies,
        'Content-Type': 'application/json',
      },
    })

    if (response.status !== 200 || !response.data.id) {
      return res.status(403).json({ error: 'Invalid auth data' })
    }

    if (next) next()
    return response.data
  } catch (error) {
    console.error('Auth check error:', error)
    return res.status(500).json({ error: 'Authorization failed' })
  }
}
