import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosInstance } from '../configs/axios'

export interface ApiOptions {
  baseUrl?: string
}

class BaseAPI {
  transport: AxiosInstance
  options?: ApiOptions

  constructor(options?: ApiOptions) {
    this.transport = axiosInstance
    this.options = options
  }

  get = <TData>(url: string, config?: AxiosRequestConfig) => {
    return this.handleRequest<TData>(this.transport.get<TData>(url, config))
  }

  post = <TData>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return this.handleRequest<TData>(
      this.transport.post(
        this.prepareUrl(url),
        this.preparePayload(data),
        this.buildConfig(config)
      )
    )
  }

  put = <TData>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return this.handleRequest<TData>(
      this.transport.put<TData>(
        this.prepareUrl(url),
        this.preparePayload(data),
        this.buildConfig(config)
      )
    )
  }

  patch = <TData>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return this.handleRequest<TData>(
      this.transport.patch<TData>(
        this.prepareUrl(url),
        this.preparePayload(data),
        this.buildConfig(config)
      )
    )
  }

  delete = <TData extends object>(url: string, config?: AxiosRequestConfig) => {
    return this.handleRequest<TData>(
      this.transport.delete<TData>(
        this.prepareUrl(url),
        this.buildConfig({
          ...config,
          data: this.preparePayload(config?.data),
        })
      )
    )
  }

  private prepareUrl(url: string): string {
    if (this.options?.baseUrl) {
      return `${this.options?.baseUrl}/${url}`
    }

    return url
  }

  private preparePayload(payload?: unknown) {
    return payload
  }

  private transformResData<T = unknown>(data?: T) {
    return data
  }

  private buildConfig(config?: AxiosRequestConfig) {
    return config
  }

  private handleError(error: unknown) {
    console.log(error)
  }

  private async handleRequest<TData>(
    request: Promise<AxiosResponse<TData, unknown>>
  ) {
    try {
      const response = await request
      const resData = this.transformResData(response)

      return resData
    } catch (error) {
      this.handleError(error)

      throw error
    }
  }
}

export const baseApi = new BaseAPI({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
})
