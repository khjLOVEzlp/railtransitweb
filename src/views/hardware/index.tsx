import styled from "@emotion/styled"
import {Tabs} from "antd"
import React, {useState} from "react"
import {useDocumentTitle} from '../../hook/useDocumentTitle'
import {AlcoholController} from "./children/alcoholController/AlcoholController"
import {LabelController} from "./children/labelController/LabelController"
import {PlatfromController} from "./children/platfromController/PlatfromController"
import {RfidCardController} from "./children/rfidCardController/RfidCardController"
import {SeperateController} from './children/seperateController/SeperateController'
import {SimCardController} from "./children/simCardController/SimCardController"
import {TemperaterController} from "./children/temperaterController/TemperaterController"

import './index.css'

const {TabPane} = Tabs;
export const Hardware = () => {
  const [navList] = useState([
    {
      name: "防分离设备",
      id: 1,
      tem: <SeperateController/>,
    },
    {
      name: "酒精测试仪设备",
      id: 2,
      tem: <AlcoholController/>,
    },
    {
      name: "流量卡设备",
      id: 3,
      tem: <SimCardController/>,
    },
    {
      name: "标签",
      id: 4,
      tem: <LabelController/>,
    },
    {
      name: "手持机设备",
      id: 5,
      tem: <PlatfromController/>,
    },
    {
      name: "工卡",
      id: 6,
      tem: <RfidCardController/>,
    },
    {
      name: "体温设备",
      id: 7,
      tem: <TemperaterController/>,
    },
  ])

  const callback = () => {
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
  padding: 0 3rem;
  height: 73rem;
  overflow-y: auto;
`

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`