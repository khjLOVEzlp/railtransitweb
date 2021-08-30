import { Navigate, Outlet, Route, Routes } from "react-router";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from '../../hook/useDocumentTitle'
import { Button, Layout, Menu } from 'antd';
import {
  UserOutlined,
  UsergroupAddOutlined,
  MenuOutlined,
  LoginOutlined,
  SecurityScanOutlined,
  DatabaseOutlined,
  NodeExpandOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { layout, menuItem, menuStyle, navLink, sider } from "components/Styled";
import { useRouteType } from "utils";
import React from "react";
import { ModalProvider } from "context/modal-context";
import { User } from "./child/user";
import { Role } from "./child/role";
import { Log } from "./child/log";
import { MenuRender } from './child/menu'
import { Department } from "./child/department";
import { DataDictionary } from "./child/dataDictionary";
import { Line } from "./child/line";
const { Sider, Content } = Layout;
/**
 * 用户管理<UserOutlined />
 * 角色管理<UsergroupAddOutlined />
 * 菜管理<MenuOutlined />
 * 日志管理<LoginOutlined />
 * 部门管理<SecurityScanOutlined />
 * 数据字典<DatabaseOutlined />
 * 地铁管理<NodeExpandOutlined />
 * 防分离器<ApartmentOutlined />
 * 酒精测试仪<ApiOutlined />
 * 流量卡<TabletOutlined />
 * 标签<DeploymentUnitOutlined />
 * 体温测试仪<ShakeOutlined />
 * 手持机<PushpinOutlined />
 * 工卡<BorderOutlined />
 * 人员管理<UsergroupAddOutlined />
 * 精神状态<ExclamationCircleOutlined />
 * 仓库管理<DatabaseOutlined />
 * 工具类型<ToolOutlined />
 * 入库记录<ArrowDownOutlined />
 * 出库记录<ArrowUpOutlined />
 * 作业统计<FileTextOutlined />
 * 告警统计<AlertOutlined />
 * 到岗统计<BarChartOutlined />
 * 精神分析<PieChartOutlined />
 * 作业计划<FileSearchOutlined />
 * 作业类型<AppstoreOutlined />
 * 作业历史<ClockCircleOutlined />
 */

interface Item {
  name: string,
  url: string
}

export const System = () => {
  useDocumentTitle("系统管理")
  const menu = JSON.parse(sessionStorage.menu).find((item: Item) => item.name === "系统管理").childMenu
  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)
  menu.forEach((item: any) => {
    const url = item.url
    switch (url) {
      case "user":
        item["icon"] = UserOutlined
        break;

      case "role":
        item["icon"] = UsergroupAddOutlined
        break;

      case "menu":
        item["icon"] = MenuOutlined
        break;

      case "log":
        item["icon"] = LoginOutlined
        break;

      case "department":
        item["icon"] = SecurityScanOutlined
        break;

      case "dataDictionary":
        item["icon"] = DatabaseOutlined
        break;

      case "line":
        item["icon"] = NodeExpandOutlined
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
            menu.map((item: any) => (
              <Menu.Item key={item.url} style={menuItem} icon={<item.icon />}>
                <NavLink to={item.url} style={navLink}>{item.name}</NavLink>
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
              <Route path={"/user"} element={<User />} />
              {/*projects/:projectId/epic*/}
              <Route path={"/role"} element={<Role />} />
              <Route path={"/menu"} element={<MenuRender />} />
              <Route path={"/log"} element={<Log />} />
              <Route path={"/department"} element={<Department />} />
              <Route path={"/dataDictionary"} element={<DataDictionary />} />
              <Route path={"/line"} element={<Line />} />
              <Navigate to={window.location.pathname + "/user"} replace={true} />
            </Routes>
          </ModalProvider>
        </Content>
      </Layout>
    </Layout>
  )
}
