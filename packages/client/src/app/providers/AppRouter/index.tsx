import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  EndPage,
  Error404Page,
  Error500Page,
  ForumPage,
  HomePage,
  LeaderBoardPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  StartPage,
} from '@/pages'

import { routesName } from '@/shared/configs/routes'
import { AuthProvider } from '../AuthProvider'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <AuthProvider />,
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
        path: routesName.signin,
        element: <SignInPage />,
      },
      {
        path: routesName.signup,
        element: <SignUpPage />,
      },
      {
        path: routesName.start,
        element: <StartPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: routesName.end,
            element: <EndPage />,
          },
          {
            path: routesName.forum,
            element: <ForumPage />,
          },
          {
            path: routesName.home,
            element: <HomePage />,
          },
          {
            path: routesName.lederBoard,
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
])

export const AppRouter = () => <RouterProvider router={router} />

export * from './ProtectedRoute'
