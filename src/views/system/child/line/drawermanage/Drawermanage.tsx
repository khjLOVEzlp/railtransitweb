import styled from "@emotion/styled";
import { Drawer, Tabs } from "antd";
import { useState } from "react";
import { Road } from './child/Road'
import { Platform } from "./child/Platform";
import { Class } from "./child/Class";
import {useProjectModal} from '../util'

const { TabPane } = Tabs;

function callback() {

}

export const Drawermanage = () => {
  const {
    ModalOpen,
    editingProject,
    close
  } = useProjectModal();
  const [navList] = useState([
    {
      name: "区间",
      id: 1,
      tem: <Road />,
    },
    {
      name: "地铁站台",
      id: 2,
      tem: <Platform />,
    },
    {
      name: "地铁班别",
      id: 3,
      tem: <Class />,
    }
  ])

  return (
    <>
      <Drawer
        title="地铁管理"
        placement="right"
        closable={true}
        width={1000}
        onClose={close}
        visible={ModalOpen}
        keyboard={false}
        maskClosable={false}
      >
        <div>
          <LineTitle>{editingProject?.data.name}</LineTitle>
          <div>备注：{editingProject?.data.remark}</div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            {
              navList.map((item: any) => <TabPane tab={item.name} key={item.id}>
                {item.tem}
              </TabPane>)
            }
          </Tabs>
        </div>
      </Drawer>
    </>
  );
}

const LineTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #48b4ff;
`