import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/boardriding': {
        target: 'https://www.boardriding.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/boardriding/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
})
