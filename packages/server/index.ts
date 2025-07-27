import cors from 'cors'
import 'reflect-metadata'
import express from 'express'
import cookieParser from 'cookie-parser'

import { CLIENT_PORT, CLIENT_URL, SERVER_PORT } from './constants'
import { yandexApiProxy } from './api/yaProxy'
import { forumAPI } from './api/forum'
import { initializeDatabase } from './db'

export const app = express()

app.use(cookieParser())

app.use(
  cors({
    origin: `${CLIENT_URL}:${CLIENT_PORT}`,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 204,
  })
)

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${CLIENT_URL}:${CLIENT_PORT}`)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, OPTIONS, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use('/yandex-api', yandexApiProxy)

initializeDatabase()
  .then(async () => {
    forumAPI()

    app.listen(SERVER_PORT, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${SERVER_PORT}`)
    })
  })
  .catch(error => {
    console.error('Database initialization failed:', error)
  })
