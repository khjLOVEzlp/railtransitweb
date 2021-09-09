import { Navigate, Route, Routes } from "react-router";
import { useDocumentTitle } from 'hook/useDocumentTitle'
import { Layout } from 'antd';
import { layout } from "components/Styled";
import { ModalProvider } from "context/modal-context";
import { User } from "./child/user";
import { Role } from "./child/role";
import { Log } from "./child/log";
import { MenuRender } from './child/menu'
import { Department } from "./child/department";
import { DataDictionary } from "./child/dataDictionary";
import { Line } from "./child/line";
import { useAuth } from "context/auth-context";
import { SiderMenu } from "components/SiderMenu";
import { menuIcon } from "utils/menuIcon";
const { Content } = Layout;
/**
 * 用户管理<UserOutlined />
 * 角色管理<UsergroupAddOutlined />
 * 菜管理<MenuOutlined />
 * 日志管理<LoginOutlined />
 * 部门管理<SecurityScanOutlined />
 * 数据字典<DatabaseOutlined />
 * 地铁管理<NodeExpandOutlined />
 * 防分离器<ApartmentOutlined />
 * 酒精测试仪<ApiOutlined />
 * 流量卡<TabletOutlined />
 * 标签<DeploymentUnitOutlined />
 * 体温测试仪<ShakeOutlined />
 * 手持机<PushpinOutlined />
 * 工卡<BorderOutlined />
 * 人员管理<UsergroupAddOutlined />
 * 精神状态<ExclamationCircleOutlined />
 * 仓库管理<DatabaseOutlined />
 * 工具类型<ToolOutlined />
 * 入库记录<ArrowDownOutlined />
 * 出库记录<ArrowUpOutlined />
 * 作业统计<FileTextOutlined />
 * 告警统计<AlertOutlined />
 * 到岗统计<BarChartOutlined />
 * 精神分析<PieChartOutlined />
 * 作业计划<FileSearchOutlined />
 * 作业类型<AppstoreOutlined />
 * 作业历史<ClockCircleOutlined />
 */

interface Item {
  name: string,
  url: string
}

export const System = () => {
  useDocumentTitle("系统管理")
  const { menu = [] } = useAuth()
  const menuList = menu.find((item: Item) => item.name === "系统管理").childMenu

  return (
    <Layout style={layout}>
      <SiderMenu menuList={menuIcon(menuList)} />
      <Layout className="site-layout">
        <Content style={{ marginLeft: '0.5rem', display: "flex", flexDirection: "column", height: "100%" }}>
          <ModalProvider>
            {/* <Outlet /> */}
            <Routes>
              {/*projects/:projectId/kanban*/}
              <Route path={"/user"} element={<User />} />
              {/*projects/:projectId/epic*/}
              <Route path={"/role"} element={<Role />} />
              <Route path={"/menu"} element={<MenuRender />} />
              <Route path={"/log"} element={<Log />} />
              <Route path={"/department"} element={<Department />} />
              <Route path={"/dataDictionary"} element={<DataDictionary />} />
              <Route path={"/line"} element={<Line />} />
              <Navigate to={window.location.pathname + "/" + menuList[0].url} replace={true} />
            </Routes>
          </ModalProvider>
        </Content>
      </Layout>
    </Layout>
  )
}
