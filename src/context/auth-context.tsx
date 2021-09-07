import styled from "@emotion/styled";
import { Spin } from "antd";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as auth from "../auth-provider";
import { useAsync } from "../hook/useAsync";
import { FullPageErrorFallback } from "../components/lib";
import { useQueryClient } from "react-query";
import { FullPageLoading } from "components/FullPageLoading";
const AuthContext = createContext<
  {
    user: {
      jwtToken: string;
      loginName?: string;
      userName?: string;
      userId?: number;
    } | null;
    login: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
    notice: boolean;
    menu: any
    setNotice: (notice: boolean) => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    editId: number | undefined;
    setEditId: (editId: number | undefined) => void;
    drawer: boolean;
    setDrawer: (drawer: boolean) => void;
    menuRender: any
  }
  | undefined
>(undefined);

interface AuthForm {
  loginName: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const users = sessionStorage.getItem("user");
  if (users) {
    const data = JSON.parse(users);
    user = data;
  }
  return user;
};

const bootstrapMenu = async () => {
  let menu = null;
  const menus = sessionStorage.getItem("menu");
  if (menus) {
    const data = JSON.parse(menus);
    menu = data;
  }
  return menu;
};

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
    jwtToken: string;
    loginName?: string;
    userName?: string;
    userId?: number;
  } | null>();

  const {
    data: menu,
    run: menuRun,
    setData: setMenu,
    isLoading: menuLoading,
    isIdle: isMenuIdle
  } = useAsync<any>();

  const queryClient = useQueryClient();

  const [notice, setNotice] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [drawer, setDrawer] = useState<boolean>(false);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  // @ts-ignore
  const menuRender = () => auth.menuRender().then(setMenu)

  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useEffect(() => {
    run(bootstrapUser());
    menuRun(bootstrapMenu())
  }, [run, menuRun]);

  if (isIdle || isLoading || menuLoading || isMenuIdle) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{
        user,
        login,
        logout,
        menu,
        notice,
        setNotice,
        visible,
        setVisible,
        editId,
        setEditId,
        drawer,
        setDrawer,
        menuRender
      }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
