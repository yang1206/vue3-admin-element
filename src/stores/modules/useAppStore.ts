import { defineStore } from "pinia";
import { IAppStore,ImenuItem } from "../interface";

export const useAppStore = defineStore("app", {
  state: (): IAppStore => ({
    siderType: true,
    lang: localStorage.getItem("lang") || "zh",
    menuList: [],
  }),
  getters: {
    getSiderType(state): boolean {
      return state.siderType;
    },
    getMenuList(state):ImenuItem[]{
      return state.menuList
    }
  },
  actions: {
    changeSiderType() {
      this.siderType = !this.siderType;
    },
    changeLang(lang: any) {
      this.lang = lang;
    },
    setMenuList(payload: any) {
      this.menuList = payload;
    },
  },
});
