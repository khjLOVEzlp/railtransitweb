import styled from "@emotion/styled"
import { Tabs } from "antd";
import React, { useState } from "react";
import './index.css'
import { DictItem } from "./dictItem/DictItem";
import { DictType } from "./dictType/DictType";

const { TabPane } = Tabs;
export const DataDictionary = () => {
  const [navList] = useState([
    {
      name: "数据字典类型",
      id: 1,
      tem: <DictType />,
    },
    {
      name: "数据字典数据",
      id: 2,
      tem: <DictItem />,
    }
  ])

  const callback = () => {
  }

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback} style={{ height: "100%" }}>
        {
          navList.map((item: any) => <TabPane tab={item.name} key={item.id} style={{ height: "100%" }}>
            <Main>
              {item.tem}
            </Main>
          </TabPane>)
        }
      </Tabs>
    </>
  )
}

const Main = styled.div`
  background: #fff;
  height: 100%;
  border-radius: 1rem;
  padding: 0 1.5rem;
  overflow-y: auto;
`