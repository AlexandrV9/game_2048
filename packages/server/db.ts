import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { Comment, Topic } from './models'
dotenv.config()

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
  models: [Topic, Comment],
}

const sequelize = new Sequelize(sequelizeOptions)

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Соединение с БД установлено')
    await sequelize.sync()
  } catch (error) {
    console.error('Соединение с БД не установлено по ошибке: ', error)
  }
}

export default sequelize
