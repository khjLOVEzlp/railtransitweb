import styled from "@emotion/styled";
import { Spin } from "antd";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as auth from '../auth-provider'
import { useAsync } from "../hook/useAsync";
import { FullPageErrorFallback } from "../components/lib";
import { useQueryClient } from "react-query";

const AuthContext = createContext<| {
  user: {
    jwtToken: string,
    loginName?: string
    userName?: string
    userId?: number
  } | null;
  login: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  editId: number | undefined
  setEditId: (editId: number | undefined) => void
  drawer: boolean
  setDrawer: (drawer: boolean) => void
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
  const users = sessionStorage.getItem('user')
  if (users) {
    const data = JSON.parse(users)
    user = data
  }
  return user;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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

  const [visible, setVisible] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | undefined>(undefined)
  const [drawer, setDrawer] = useState<boolean>(false)

  const login = (form: AuthForm) => auth.login(form).then(setUser)

  const logout = () => auth.logout().then(() => {
    setUser(null)
    queryClient.clear()
  })

  useEffect(() => {
    run(bootstrapUser())
  }, [run])

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider children={children} value={{ user, login, logout, visible, setVisible, editId, setEditId, drawer, setDrawer }} />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}