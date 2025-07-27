import axios, { AxiosError } from 'axios'

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API_URL}`,
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
