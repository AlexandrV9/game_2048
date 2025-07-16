import { Request as ExpressRequest } from 'express'

import ReactDOM from 'react-dom/server'
import { createFetchRequest } from './entry-server.utils'
import { Provider } from 'react-redux'
import { routes } from './app/providers'
import { createReduxStore } from './app/store'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom'

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
    html: ReactDOM.renderToString(
      <Provider store={reduxStore}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ),
    initialState: {},
  }
}
