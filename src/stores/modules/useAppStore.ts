import { menuList } from './../../api/meun';
import { defineStore } from 'pinia'
import { IAppStore } from '../interface'

export const useAppStore = defineStore('app', {
  state: ():IAppStore => ({
    siderType: true,
    lang: localStorage.getItem('lang') || 'zh',
    menuList:[]
  }),
  getters: {
    getSiderType(state):boolean { return state.siderType }
  },
  actions: {
    changeSiderType() {
      this.siderType = !this.siderType
    },
    changeLang(lang: any) {
      this.lang = lang
    }
  }
})