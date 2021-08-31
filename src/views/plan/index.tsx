import { createContext, useContext, useState } from "react"
import { Navigate, Route, Routes } from "react-router";
import { NavLink } from "react-router-dom"
import { useDocumentTitle } from 'hook/useDocumentTitle'
import {
  FileSearchOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu } from "antd";
import { layout, menuItem, menuStyle, navLink, sider } from "components/Styled";
import { useRouteType } from "utils";
import React from "react";
import { PlanWork } from "./child/planWork";
import { WorkManage } from "./child/workManage";
import { PlanType } from "./child/planType";
import { useAuth } from "context/auth-context";
const { Sider, Content } = Layout;

const PlanContext = createContext<{
  groupList: any
  setGroupList: (groupList: any) => void
  visible: boolean
  setVisible: (visible: boolean) => void
  detailVisible: boolean
  setDetailVisible: (detailVisible: boolean) => void
  editId: number | undefined
  setEditId: (editid: number | undefined) => void
} | undefined>(undefined)

export const Plan = () => {
  const { menu = [] } = useAuth()
  const menuList = menu?.find((res: any) => res.name === '作业计划').childMenu
  useDocumentTitle("作业计划")
  const [groupList, setGroupList] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [detailVisible, setDetailVisible] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | undefined>(undefined)
  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)

  menuList?.forEach((item: any) => {
    const url = item.url
    switch (url) {
      case "planWork":
        item["icon"] = FileSearchOutlined
        break;

      case "planType":
        item["icon"] = AppstoreOutlined
        break;

      case "workManage":
        item["icon"] = ClockCircleOutlined
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
                <NavLink to={item.url} style={navLink}>{item.name}</NavLink>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ marginLeft: '0.5rem', display: "flex", flexDirection: "column", height: "100%" }}>
          <PlanContext.Provider value={{ groupList, setGroupList, visible, setVisible, editId, setEditId, detailVisible, setDetailVisible }}>
            {/* <Outlet /> */}
            <Routes>
              {/*projects/:projectId/kanban*/}
              <Route path={"/planWork"} element={<PlanWork />} />
              {/*projects/:projectId/epic*/}
              <Route path={"/workManage"} element={<WorkManage />} />
              <Route path={"/planType"} element={<PlanType />} />
              <Navigate to={window.location.pathname + "/planWork"} replace={true} />
            </Routes>
          </PlanContext.Provider>
        </Content>
      </Layout>
    </Layout>
  )
}

export const usePlanContext = () => {
  const context = useContext(PlanContext)
  if (!context) {
    throw new Error("usePlanContext必须在Plan组件中使用")
  }
  return context
}
