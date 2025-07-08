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

  private transformResponseData<T = unknown, D = unknown>(
    data: AxiosResponse<T, D>
  ): AxiosResponse<T, D> {
    return data
  }

  private buildConfig(config?: AxiosRequestConfig) {
    return config
  }

  private handleError<T = unknown, D = unknown>(error: unknown) {
    console.log(error)

    return error as AxiosResponse<T, D>
  }

  private async handleRequest<T>(
    request: Promise<AxiosResponse<T>>
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await request
      return this.transformResponseData<T>(response)
    } catch (error) {
      return this.handleError(error)
    }
  }
}

export const baseApi = new BaseAPI({
  baseUrl: '',
})
