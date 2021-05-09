import { createContext, ReactNode, useContext, useState } from "react";
import * as auth from '../auth-provider'
import { useMount } from "../hook";
import { User } from "../type/user";
import { http } from "../utils/http";

const AuthContext = createContext<| {
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}
  | undefined>(undefined)

interface AuthForm {
  loginName: string,
  password: string
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getUser();
  if (token) {
    const data = await http("login", { method: "POST", body: token });
    user = data.data;
  }
  console.log(user);

  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))
  useMount(() => {
    bootstrapUser().then(setUser)
  })
  return (
    <AuthContext.Provider children={children} value={{ user, login, logout }} />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}