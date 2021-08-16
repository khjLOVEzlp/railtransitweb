import styled from "@emotion/styled";
import { Outlet } from "react-router";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from '../../hook/useDocumentTitle'
import {
  ApartmentOutlined,
  TabletOutlined,
  DeploymentUnitOutlined,
  ShakeOutlined,
  PushpinOutlined,
  BorderOutlined,
  ApiOutlined,
  NodeIndexOutlined,
  CustomerServiceOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { layout, menuItem, menuStyle, navLink, sider } from "components/Styled";
import { Button, Layout, Menu } from "antd";
import { useRouteType } from "utils";
import React from "react";
const { Sider, Content } = Layout;

interface Item {
  name: string,
  url: string
}

export const Hardware = () => {
  const routeType = useRouteType();
  const menu = JSON.parse(sessionStorage.menu).find((item: Item) => item.name === "设备管理").childMenu
  const [collapsed, setCollapsed] = useState(false)
  useDocumentTitle("系统管理")
  menu.forEach((item: any) => {
    const name = item.name
    switch (name) {
      case "防分离器":
        item["icon"] = ApartmentOutlined
        break;

      case "酒精测试仪":
        item["icon"] = ApiOutlined
        break;

      case "流量卡":
        item["icon"] = TabletOutlined
        break;

      case "标签":
        item["icon"] = DeploymentUnitOutlined
        break;

      case "体温测试仪":
        item["icon"] = ShakeOutlined
        break;

      case "手持机":
        item["icon"] = PushpinOutlined
        break;

      case "工卡":
        item["icon"] = BorderOutlined
        break;

      case "安全帽":
        item["icon"] = CustomerServiceOutlined
        break;

      case "血压测试仪":
        item["icon"] = NodeIndexOutlined
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
        {/* @ */}
        <Content style={{ marginLeft: '1rem', display: "flex", flexDirection: "column", height: "100%" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}