import { Navigate, Route, Routes } from "react-router";
import { useDocumentTitle } from "hook/useDocumentTitle";
import { Layout } from 'antd';
import { layout } from "components/Styled";
import { ModalProvider } from "context/modal-context";
import { PersonManage } from "./child/personManage";
import { SpiritStatus } from "./child/spiritStatus";
import { useAuth } from "context/auth-context";
import { SiderMenu } from "components/SiderMenu";
import { menuIcon } from "utils/menuIcon";
const { Content } = Layout;

interface Item {
  name: string,
  url: string
}

export const Person = () => {
  const { menu = [] } = useAuth()
  const menuList = menu.find((item: Item) => item.name === "人员管理").childMenu
  useDocumentTitle("人员管理")

  return (
    <Layout style={layout}>
      <SiderMenu menuList={menuIcon(menuList)} />
      <Layout className="site-layout">
        <Content style={{ marginLeft: '0.5rem', display: "flex", flexDirection: "column", height: "100%" }}>
          <ModalProvider>
            {/* <Outlet /> */}
            <Routes>
              {/*projects/:projectId/kanban*/}
              <Route path={"/personManage"} element={<PersonManage />} />
              {/*projects/:projectId/epic*/}
              <Route path={"/spiritStatus"} element={<SpiritStatus />} />
              <Navigate to={window.location.pathname + "/" + menuList[0].url} replace={true} />
            </Routes>
          </ModalProvider>
        </Content>
      </Layout>
    </Layout>
  )
}