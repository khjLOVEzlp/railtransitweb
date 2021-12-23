import { useCallback } from "react";
import { useAuth } from "../context/auth-context";
import { message } from "antd";
import { logout } from "auth-provider";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `${token}` : "",
      "Content-Type": "application/json",
    },
    ...customConfig,
  };

  /*if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }*/

  return window
    .fetch(`${apiUrl}${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        message.error("权限不足，请重新登陆")
        // await setTimeout(() => auth.logout(), 3000)
        return Promise.reject({ message: "请重新登录" }).then(() => {
          logout()
        })
      }

      if (response.status === 404) {
        message.error("请求接口不存在")
      }

      if (response.status === 403) {
        message.error("未获得访问权限!")
      }

      /*if (response.status === 500) {
        message.error("接口错误")
      }*/

      const data = await response.json();

      if (data.code === 334) {
        message.error("数据权限异常，请在用户管理重新为用户设置角色")
      }

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    })
};

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.jwtToken }),
    [user?.jwtToken]
  );
};
