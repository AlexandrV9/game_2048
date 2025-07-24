import dotenv from 'dotenv'

dotenv.config()

export const YA_API_URL = 'https://ya-praktikum.tech/api/v2'
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3001
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost'
export const CLIENT_PORT = Number(process.env.CLIENT_PORT) || 3000
