import { Request as ExpressRequest } from 'express'

import { renderToString } from 'react-dom/server'
import { createFetchRequest } from './entry-server.utils'
import { Provider } from 'react-redux'
import { createReduxStore } from './app/store'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { StrictMode } from 'react'
import { routes } from './app/providers/AppRouter/routes'
import { ThemeProvider } from './shared/lib/theme'
import { ToastContainer } from 'react-toastify'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const reduxStore = createReduxStore()

  const router = createStaticRouter(dataRoutes, context)

  return {
    html: renderToString(
      <StrictMode>
        <Provider store={reduxStore}>
          <ThemeProvider>
            <StaticRouterProvider router={router} context={context} />
            <ToastContainer />
          </ThemeProvider>
        </Provider>
      </StrictMode>
    ),
    initialState: {},
  }
}
