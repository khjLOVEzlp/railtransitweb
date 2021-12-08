import { createContext, useContext, useState } from "react"
import { Navigate, Route, Routes } from "react-router";
import { useDocumentTitle } from 'hook/useDocumentTitle'
import { Layout } from "antd";
import { layout, paddingLayout } from "components/Styled";
import { PlanWork } from "./child/planWork";
import { WorkManage } from "./child/workManage";
import { PlanType } from "./child/planType";
import { useAuth } from "context/auth-context";
import { SiderMenu } from "components/SiderMenu";
import { menuIcon } from "utils/menuIcon";
const { Content } = Layout;

const PlanContext = createContext<{
  groupList: any
  setGroupList: (groupList: any) => void
  visible: boolean
  setVisible: (visible: boolean) => void
  detailVisible: boolean
  setDetailVisible: (detailVisible: boolean) => void
  editId: number | undefined
  setEditId: (editid: number | undefined) => void
} | undefined>(undefined)

export const Plan = () => {
  const { menu = [] } = useAuth()
  const menuList = menu?.find((res: any) => res.name === '作业计划').childMenu
  useDocumentTitle("作业计划")
  const [groupList, setGroupList] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [detailVisible, setDetailVisible] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | undefined>(undefined)

  return (
    <Layout style={layout}>
      <SiderMenu menuList={menuIcon(menuList)} />
      <Layout className="site-layout" style={paddingLayout}>
        <Content style={{ marginLeft: '0.5rem', display: "flex", flexDirection: "column", height: "100%" }}>
          <PlanContext.Provider value={{ groupList, setGroupList, visible, setVisible, editId, setEditId, detailVisible, setDetailVisible }}>
            {/* <Outlet /> */}
            <Routes>
              {/*projects/:projectId/kanban*/}
              <Route path={"/planWork"} element={<PlanWork />} />
              {/*projects/:projectId/epic*/}
              <Route path={"/workManage"} element={<WorkManage />} />
              <Route path={"/planType"} element={<PlanType />} />
              <Navigate to={window.location.pathname + "/" + menuList[0].url} replace={true} />
            </Routes>
          </PlanContext.Provider>
        </Content>
      </Layout>
    </Layout>
  )
}

export const usePlanContext = () => {
  const context = useContext(PlanContext)
  if (!context) {
    throw new Error("usePlanContext必须在Plan组件中使用")
  }
  return context
}
