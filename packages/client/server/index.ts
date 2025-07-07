import dotenv from 'dotenv'
import express from 'express'
import path from 'node:path'
import fs from 'fs/promises'

import { createServer as createViteServer } from 'vite'

dotenv.config()

const port = process.env.PORT || 8000
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: clientPath,
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.get('*all', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template = await fs.readFile(
        path.resolve(clientPath, 'index.html'),
        'utf-8'
      )

      // Применяем встроенные HTML-преобразования vite и плагинов
      template = await vite.transformIndexHtml(url, template)
      console.log('template', template)

      // Загружаем модуль клиента, который будет рендерить HTML-код
      const { render } = await vite.ssrLoadModule(
        path.join(clientPath, 'src/entry-server.tsx')
      )

      // Получаем HTML-строку из JSX
      const appHtml = await render()
      console.log('appHtml', appHtml)

      // Заменяем комментарий на сгенерированную HTML-строку
      const html = template.replace(`<!--ssr-outlet-->`, () => appHtml)
      console.log('html', html)

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}

createServer()
