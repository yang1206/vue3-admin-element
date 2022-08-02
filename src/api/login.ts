import request from "@/service";
import { Login } from "./interface";
export const login = (data: Login.ReqLoginForm) => {
  return request({
    url: "/login",
    method: "POST",
    data,
  });
};
