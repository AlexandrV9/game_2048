import { createProxyMiddleware } from 'http-proxy-middleware'

import { YA_API_URL } from '../constants'

export const yandexApiProxy = createProxyMiddleware({
  changeOrigin: true,
  cookieDomainRewrite: {
    '*': '',
  },
  pathRewrite: {
    '^/yandex-api': '',
  },
  target: YA_API_URL,
})
