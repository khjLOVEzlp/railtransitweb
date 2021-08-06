import styled from "@emotion/styled"
import React, { createContext, useContext, useState } from "react"
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom"
import { useDocumentTitle } from '../../hook/useDocumentTitle'
import {
  FileSearchOutlined,
  AppstoreOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { Layout, Menu } from "antd";
import { layout, menuItem, menuStyle, navLink, sider } from "components/Styled";
import { useRouteType } from "utils";
const { Sider, Content } = Layout;

const PlanContext = createContext<{
  groupList: any
  setGroupList: (groupList: any) => void
  visible: boolean
  setVisible: (visible: boolean) => void
  editId: number | undefined
  setEditId: (editid: number | undefined) => void
} | undefined>(undefined)

export const Plan = () => {
  const [menu] = useState(JSON.parse(sessionStorage.menu).find((res: any) => res.name === '作业计划').childMenu)
  useDocumentTitle("作业计划")
  const [groupList, setGroupList] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | undefined>(undefined)
  const routeType = useRouteType();
  const [collapsed, setCollapsed] = useState(false)

  menu.forEach((item: any) => {
    const name = item.name
    switch (name) {
      case "作业计划":
        item["icon"] = FileSearchOutlined
        break;

      case "作业类型":
        item["icon"] = AppstoreOutlined
        break;

      case "作业历史":
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
          <PlanContext.Provider value={{ groupList, setGroupList, visible, setVisible, editId, setEditId }}>
            <Outlet />
          </PlanContext.Provider>
        </Content>
      </Layout>
    </Layout>
  )
}

{/* <PlanStyle>
  <Left>
    {
      asid.map((item: any, index: number) => <li key={index}>
        <img src={`../../icon/${item.name}.png`} alt="" />
        <NavLink to={item.url} activeStyle={{ color: '#5A7FFA', fontWeight: 'bold' }}>
          {item.name}
        </NavLink>
      </li>)
    }
  </Left>
  <Right>
    <PlanContext.Provider value={{ groupList, setGroupList, visible, setVisible, editId, setEditId }}>
      <Outlet />
    </PlanContext.Provider>
  </Right>
</PlanStyle> */}

export const usePlanContext = () => {
  const context = useContext(PlanContext)
  if (!context) {
    throw new Error("usePlanContext必须在作业计划模块中使用")
  }
  return context
}

const PlanStyle = styled.div`
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
  height: 100%;
  margin-left: 0.5%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`