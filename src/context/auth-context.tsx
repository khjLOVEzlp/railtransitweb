import styled from "@emotion/styled";
import {Spin} from "antd";
import React, {createContext, ReactNode, useContext, useEffect} from "react";
import * as auth from '../auth-provider'
import {http} from "../utils/http";
import {useAsync} from "../hook/useAsync";
import {FullPageErrorFallback} from "../components/lib";
import {useQueryClient} from "react-query";

const AuthContext = createContext<| {
  user: {
    jwtToken: string,
    loginName?: string
    userName?: string
    userId?: number
  } | null;
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
  <Spin size={'large'}/>
</FullPage>

interface AuthForm {
  loginName: string,
  password: string
}

const bootstrapUser = async () => {
  let user = null;
  const form = auth.getUser();
  if (form) {
    const data = await http("login", {method: "POST", body: form});
    user = data.data;
  }
  return user;
}

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const {
    data: user,
    isLoading,
    isIdle,
    isError,
    error,
    run,
    setData: setUser,
  } = useAsync<{
    jwtToken: string,
    loginName?: string,
    userName?: string
    userId?: number
  } | null>();
  const queryClient = useQueryClient();

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const logout = () => auth.logout().then(() => {
    setUser(null)
    queryClient.clear()
  })

  useEffect(() => {
    run(bootstrapUser())
  }, [run])

  if (isIdle || isLoading) {
    return <FullPageLoading/>
  }

  if (isError) {
    return <FullPageErrorFallback error={error}/>
  }

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