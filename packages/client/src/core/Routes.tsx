import { createBrowserRouter } from 'react-router-dom'
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
} from '../pages'

export const routesName: Record<string, string> = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
  profile: '/profile',
  lederBoard: '/leader-board',
  forum: '/forum',
  start: '/start',
  end: '/end',
  error404: '/404',
  error500: '/500',
}

export const router = createBrowserRouter([
  {
    path: routesName.end,
    element: <EndPage />,
  },
  {
    path: routesName.error404,
    element: <Error404Page />,
  },
  {
    path: routesName.error500,
    element: <Error500Page />,
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
    path: `${routesName.profile}/:id`,
    element: <ProfilePage />,
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
    path: '*',
    element: <Error404Page />,
  },
])
