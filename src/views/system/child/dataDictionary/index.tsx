import styled from "@emotion/styled"
import { Tabs } from "antd";
import React, { useState } from "react";
import { useDocumentTitle } from "../../../../hook";
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

  const callback = () => { }
  useDocumentTitle('数据字典')

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        {
          navList.map((item: any) => <TabPane tab={item.name} key={item.id}>
            <Main>
              {item.tem}
            </Main>
          </TabPane>)
        }
      </Tabs>
    </div>
  )
}

const Header = styled.div`
height: 13rem;
background: #fff;
margin-bottom: 1rem;
border-radius: 1rem;
display: flex;
align-items: center;
padding: 0 2rem;
justify-content: space-between;
`

const Main = styled.div`
background: #fff;
height: 73rem;
border-radius: 1rem;
padding: 0 1.5rem;
overflow-y: auto;
`