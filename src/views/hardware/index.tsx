import { Navigate, Outlet, Route, Routes } from "react-router";
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
import { ModalProvider } from "context/modal-context";
import { LabelController } from "./children/labelController/LabelController";
import { RfidCardController } from "./children/rfidCardController/RfidCardController";
import { PlatfromController } from "./children/platfromController/PlatfromController";
import Safehat from './children/safehat'
import Blood from './children/blood'
import { SimCardController } from "./children/simCardController/SimCardController";
import { SeperateController } from "./children/seperateController/SeperateController";
import { TemperaterController } from "./children/temperaterController/TemperaterController";
import { AlcoholController } from "./children/alcoholController/AlcoholController";
import { useAuth } from "context/auth-context";
const { Sider, Content } = Layout;

interface Item {
  name: string,
  url: string
}

export const Hardware = () => {
  const routeType = useRouteType();
  const { menu = [] } = useAuth()
  const menuList = menu.find((item: Item) => item.name === "设备管理").childMenu
  const [collapsed, setCollapsed] = useState(false)
  useDocumentTitle("设备管理")
  menuList?.forEach((item: any) => {
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
            menuList?.map((item: any) => (
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
              <Route path={"/label"} element={<LabelController />} />
              {/*projects/:projectId/epic*/}
              <Route path={"/rfid"} element={<RfidCardController />} />
              <Route path={"/platfrom"} element={<PlatfromController />} />
              <Route path={"/safehat"} element={<Safehat />} />
              <Route path={"/sim"} element={<SimCardController />} />
              <Route path={"/seperate"} element={<SeperateController />} />
              <Route path={"/temperater"} element={<TemperaterController />} />
              <Route path={"/alcohol"} element={<AlcoholController />} />
              <Route path={"/blood"} element={<Blood />} />
              <Navigate to={window.location.pathname + "/label"} replace={true} />
            </Routes>
          </ModalProvider>
        </Content>
      </Layout>
    </Layout>
  )
}