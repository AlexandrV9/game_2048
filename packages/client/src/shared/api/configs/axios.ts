import axios, { AxiosError } from 'axios'

export const axiosInstance = axios.create({
  baseURL: `https://${import.meta.env.VITE_BASE_API_URL}`,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  withCredentials: true,
  timeout: 10_000,
})

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (typeof window !== undefined) {
        localStorage.clear()
        sessionStorage.clear()
      }
    }
    return Promise.reject(error)
  }
)

export const axiosServer = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
  timeout: 10_000,
})

axiosServer.interceptors.request.use(config => {
  const token = getCookie('authCookie')
  if (token) {
    config.headers['x-auth-token'] = 'token'
  }

  return config
})

function getCookie(name: string) {
  const value = document.cookie.split('; ').find(c => c.startsWith(name + '='))

  return value ? value.substring(name.length + 1) : null
}
