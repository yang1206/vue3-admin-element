import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from "element-plus";
import { diffTokenTime } from "@/utils/auth";
import { useUserStore } from "@/stores";

const defBaseURL = import.meta.env.VITE_APP_GLOB_BASE_API;
const service = axios.create({
  baseURL: defBaseURL,
  timeout: 5000,
});
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (localStorage.getItem("token")) {
      if (diffTokenTime()) {
        const userStore = useUserStore();
        userStore.logout();
        return Promise.reject(new Error("token 失效了"));
      }
    }
    config.headers.Authorization = localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

service.interceptors.response.use(
  (response) => {
    const { data, meta } = response.data;
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
  (error) => {
    error.response && ElMessage.error(error.response.data);
    return Promise.reject(new Error(error.response.data));
  }
);
export default service;
