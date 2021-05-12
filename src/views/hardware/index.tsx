import styled from "@emotion/styled"
import { Button, Tabs } from "antd"
import React, { useEffect, useState } from "react"
import { useDocumentTitle } from "../../hook"
import { AlcoholController } from "./children/alcoholController/AlcoholController"
import { LabelController } from "./children/labelController/LabelController"
import { PlatfromController } from "./children/platfromController/PlatfromController"
import { RfidCardController } from "./children/rfidCardController/RfidCardController"
import { SeperateController } from './children/seperateController/SeperateController'
import { SimCardController } from "./children/simCardController/SimCardController"
import { TemperaterController } from "./children/temperaterController/TemperaterController"

import './index.css'

const { TabPane } = Tabs;
export const Hardware = () => {
  const [navList] = useState([
    {
      name: "防分离设备",
      id: 1,
      tem: <SeperateController />,
    },
    {
      name: "酒精测试仪设备",
      id: 2,
      tem: <AlcoholController />,
    },
    {
      name: "流量卡设备",
      id: 3,
      tem: <SimCardController />,
    },
    {
      name: "标签",
      id: 4,
      tem: <LabelController />,
    },
    {
      name: "手持机设备",
      id: 5,
      tem: <PlatfromController />,
    },
    {
      name: "工卡",
      id: 6,
      tem: <RfidCardController />,
    },
    {
      name: "体温设备",
      id: 7,
      tem: <TemperaterController />,
    },
  ])

  const callback = () => { }

  useDocumentTitle('设备管理')
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      {
        navList.map((item: any) => <TabPane tab={item.name} key={item.id}>
          <Main>
            {item.tem}
          </Main>
        </TabPane>)
      }
    </Tabs>
  )
}

const AlarmStyle = styled.div`

`

const Header = styled.div`
height: 13rem;
background: #fff;
margin-bottom: 1rem;
border-radius: 1rem;
display: flex;
align-items: center;
padding: 0 2rem;
> li {
  margin-right: 3rem;
  font-size: 2rem;
  cursor: pointer;
}
`

const Main = styled.div`
background: #fff;
border-radius: 1rem;
padding: 0 3rem;
overflow: hidden;
overflow-y: auto;
height: 73rem;
`
