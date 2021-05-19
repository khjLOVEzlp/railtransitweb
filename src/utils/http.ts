import * as auth from '../auth-provider'
import {useCallback} from "react";
import {useAuth} from "../context/auth-context";
import {message} from "antd";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  {data, token, headers, ...customConfig}: Config = {}
) => {
  const config = {
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
        message.error("请重新登陆")
        await auth.logout();
        return Promise.reject({message: "请重新登录"});
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const {user} = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, {...config, token: user?.jwtToken}),
    [user?.jwtToken]
  );
};

