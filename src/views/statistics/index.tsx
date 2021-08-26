import { Outlet } from "react-router";
import { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "../../hook/useDocumentTitle";
import { Button, Layout, Menu } from 'antd';
import {
  FileTextOutlined,
  AlertOutlined,
  BarChartOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { layout, menuItem, menuStyle, navLink, sider } from "components/Styled";
import { useRouteType } from "utils";
import React from "react";
const { Sider, Content } = Layout;

interface Item {
  name: string,
  url: string
}

const StatisticsContext = createContext<{
  visible: boolean
  setVisible: (visible: boolean) => void
  param: {
    time: string
    subwayId: string
  }
  setParam: (param: {
    time: string
    subwayId: string
  }) => void
} | undefined>(undefined)

export const Statistics = () => {
  const [menu] = useState(JSON.parse(sessionStorage.menu).find((item: Item) => item.name === "统计分析").childMenu)
  useDocumentTitle("统计分析")

  const [visible, setVisible] = useState<boolean>(false)
  const [param, setParam] = useState({
    time: "",
    subwayId: "",
  })

  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)
  menu.forEach((item: any) => {
    const url = item.url
    switch (url) {
      case "workCount":
        item["icon"] = FileTextOutlined
        break;

      case "workWarn":
        item["icon"] = AlertOutlined
        break;

      case "workPerson":
        item["icon"] = BarChartOutlined
        break;

      case "personMind":
        item["icon"] = PieChartOutlined
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
          <StatisticsContext.Provider value={{ param, setParam, visible, setVisible }}>
            <Outlet />
          </StatisticsContext.Provider>
        </Content>
      </Layout>
    </Layout>
  )
}

export const useStatisticsContext = () => {
  const context = useContext(StatisticsContext)
  if (!context) {
    throw new Error("useStatisticsContext必须在Statistics组件中使用")
  }
  return context
}
