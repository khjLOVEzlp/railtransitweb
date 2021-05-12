import styled from "@emotion/styled";
import { Spin } from "antd";
import React, { createContext, ReactNode, useContext, useState } from "react";
import * as auth from '../auth-provider'
import { useAsync, useMount } from "../hook";
import { User } from "../type/user";
import { http } from "../utils/http";

const AuthContext = createContext<| {
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}
  | undefined>(undefined)

const FullPage = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

export const FullPageLoading = () => <FullPage>
  <Spin size={'large'} />
</FullPage>

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
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))
  useMount(() => {
    run(bootstrapUser())
  })
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
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