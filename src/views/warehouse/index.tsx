import { Outlet } from "react-router";
import { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "hook/useDocumentTitle";
import { Button, Layout, Menu } from 'antd';
import {
  DatabaseOutlined,
  ToolOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
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

const WareHouseContext = createContext<{
  drawerId: number | undefined
  setDrawerId: (drawerId: number | undefined) => void
  editId: number | undefined
  setEditId: (editId: number | undefined) => void
} | undefined>(undefined)

export const Warehouse = () => {
  useDocumentTitle("库存管理")
  const [drawerId, setDrawerId] = useState<number | undefined>(undefined)
  const [editId, setEditId] = useState<number | undefined>(undefined)
  const [menu] = useState(JSON.parse(sessionStorage.menu).find((item: Item) => item.name === "库存管理").childMenu)
  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)

  menu.forEach((item: any) => {
    const name = item.name
    switch (name) {
      case "仓库管理":
        item["icon"] = DatabaseOutlined
        break;

      case "物资类型":
        item["icon"] = ToolOutlined
        break;

      case "入库记录":
        item["icon"] = ArrowDownOutlined
        break;

      case "出库记录":
        item["icon"] = ArrowUpOutlined
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
          <WareHouseContext.Provider value={{ drawerId, setDrawerId, editId, setEditId }}>
            <Outlet />
          </WareHouseContext.Provider>
        </Content>
      </Layout>
    </Layout>
  )
}

export const useWareHouseContext = () => {
  const context = useContext(WareHouseContext)
  if (!context) {
    throw new Error("useWareHouseContext必须在仓库管理模块使用")
  }
  return context
}

