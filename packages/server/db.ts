import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import path from 'path'
import dotenv from 'dotenv'

import { Comment, Reaction, Reply, Topic, Emoji } from './models'
import { EMOJIS } from './constants'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  logging: false,
  models: [Topic, Comment, Reply, Reaction, Emoji],
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
  }
}

export default sequelize
