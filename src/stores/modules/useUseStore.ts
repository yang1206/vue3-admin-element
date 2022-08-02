import { defineStore } from "pinia";
import { login as loginApi } from "@/api/login";
import router from "@/router";
import { setTokenTime } from "@/utils/auth";
import { IUserStore } from "@/stores/interface";
export const useUserStore = defineStore("user", {
  state: ():IUserStore => ({
    token: localStorage.getItem("token") || "",
  }),
  getters: {
    getToken(state) {
      return state.token
    },
  },
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem("token", token)
    },
    login(userInfo) {
      return new Promise<void>((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            this.setToken(res.token)
            router.replace("/")
            setTokenTime()
            resolve()
          })
          .catch((err) => reject(err))
      });
    },

    logout() {
      this.setToken("")
      localStorage.removeItem('token')
      localStorage.removeItem('tokenTime')
      router.replace("/login")
    },
  },
});
