import { Col, Divider, Modal, Row, Spin, Table, Tabs } from "antd";
import { useHistoryModal } from '../util'
const { TabPane } = Tabs;

export const ModalForm = () => {
  const { ModalOpen, planHistory, close, isLoading } = useHistoryModal()

  function callback(key: string) {
    console.log(key);
  }

  return (
    <Modal
      getContainer={false}
      title={"作业历史"}
      width={800}
      visible={ModalOpen}
      onCancel={close}
      footer={null}>
      {
        isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Row>
            <Col style={mb} span={12}>计划名称：{planHistory?.data.name}</Col>
            <Col span={12}>作业部门：{planHistory?.data.departmentName}</Col>

            <Col style={mb} span={12}>施工负责人：{planHistory?.data.leaderName}</Col>
            <Col span={12}>线路：{planHistory?.data.lineName}</Col>

            <Col style={mb} span={12}>作业区域：{planHistory?.data.workAddr}</Col>
            <Col span={12}>请站点：{planHistory?.data.pleaseName}</Col>

            <Col style={mb} span={12}>销站点：{planHistory?.data.pinName}</Col>
            <Col span={12}>作业类型：{planHistory?.data.workAddr}</Col>

            <Col style={mb} span={12}>开始时间：{planHistory?.data.beginTime}</Col>
            <Col span={12}>结束时间：{planHistory?.data.endTime}</Col>

            <Col style={mb} span={12}>提醒时间：{planHistory?.data.warnTime || "无"}</Col>
            <Col span={12}>作业日期：{planHistory?.data.dateTime || "无"}</Col>

            <Col style={mb} span={12}>是否自动提醒：{planHistory?.data.isWarn === 0 ? "否" : "是"}</Col>
            <Col span={12}>作业人数：{planHistory?.data.workPerson || "无"}</Col>

            <Col style={mb} span={12}>作业内容：{planHistory?.data.workContent || "无"}</Col>
            <Col span={12}>计划令号：{planHistory?.data.num || "无"}</Col>

            <Col style={mb} span={12}>备注：{planHistory?.data.remark || "无"}</Col>

            <Tabs defaultActiveKey="1" onChange={callback} style={{ width: "100%" }}>
              <TabPane tab="养护小组" key="1">
                <Table
                  pagination={false}
                  columns={[
                    {
                      title: "小组名称",
                      dataIndex: "personName"
                      // dataIndex: "groupName"
                    },
                    {
                      title: "内容",
                      dataIndex: "content"
                    }
                  ]}
                  dataSource={planHistory?.data.webGroupList}
                  childrenColumnName="personList"
                />
              </TabPane>
              <TabPane tab="签到人员" key="2">
                <Table
                  pagination={false}
                  columns={[
                    {
                      title: "签到人员",
                      dataIndex: "personName"
                    },
                    {
                      title: "签到时间",
                      dataIndex: "createTime"
                    }
                  ]}
                  dataSource={planHistory?.data.registrationList}
                />
              </TabPane>
              {/* <TabPane tab="操作记录" key="3">
                <Table
                  columns={[
                    {
                      title: "姓名",
                      dataIndex: "userName"
                    },
                    {
                      title: "内容",
                      dataIndex: "content"
                    }
                  ]}
                  dataSource={planHistory?.data.registrationList}
                />
              </TabPane> */}
              <TabPane tab="告警记录" key="3">
                <Table
                  pagination={false}
                  columns={[
                    {
                      title: "姓名",
                      dataIndex: "userName"
                    },
                    {
                      title: "内容",
                      dataIndex: "content"
                    }
                  ]}
                  dataSource={planHistory?.data.registrationList}
                />
              </TabPane>
            </Tabs>

            {/* <Col style={mb} span={12}>作业人员：{planHistory?.data.personList}</Col>
            <Col span={12}>防疫专员：{planHistory?.data.preventionPerson}</Col>

            <Col style={mb} span={12}>安全员{planHistory?.data.safePerson}</Col>
            <Col span={12}>施工负责人职责：{planHistory?.data.leaderDuty}</Col>

            <Col style={mb} span={12}>防疫专员职责：{planHistory?.data.preventionDuty}</Col>
            <Col span={12}>安全员职责：{planHistory?.data.safeDuty}</Col>

            <Col style={mb} span={12}>签到人员：{planHistory?.data.registrationList}</Col>
            <Col span={12}>养护小组：{planHistory?.data.webGroupList}</Col>

            <Col style={mb} span={12}>告警记录：{planHistory?.data.warnList}</Col>
            <Col span={12}>操作记录：{planHistory?.data.logList}</Col>

            <Col style={mb} span={12}>工厂清单：{planHistory?.data.signature}</Col>
            <Col span={12}>小组：{planHistory?.data.groupList}</Col> */}
          </Row>
        )
      }
    </Modal>
  )
}

const fw = { fontWeight: 800, fontSize: "1.6rem", width: "100%" }

const mb = { marginBottom: "1rem" }
