import { message } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;

const sessionStorageKey = "jwtToken";
const sessionStorageUser = "login";

export const getToken = () => window.sessionStorage.getItem(sessionStorageKey);
export const getUser = () => window.sessionStorage.getItem(sessionStorageUser)

export const handleUserResponse = ({ data }: { data: { jwtToken: string } }) => {
  window.sessionStorage.setItem(sessionStorageKey, data.jwtToken || "");
  window.sessionStorage.setItem('user', JSON.stringify(data) || "")
  return data;
};

export const login = (data: { loginName: string; password: string }) => {
  return fetch(`${apiUrl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      sessionStorage.setItem('login', JSON.stringify(data))
      message.success("登陆成功")
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () => {
  return fetch(`${apiUrl}logout`, {
    method: "POST", headers: {
      "Authorization": getToken() ? `${getToken()}` : ''
    }
  }).then((res) => {
    if (res.ok) {
      window.sessionStorage.clear()
    }
  })
}

export const menuRender = async () => {
  return fetch(`${apiUrl}info?type=1`, {
    method: "POST",
    headers: {
      "Authorization": getToken() ? `${getToken()}` : ""
    }
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json()
      data.data.unshift({ name: '首页', url: '/home' })
      data.data.forEach((item: { [key: string]: unknown }) => {
        let { name } = item
        switch (name) {
          case '设备管理':
            item.url = '/hardware'
            break;
          case '统计分析':
            item.url = '/statistics'
            break;
          case '告警上报':
            item.url = '/alarm'
            break;
          case '作业计划':
            item.url = '/plan'
            break;
          case '人员管理':
            item.url = '/person'
            break;
          case '系统管理':
            item.url = '/system'
            break;
          case '库存管理':
            item.url = '/warehouse'
            break;
          default:
            break;
        }
      })
      sessionStorage.setItem("menu", JSON.stringify(data.data))
      return data.data
    }
  })
}
