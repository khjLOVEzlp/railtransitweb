import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "../../hook/useDocumentTitle";
import { Layout, Menu } from 'antd';
import {
  UsergroupAddOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { layout, menuItem, menuStyle, navLink, sider } from "components/Styled";
import { useRouteType } from "utils";
import { useState } from "react";
const { Sider, Content } = Layout;

interface Item {
  name: string,
  url: string
}

export const Person = () => {
  const menu = JSON.parse(sessionStorage.menu).find((item: Item) => item.name === "人员管理").childMenu
  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)
  useDocumentTitle("人员管理")

  menu.forEach((item: any) => {
    const name = item.name
    switch (name) {
      case "人员管理":
        item["icon"] = UsergroupAddOutlined
        break;

      case "精神状态":
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
      // trigger={<span>显示/隐藏</span>}
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
        <Content style={{ marginLeft: '1rem', display: "flex", flexDirection: "column", height: "100%" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}