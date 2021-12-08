import { Navigate, Route, Routes } from "react-router";
import { createContext, useContext, useState } from "react";
import { useDocumentTitle } from "hook/useDocumentTitle";
import { Layout } from 'antd';
import { layout, paddingLayout } from "components/Styled";
import { WorkCount } from "./child/workCount";
import { WorkWarn } from "./child/workWarn";
import { WorkPerson } from "./child/workPerson";
import { PersonMind } from "./child/personMind";
import { useAuth } from "context/auth-context";
import { SiderMenu } from "components/SiderMenu";
import { menuIcon } from "utils/menuIcon";
const { Content } = Layout;

interface Item {
  name: string,
  url: string
}

const StatisticsContext = createContext<{
  visible: boolean
  setVisible: (visible: boolean) => void
  param: {
    time: string
    subwayId: string
    type: string
  }
  setParam: (param: {
    time: string
    subwayId: string
    type: string
  }) => void
} | undefined>(undefined)

export const Statistics = () => {
  const { menu = [] } = useAuth()
  const menuList = menu?.find((item: Item) => item.name === "统计分析").childMenu
  useDocumentTitle("统计分析")

  const [visible, setVisible] = useState<boolean>(false)
  const [param, setParam] = useState({
    time: "",
    subwayId: "",
    type: ""
  })

  return (
    <Layout style={layout}>
      <SiderMenu menuList={menuIcon(menuList)} />
      <Layout className="site-layout" style={paddingLayout}>
        <Content style={{ marginLeft: '0.5rem', display: "flex", flexDirection: "column", height: "100%" }}>
          <StatisticsContext.Provider value={{ param, setParam, visible, setVisible }}>
            {/* <Outlet /> */}
            <Routes>
              {/*projects/:projectId/kanban*/}
              <Route path={"/workCount"} element={<WorkCount />} />
              {/*projects/:projectId/epic*/}
              <Route path={"/workWarn"} element={<WorkWarn />} />
              <Route path={"/workPerson"} element={<WorkPerson />} />
              <Route path={"/personMind"} element={<PersonMind />} />
              <Navigate to={window.location.pathname + "/" + menuList[0].url} replace={true} />
            </Routes>
          </StatisticsContext.Provider>
        </Content>
      </Layout>
    </Layout>
  )
}

export const useStatisticsContext = () => {
  const context = useContext(StatisticsContext)
  if (!context) {
    throw new Error("useStatisticsContext必须在Statistics组件中使用")
  }
  return context
}
