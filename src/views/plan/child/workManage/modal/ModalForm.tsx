import {Col, Modal, Row, Spin} from "antd";
import {useHistoryModal} from '../util'

export const ModalForm = () => {
  const {ModalOpen, planHistory, close, isLoading} = useHistoryModal()

  return (
    <Modal
      title={"作业历史"}
      width={800}
      visible={ModalOpen}
      onCancel={close}
      footer={null}>
      {
        isLoading ? (
          <Spin size={"large"}/>
        ) : (
          <Row>
            <Col style={mb} span={12}>开始时间：{planHistory?.data.beginTime}</Col>
            <Col span={12}>部门名称：{planHistory?.data.departmentName}</Col>
            <Col style={mb} span={12}>负责人：{planHistory?.data.leaderName}</Col>
            <Col span={12}>地铁路线：{planHistory?.data.lineName}</Col>
            <Col style={mb} span={12}>销站点：{planHistory?.data.pinName}</Col>
            <Col span={12}>请站点：{planHistory?.data.pleaseName}</Col>
            {
              planHistory?.data.groupList.map((item: any) => (
                <div key={item.id} style={{width: "100%", display: "flex", flexWrap: "wrap"}}>
                  <Col span={12} style={mb}>小组名称：{item.groupName}</Col>
                  <Col span={12} style={mb}>组长：{item.leaderName}</Col>
                  {
                    item.personList.map((key: any) => (
                      <Col key={key.id} span={12} style={mb}>作业人员：{key.personName}</Col>
                    ))
                  }
                </div>
              ))
            }
            {/* <Col style={mb} span={12}>备注：{data?.data.remark}</Col> */}
          </Row>
        )
      }
    </Modal>
  )
}

const mb = {marginBottom: "1rem"}
