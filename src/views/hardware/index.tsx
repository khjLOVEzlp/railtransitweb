import { Navigate, Route, Routes } from "react-router";
import { useDocumentTitle } from 'hook/useDocumentTitle'
import { layout, paddingLayout } from "components/Styled";
import { Layout } from "antd";
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
import { SiderMenu } from "components/SiderMenu";
import { menuIcon } from "utils/menuIcon";

const { Content } = Layout;

interface Item {
  name: string,
  url: string
}

export const Hardware = () => {
  const { menu = [] } = useAuth()
  const menuList = menu.find((item: Item) => item.name === "设备管理").childMenu
  useDocumentTitle("设备管理")

  return (
    <Layout style={layout}>
      <SiderMenu menuList={menuIcon(menuList)} />
      <Layout className="site-layout" style={paddingLayout}>
        <Content
          style={{ marginLeft: '0.5rem', display: "flex", flexDirection: "column", height: "100%" }}
        >
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
              <Navigate to={window.location.pathname + "/" + menuList[0].url} replace={true} />
            </Routes>
          </ModalProvider>
        </Content>
      </Layout>
    </Layout>
  )
}