import { Outlet } from "react-router";
import { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "../../hook/useDocumentTitle";
import { Layout, Menu } from 'antd';
import {
  DatabaseOutlined,
  ToolOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { layout, menuItem, menuStyle, navLink, sider } from "components/Styled";
import { useRouteType } from "utils";
const { Sider, Content } = Layout;
interface Item {
  name: string,
  url: string
}

const WareHouseContext = createContext<{
  visible: boolean
  setVisible: (visible: boolean) => void
  editId: number | undefined
  setEditId: (editId: number | undefined) => void
} | undefined>(undefined)

export const Warehouse = () => {
  useDocumentTitle("库存管理")
  const [menu] = useState(JSON.parse(sessionStorage.menu).find((item: Item) => item.name === "库存管理").childMenu)
  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | undefined>(undefined)

  menu.forEach((item: any) => {
    const name = item.name
    switch (name) {
      case "仓库管理":
        item["icon"] = DatabaseOutlined
        break;

      case "工具类型":
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
          <WareHouseContext.Provider value={{ visible, setVisible, editId, setEditId }}>
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

