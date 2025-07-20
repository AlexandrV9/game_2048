import { Client } from 'pg'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env
console.log(POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT)
export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const client = new Client({
      user: POSTGRES_USER,
      host: 'localhost',
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
    })

    await client.connect()

    client
      .query('SELECT NOW()')
      .then(res => {
        console.log(res.rows)
        client.end()
      })
      .catch(err => {
        console.log('error', err)
      })
  } catch (e) {
    console.error(e)
  }

  return null
}
