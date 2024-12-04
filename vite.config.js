import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '192.168.0.135',
    port: 8000,
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components/lib',
      '@utils': '/src/utils/lib',
      '@hooks': '/src/hooks/lib',
      '@store': '/src/store/lib',
      '@api': '/src/api/lib',
      '@plugins': '/src/plugins/lib',
    },
    extensions: ['.js', '.vue', '.json'],
  }
})
