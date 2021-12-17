import styled from "@emotion/styled";
import { Divider, Modal, Tabs } from "antd";
import { useState } from "react";
import { Class } from "../drawermanage/child/class/Class";
import { Platform } from "../drawermanage/child/platForm/Platform";
import { Road } from "../drawermanage/child/road/Road";
import { useProjectModal } from "../util";
import ic from "assets/n/main-jihua-addicon1.png";
const { TabPane } = Tabs;

export const LineManageModal = () => {
  const { ModalOpen, editingProject, close } = useProjectModal();

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
    },
  ]);

  return (
    <Modal
      title={"地铁管理"}
      visible={ModalOpen}
      onCancel={close}
      width="80%"
      footer={false}
    >
      <div>
        <LineTitle>
          <div className="icon">
            <img src={ic} alt="" />
          </div>
          <div className="title">{editingProject?.data.name}</div>
          <div className="remark">(备注：{editingProject?.data.remark})</div>
        </LineTitle>
        {/* dashed */}
        <Divider />
        <Tabs defaultActiveKey="1" size="small" type="card">
          {navList.map((item: any) => (
            <TabPane tab={item.name} key={item.id}>
              {item.tem}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </Modal>
  );
};

const LineTitle = styled.h1`
  display: flex;
  align-items: center;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #1b81ff;
  }

  .remark {
    font-size: 14px;
    color: #aaaaaa;
    margin-left: 20px;
  }
`;
