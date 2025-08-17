import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import path from 'path'
import dotenv from 'dotenv'

import { Comment, Reaction, Reply, Topic, Emoji } from './models'
import { EMOJIS } from './constants'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST || 'localhost',
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  database: POSTGRES_DB || 'game_2048',
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development',
  models: [Topic, Comment, Reply, Reaction, Emoji],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 3,
  },
}

const sequelize = new Sequelize(sequelizeOptions)

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Соединение с БД установлено')
    await sequelize.sync()

    for (const emoji of EMOJIS) {
      await Emoji.findOrCreate({ where: { code: emoji.code } })
    }
    console.log('Таблица Emoji загружена')
  } catch (error) {
    console.error('Соединение с БД не установлено по ошибке: ', error)
    throw error
  }
}

export default sequelize
