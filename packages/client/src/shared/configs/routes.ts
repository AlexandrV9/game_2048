export const routesName = {
  home: '/',
  signin: '/sign-in',
  signup: '/sign-up',
  profile: '/profile',
  lederBoard: '/leader-board',
  forum: '/forum',
  start: '/start',
  end: '/end',
  error404: '/404',
  error500: '/500',
} as const

export const publicRoutes = [
  routesName.signin,
  routesName.signup,
  routesName.start,
  routesName.error404,
  routesName.error500,
] as const

export const protectedRoutes = [
  routesName.home,
  routesName.profile,
  routesName.lederBoard,
  routesName.forum,
  routesName.end,
] as const

export const isPublicRoute = (route: string) => {
  return publicRoutes.includes(route as (typeof publicRoutes)[number])
}
export const isProtectedRoute = (route: string) => {
  return protectedRoutes.includes(route as (typeof protectedRoutes)[number])
}
