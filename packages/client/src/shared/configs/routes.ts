export const routesName = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  profile: '/profile',
  leaderBoard: '/leader-board',
  forum: '/forum',
  game: '/game',
  error404: '/404',
  error500: '/500',
} as const

export const publicRoutes = [
  routesName.signIn,
  routesName.signUp,
  routesName.game,
  routesName.error404,
  routesName.error500,
] as const

export const protectedRoutes = [
  routesName.home,
  routesName.profile,
  routesName.leaderBoard,
  routesName.forum,
] as const

// TODO: преобразовать роуты к виду
// const route = {
//   path: '/profile',
//   label: 'Профиль',
//   isProtected: true,
//   isVisible: true,
// }

type ArrayElement<T> = T extends readonly (infer R)[] ? R : never

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
