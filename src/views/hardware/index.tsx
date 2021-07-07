import styled from "@emotion/styled"
import { Tabs } from "antd"
import { useState } from "react"
import { useDocumentTitle } from '../../hook/useDocumentTitle'
import { AlcoholController } from "./children/alcoholController/AlcoholController"
import { LabelController } from "./children/labelController/LabelController"
import { PlatfromController } from "./children/platfromController/PlatfromController"
import { RfidCardController } from "./children/rfidCardController/RfidCardController"
import { SeperateController } from './children/seperateController/SeperateController'
import { SimCardController } from "./children/simCardController/SimCardController"
import { TemperaterController } from "./children/temperaterController/TemperaterController"
import {useSetUrlSearchParam} from 'hook/useUrlQueryParam'
import './index.css'

const { TabPane } = Tabs;
export const Hardware = () => {
  const setUrlParams = useSetUrlSearchParam()
  const [navList] = useState([
    {
      name: "防分离器",
      id: 1,
      tem: <SeperateController />,
    },
    {
      name: "酒精测试仪",
      id: 2,
      tem: <AlcoholController />,
    },
    {
      name: "流量卡",
      id: 3,
      tem: <SimCardController />,
    },
    {
      name: "标签",
      id: 4,
      tem: <LabelController />,
    },
    {
      name: "手持机",
      id: 5,
      tem: <PlatfromController />,
    },
    {
      name: "工卡",
      id: 6,
      tem: <RfidCardController />,
    },
    {
      name: "体温测试仪",
      id: 7,
      tem: <TemperaterController />,
    },
  ])

  const callback = () => {
    setUrlParams({index: "", size: "", name: ""})
  }

  useDocumentTitle('设备管理')
  return (
    <Container>
      <Tabs defaultActiveKey="1" onChange={callback}>
        {
          navList.map((item: any) => <TabPane tab={item.name} key={item.id}>
            <Main>
              {item.tem}
            </Main>
          </TabPane>)
        }
      </Tabs>
    </Container>
  )
}

const Main = styled.div`
  background: #fff;
  border-radius: 1rem;
  height: 73rem;
  padding: 0 3rem;
  overflow-y: auto;
`

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`