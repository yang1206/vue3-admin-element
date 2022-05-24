import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import 'element-plus/dist/index.css'
import '../src/styles/index.scss'
import '@/router/permission'
import i18n from '@/i18n/index.js'

const app = createApp(App)
import * as ELIcons from '@element-plus/icons-vue'
// import 'element-plus/theme-chalk/dark/css-vars.css'


import 'virtual:svg-icons-register' // 引入注册脚本
import SvgIcon from '@/components/svgIcon/index.vue' // 引入组件
app.component('svg-icon', SvgIcon)




for (const iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName])
}

app.use(router).use(pinia).use(i18n).mount('#app')
