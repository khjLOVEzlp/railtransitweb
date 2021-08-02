import { Button, Col, Form, message, Modal, Row, Select, Spin } from "antd";
import { rules } from "utils/verification";
import { useUserAll } from "views/system/child/user/request";
import { useSharePlan } from '../request'
import { useShareModal } from '../util'

const { Option } = Select

export const ShareModalForm = () => {
  const [form] = Form.useForm();
  const { ModalOpen, close, publishPlanWorkId, isLoading, editingPlanWork } = useShareModal()
  const { mutateAsync, isLoading: mutaLoading } = useSharePlan()
  const { data: personList } = useUserAll()

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...value, planId: publishPlanWorkId }).then(() => {
      message.success("发布成功")
      form.resetFields()
      close()
    })
  }

  const onOk = () => {
    form.submit();
  };

  const isStatus = (id: number) => {
    if (id === 2) {
      return "驳回"
    } else if (id === 1) {
      return "通过"
    } else {
      return "未反馈"
    }
  }

  return (
    <Modal
      title={"发布计划"}
      width={800}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>取消</Button>,
        <Button key="submit" type="primary" onClick={onOk} loading={mutaLoading}>提交</Button>
      ]}
    >
      {
        isLoading ? (
          <Spin size={"large"} />
        ) : (
          editingPlanWork?.data.map((item: any) => (
            <Row key={item.id}>
              <Col style={mb} span={12}>人员名称：{item.userName}</Col>
              <Col span={12}>发布者名称：{item.shareUserName}</Col>
              <Col style={mb} span={12}>是否通过：{isStatus(item.isPass)}</Col>
              <Col span={12}>备注：{item.remark}</Col>
            </Row>
          ))
        )
      }
      <Form
        form={form}
        onFinish={onFinish}
        labelAlign="right"
        layout={"vertical"}
      >
        <Form.Item
          label="人员"
          name="users"
          rules={rules}
        >
          <Select allowClear mode="multiple">
            {personList?.data.map((item: any, index: number) => <Option value={item.id}
              key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mb = { marginBottom: "1rem" }