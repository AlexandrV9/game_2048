import { type RouteObject } from 'react-router-dom'

import { ErrorBoundary } from '@/shared/common/ErrorBoundary'
import {
  Error404Page,
  Error500Page,
  ForumPage,
  HomePage,
  LeaderBoardPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  GamePage,
} from '@/pages'

import { routesName } from '@/shared/configs/routes'
import { AuthProvider } from '../AuthProvider'
import { ProtectedRoute } from './ProtectedRoute'

export const routes: RouteObject[] = [
  {
    element: <AuthProvider />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: routesName.error404,
        element: <Error404Page />,
      },
      {
        path: routesName.error500,
        element: <Error500Page />,
      },
      {
        path: routesName.signIn,
        element: <SignInPage />,
      },
      {
        path: routesName.signUp,
        element: <SignUpPage />,
      },
      {
        path: routesName.game,
        element: <GamePage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: routesName.forum,
            element: <ForumPage />,
          },
          {
            path: routesName.home,
            element: <HomePage />,
          },
          {
            path: routesName.leaderBoard,
            element: <LeaderBoardPage />,
          },
          {
            path: `${routesName.profile}`,
            element: <ProfilePage />,
          },
          {
            path: `${routesName.profile}/:id`,
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: '*',
        element: <Error404Page />,
      },
    ],
  },
]
