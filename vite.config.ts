import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import path, { resolve } from 'node:path'
const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dirs: [path.resolve(pathSrc, 'composables')],
      vueTemplate: true,
      dts: path.resolve(pathSrc, 'types/auto-import.d.ts'),
    }),
    Components({
      dts: path.resolve(pathSrc, 'types/components.d.ts'),
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  server: {
    host: true, // host设置为true才可以使用network的形式，以ip访问项目
    // port: 8080, // 端口号
    open: false, // 自动打开浏览器
    cors: true, // 跨域设置允许
    strictPort: true, // 如果端口已占用直接退出
    // 接口代理
    proxy: {
      '/api': {
        // 本地 8000 前端代码的接口 代理到 8888 的服务端口
        target: 'https://lianghj.top:8888/api/private/v1/',
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace('/api/', '/'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "@/styles/variables.scss";@import "@/styles/mixin.scss";',

      },
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
  },
})
