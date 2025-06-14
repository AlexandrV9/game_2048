import { routesName } from '@/shared/configs/routes'
import axios, { AxiosError } from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    if (error.status === 401 || error.status === 403) {
      localStorage.clear()
      sessionStorage.clear()
    }

    return Promise.reject(error)
  }
)
