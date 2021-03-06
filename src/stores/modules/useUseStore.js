import { defineStore } from 'pinia'
import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth.js'
export const useUserStore = defineStore('user',
  {
    state: () => ({
      token: localStorage.getItem('token') || '',
    }),
    getters: {
      getToken(state) { return state.token }
    },
    actions: {
      setToken(token) {
        this.token = token
        localStorage.setItem('token', token)
      },
      login(userInfo) {
        return new Promise((resolve, reject) => {
          loginApi(userInfo).then(res => {
            this.setToken(res.token)
            console.log(router)
            router.replace('/')
            setTokenTime()
            resolve()
          }).catch(err => reject(err))
        })
      },

      logout() {
        this.setToken('')
        localStorage.clear()
        router.replace('/login')
      }
    }
  }
)
