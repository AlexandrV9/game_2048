import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'
dotenv.config()

const isDev = process.env.NODE_ENV == 'development'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      srcDir: 'src',
      filename: '../public/serviceWorker.js',
      devOptions: {
        enabled: isDev,
        type: 'module',
      },
      strategies: 'injectManifest',
      injectManifest: {
        injectionPoint: undefined,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    exclude: ['serviceWorker.ts'],
  },
})
