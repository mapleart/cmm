import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'CookieConsentModule',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'umd') return 'ccm.js'
        return `ccm.${format}.js`
      }
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          // Добавляем глобальные переменные если нужно
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
    open: '/index.html',
    port: 3000
  },
  // Настройка для dev mode
  root: '.'
}) 
