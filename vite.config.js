import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: '.htaccess',
          dest: 'dist'
        }
      ]
    })
  ],
  server: {
    port: 8080
  },
  build: {
    outDir: 'dist'
  }
})
