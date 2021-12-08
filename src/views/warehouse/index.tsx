import { Navigate, Route, Routes } from "react-router";
import { createContext, useContext, useState } from "react";
import { useDocumentTitle } from "hook/useDocumentTitle";
import { Layout } from 'antd';
import { layout, paddingLayout } from "components/Styled";
import { MaterialType } from "./child/materialType";
import { ToolType } from "./child/toolType";
import { InWarehouse } from "./child/inWarehouse";
import { OutWarehouse } from "./child/outWarehouse";
import { useAuth } from "context/auth-context";
import { SiderMenu } from "components/SiderMenu";
import { menuIcon } from "utils/menuIcon";
const { Content } = Layout;
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

  return (
    <Layout style={layout}>
      <SiderMenu menuList={menuIcon(menuList)} />
      <Layout className="site-layout" style={paddingLayout}>
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

