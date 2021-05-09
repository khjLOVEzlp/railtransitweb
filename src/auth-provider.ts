const apiUrl = process.env.REACT_APP_API_URL;

const sessionStorageKey = "jwtToken";
const sessionStorageUser = "login";

export const getToken = () => window.sessionStorage.getItem(sessionStorageKey);
export const getUser = () => window.sessionStorage.getItem(sessionStorageUser)

export const handleUserResponse = ({ data }: { data: { jwtToken: string } }) => {
  window.sessionStorage.setItem(sessionStorageKey, data.jwtToken || "");
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
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () => {
  window.sessionStorage.clear();
}
