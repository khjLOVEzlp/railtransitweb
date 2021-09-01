import { Navigate, Outlet, Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "../../hook/useDocumentTitle";
import { Button, Layout, Menu } from 'antd';
import {
  UsergroupAddOutlined,
  ExclamationCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { layout, menuItem, menuStyle, navLink, sider } from "components/Styled";
import { useRouteType } from "utils";
import { useState } from "react";
import React from "react";
import { ModalProvider } from "context/modal-context";
import { PersonManage } from "./child/personManage";
import { SpiritStatus } from "./child/spiritStatus";
import { useAuth } from "context/auth-context";
const { Sider, Content } = Layout;

interface Item {
  name: string,
  url: string
}

export const Person = () => {
  const { menu = [] } = useAuth()
  const menuList = menu.find((item: Item) => item.name === "人员管理").childMenu
  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)
  useDocumentTitle("人员管理")

  menuList?.forEach((item: any) => {
    const url = item.url
    switch (url) {
      case "personManage":
        item["icon"] = UsergroupAddOutlined
        break;

      case "spiritStatus":
        item["icon"] = ExclamationCircleOutlined
        break;

      default:
        break;
    }
  })

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={layout}>
      <Sider
        width={160}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        theme="light"
        style={sider}
        collapsedWidth={60}
        trigger={<Button type="link" onClick={onCollapse} style={{ marginBottom: 16 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, { className: "trigger" })}
        </Button>}
      >
        <Menu selectedKeys={[routeType]} style={menuStyle}>
          {
            menuList?.map((item: any) => (
              <Menu.Item key={item.url} style={menuItem} icon={<item.icon />}>
                <NavLink to={item.url.replace('/', '')} style={navLink}>{item.name}</NavLink>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ marginLeft: '0.5rem', display: "flex", flexDirection: "column", height: "100%" }}>
          <ModalProvider>
            {/* <Outlet /> */}
            <Routes>
              {/*projects/:projectId/kanban*/}
              <Route path={"/personManage"} element={<PersonManage />} />
              {/*projects/:projectId/epic*/}
              <Route path={"/spiritStatus"} element={<SpiritStatus />} />
              <Navigate to={window.location.pathname + "/" + menuList[0].url} replace={true} />
            </Routes>
          </ModalProvider>
        </Content>
      </Layout>
    </Layout>
  )
}