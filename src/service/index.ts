import Request from "./request";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { diffTokenTime } from "@/utils/auth";
import { useUserStore } from "@/stores";
import type { RequestConfig } from "./request/types";

export interface IResponse<T> {
  token: any;
  statusCode: number;
  desc: string;
  result: T;
}

// 重写返回类型
interface HttpRequestConfig<T, R> extends RequestConfig<IResponse<R>> {
  data?: T;
}

const request = new Request({
  baseURL: import.meta.env.VITE_APP_GLOB_BASE_API,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config: AxiosRequestConfig) => {
      if (localStorage.getItem("token")) {
        if (diffTokenTime()) {
          const userStore = useUserStore();
          userStore.logout();
          ElMessage.error("token 失效了");
        }
      }
      config.headers.Authorization = localStorage.getItem("token");
      return config;
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      const { data, meta } = result.data;
      console.log(data,meta);
      if (meta.status === 200 || meta.status === 201) {
        ElMessage.success(meta.msg);
        return result.data;
      } else {
        ElMessage.error(meta.msg);
        if (meta.status == "400" && meta.msg == "无效token") {
          const userStore = useUserStore();
          userStore.logout();
        }
        return Promise.reject(new Error(meta.msg));
      }
    },
    responseInterceptorsCatch: (error) => {
      error.response && ElMessage.error(error.response.data);
      return Promise.reject(new Error(error.response.data));
    },
  },
});

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {HttpRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const HttpRequest = <D = any, T = any>(config: HttpRequestConfig<D, T>) => {
  const { method = "GET" } = config;
  if (method === "get" || method === "GET") {
    config.params = config.data;
  }
  return request.request<IResponse<T>>(config);
};
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default HttpRequest;
