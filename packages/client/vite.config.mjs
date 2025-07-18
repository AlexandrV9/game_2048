import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'

dotenv.config()

const isDev = process.env.VITE_NODE_ENV == 'development'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  ssr: {
    format: 'cjs',
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      srcDir: path.join(__dirname, './public'),
      filename: 'serviceWorker.js',
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
    outDir: path.join(__dirname, 'dist/client'),
  },
  optimizeDeps: {
    exclude: ['serviceWorker.ts'],
  },
})
