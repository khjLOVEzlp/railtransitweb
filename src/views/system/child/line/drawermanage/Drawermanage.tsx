import styled from "@emotion/styled";
import { Drawer, Tabs } from "antd";
import React, { useState } from "react";
import { Road } from "./child/Road";
import { Platform } from "./child/Platform";
import { Class } from "./child/Class";

interface Props {
  isShowDrawer: boolean,
  setIsShowDrawer: (isShowDrawer: boolean) => void,
  formData: any
}

const { TabPane } = Tabs;

function callback() {

}

export const Drawermanage = ({ formData, setIsShowDrawer }: Props) => {
  const [visible, setVisible] = useState(true);
  const [navList] = useState([
    {
      name: "地铁路段",
      id: 1,
      tem: <Road formData={formData} />,
    },
    {
      name: "地铁站台",
      id: 2,
      tem: <Platform formData={formData} />,
    },
    {
      name: "地铁班别",
      id: 3,
      tem: <Class formData={formData} />,
    }
  ])

  const onClose = () => {
    setVisible(false);
    setIsShowDrawer(false)
  };

  return (
    <>
      <Drawer
        title="地铁管理"
        placement="right"
        closable={true}
        width={800}
        onClose={onClose}
        visible={visible}
        keyboard={false}
        maskClosable={false}
      >
        <div>
          <LineTitle>{formData.name}</LineTitle>
          <div>备注：{formData.remark}</div>
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