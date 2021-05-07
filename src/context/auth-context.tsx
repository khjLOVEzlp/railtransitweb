import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as auth from '../auth-provider'
import {User} from "../type/user";
import {useMount} from "../hook";

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

export const AuthProvider = ({children}: { children: ReactNode }) => {
  let boostrapUser = null
  useEffect(() => {
    boostrapUser = JSON.parse(sessionStorage.user)
    console.log(boostrapUser)
  })
  const [user, setUser] = useState<User | null>(boostrapUser)
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const logout = () => auth.logout()

  return (
    <AuthContext.Provider children={children} value={{user, login, logout}}/>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}