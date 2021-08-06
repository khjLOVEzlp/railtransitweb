import { Outlet } from "react-router";
import { useState } from "react";
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

export const Warehouse = () => {
  const [menu] = useState(JSON.parse(sessionStorage.menu).find((item: Item) => item.name === "库存管理").childMenu)
  useDocumentTitle("库存管理")
  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

{/* <SystemStyle>
      <Left>
        {
          asid.map((item: Item, index: number) => <li key={index}>
            <img src={`../../icon/${item.name}.png`} alt="" />
            <NavLink to={item.url} activeStyle={{ color: '#5A7FFA', fontWeight: 'bold' }}>{item.name}</NavLink>
          </li>)
        }
      </Left>
      <Right>
        <Outlet />
      </Right>
    </SystemStyle> */}

/* const SystemStyle = styled.div`
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
  align-items: center;
  padding-left: 2rem;
  box-sizing: border-box;

  > li {
    font-size: 2rem;
    cursor: pointer;
    width: 100%;
    align-items: center;
    display: flex;
    height: 6rem;

    > a {
      color: #747A89;
      margin-left: 1rem;
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
` */