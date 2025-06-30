export const routesName = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  profile: '/profile',
  leaderBoard: '/leader-board',
  forum: '/forum',
  game: '/game',
  end: '/end',
  error404: '/404',
  error500: '/500',
} as const

export const authRoutes = [routesName.signIn, routesName.signUp]

export const publicRoutes = [
  routesName.signIn,
  routesName.signUp,
  routesName.error404,
  routesName.error500,
] as const

export const protectedRoutes = [
  routesName.home,
  routesName.game,
  routesName.profile,
  routesName.leaderBoard,
  routesName.forum,
  routesName.end,
] as const

// TODO: преобразовать роуты к виду
// const route = {
//   path: '/profile',
//   label: 'Профиль',
//   isProtected: true,
//   isVisible: true,
// }

type ArrayElement<T> = T extends readonly (infer R)[] ? R : never

export const isAuthRoute = (
  route: string
): route is ArrayElement<typeof authRoutes> => {
  return authRoutes.includes(route as never)
}

export const isPublicRoute = (
  route: string
): route is ArrayElement<typeof protectedRoutes> => {
  return publicRoutes.includes(route as never)
}
export const isProtectedRoute = (
  route: string
): route is ArrayElement<typeof protectedRoutes> => {
  return protectedRoutes.includes(route as never)
}
