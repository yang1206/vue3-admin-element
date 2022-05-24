import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    siderType: true,
    lang: localStorage.getItem('lang') || 'zh'
  }),
  getters: {
    getSiderType(state) { return state.siderType }
  },
  actions: {
    changeSiderType() {
      this.siderType = !this.siderType
    },
    changeLang(lang) {
      this.lang = lang
    }
  }
})