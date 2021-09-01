import { Navigate, Route, Routes } from "react-router";
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
import { MaterialType } from "./child/materialType";
import { ToolType } from "./child/toolType";
import { InWarehouse } from "./child/inWarehouse";
import { OutWarehouse } from "./child/outWarehouse";
import { useAuth } from "context/auth-context";
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
  // 仓库种类Id
  const [drawerId, setDrawerId] = useState<number | undefined>(undefined)
  // 物资种类Id
  const [editId, setEditId] = useState<number | undefined>(undefined)
  const { menu = [] } = useAuth()
  const menuList = menu?.find((item: Item) => item.name === "库存管理").childMenu
  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)

  menuList?.forEach((item: any) => {
    const url = item.url
    switch (url) {
      case "toolType":
        item["icon"] = DatabaseOutlined
        break;

      case "materialType":
        item["icon"] = ToolOutlined
        break;

      case "inWarehouse":
        item["icon"] = ArrowDownOutlined
        break;

      case "outWarehouse":
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
          <WareHouseContext.Provider value={{ drawerId, setDrawerId, editId, setEditId }}>
            {/* <Outlet /> */}
            <Routes>
              {/*projects/:projectId/kanban*/}
              <Route path={"/materialType"} element={<MaterialType />} />
              {/*projects/:projectId/epic*/}
              <Route path={"/toolType"} element={<ToolType />} />
              <Route path={"/inWarehouse"} element={<InWarehouse />} />
              <Route path={"/outWarehouse"} element={<OutWarehouse />} />
              <Navigate to={window.location.pathname + "/" + menuList[0].url} replace={true} />
            </Routes>
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

