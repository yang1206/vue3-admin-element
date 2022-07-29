import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestConfig, RequestInterceptors } from "./types";
import { ElMessage } from "element-plus";
import { diffTokenTime } from "@/utils/auth";
import { useUserStore } from "@/stores";

const defBaseURL = import.meta.env.VITE_APP_GLOB_BASE_API;

class Request {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        if (localStorage.getItem("token")) {
          if (diffTokenTime()) {
            const userStore = useUserStore();
            userStore.logout();
            return Promise.reject(new Error("token 失效了"));
          }
        }
        config.headers.Authorization = localStorage.getItem("token");
        return res;
      },
      (err: any) => err
    );
    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data, meta } = res.data;
        if (meta.status === 200 || meta.status === 201) {
          ElMessage.success(meta.msg);
          return data;
        } else {
          ElMessage.error(meta.msg);
          if (meta.status == "400" && meta.msg == "无效token") {
            const userStore = useUserStore();
            userStore.logout();
          }
          return Promise.reject(new Error(meta.msg));
        }
      },
      (error: any) => {
        error.response && ElMessage.error(error.response.data);
        return Promise.reject(new Error(error.response.data));
      }
    );
  }
  request(config: AxiosRequestConfig) {
    return this.instance.request(config);
  }
}
export default Request;
