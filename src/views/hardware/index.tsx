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

{/* <SystemStyle>
      <Left>
        {
          menu.map((item: Item, index: number) => <li key={index}>
            <img src={`../../icon/${item.name}.png`} alt="" />
            <NavLink to={item.url} activeStyle={{ color: '#5A7FFA', fontWeight: 'bold' }}>{item.name}</NavLink>
          </li>)
        }
      </Left>
      <Right>
        <Outlet />
      </Right>
    </SystemStyle> */}

const SystemStyle = styled.div`
  display: flex;
  height: 100%;
`

const Left = styled.div`
  width: 16rem;
  background: #FFFFFF;
  border-radius: 14px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-left: 2rem;
  box-sizing: border-box;

  > li {
    font-size: 2rem;
    cursor: pointer;
    width: 100%;
    align-items: center;
    display: flex;
    flex: 1;

    > a {
      color: #747A89;
      margin-left: 1rem;
      width: 100%;
    }
  }
`

const Right = styled.div`
  border-radius: 14px;
  width: 100%;
  height: 100%;
  margin-left: 0.5%;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`