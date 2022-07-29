import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './index'
import { useUserStore } from '@/stores'
const whiteList = ['/login']
NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  if (userStore.getToken) {
     if (to.path === '/login') {
       NProgress.done()
       next('/users')
       
     } else {
       next()
     }
   } else {
     if (whiteList.includes(to.path)) {
       next()
     } else {
       next('/login')
       NProgress.done()
     }
   }
})
router.afterEach(to =>{
  NProgress.done()
})
