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

export const getUser = async (req: Request, res: Response) => {
  try {
    await checkAuth(req, res)
    const resp = await axios.post(
      'https://ya-praktikum.tech/api/v2/user/search',
      { login: 'nblohin97' }
    )
    return {
      id: resp.data.id,
      first_name: resp.data.first_name,
      second_name: resp.data.second_name,
      display_name: resp.data.display_name,
      phone: resp.data.phone,
      login: resp.data.login,
      avatar: resp.data.avatar,
      email: resp.data.email,
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return res.status(500).json({ error: 'Authorization failed' })
  }
}
