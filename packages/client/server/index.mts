import dotenv from 'dotenv'
import express, { Request as ExpressRequest } from 'express'
import path from 'node:path'
import fs from 'fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { createServer as createViteServer, ViteDevServer } from 'vite'

dotenv.config()

const port = process.env.PORT || 9000
const __filename = fileURLToPath(import.meta.url)
const clientPath = path.join(dirname(__filename), '..')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()

  let viteDevServer: ViteDevServer | undefined

  if (isDev) {
    viteDevServer = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(viteDevServer.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.get('*all', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; initialState: unknown }>
      let template: string

      if (viteDevServer) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )

        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await viteDevServer.transformIndexHtml(url, template)

        // Загружаем модуль клиента, который будет рендерить HTML-код
        render = (
          await viteDevServer.ssrLoadModule(
            path.join(clientPath, 'src/entry-server.tsx')
          )
        ).render
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )

        // Получаем путь до модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.js'
        )

        // Импортируем этот модуль и вызываем с инишл стейтом
        render = (await import(pathToServer)).render
      }

      // Получаем HTML-строку из JSX
      const { html: appHtml, initialState } = await render(req)

      // Заменяем комментарий на сгенерированную HTML-строку
      const stateScript = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>`
      const html = template.replace('<!--ssr-outlet-->', appHtml + stateScript)

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      res.status(500)
      viteDevServer?.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}

createServer()
