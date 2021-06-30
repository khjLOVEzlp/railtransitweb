import styled from "@emotion/styled";
import { Drawer, Tabs } from "antd";
import { useState } from "react";
import { Road } from './child/Road'
import { Platform } from "./child/Platform";
import { Class } from "./child/Class";
import { QueryClient } from "react-query";
import { useDetail } from "../line";

interface Props {
  isShowDrawer: boolean
  setIsShowDrawer: (isShowDrawer: boolean) => void
  id: number | undefined
}

const { TabPane } = Tabs;

function callback() {

}

export const Drawermanage = ({ setIsShowDrawer, id }: Props) => {
  const { data: lineDetail } = useDetail(id)
  const [visible, setVisible] = useState(true);
  const [navList] = useState([
    {
      name: "区间",
      id: 1,
      tem: <Road id={id} />,
    },
    {
      name: "地铁站台",
      id: 2,
      tem: <Platform id={id} />,
    },
    {
      name: "地铁班别",
      id: 3,
      tem: <Class id={id} />,
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
          <LineTitle>{lineDetail?.data.name}</LineTitle>
          <div>备注：{lineDetail?.data.remark}</div>
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