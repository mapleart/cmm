import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'demo.html')
      },
      output: {
        exports: 'named',
        entryFileNames: 'ccm.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'ccm.css'
          }
          return assetInfo.name
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },
  server: {
    open: '/demo.html',
    port: 3000
  },
  // Настройка для dev mode
  root: '.'
}) 