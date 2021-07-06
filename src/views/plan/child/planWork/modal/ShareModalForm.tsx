import {Button, Form, message, Modal, Select} from "antd";
import {rules} from "utils/verification";
import {useUserAll} from "utils/system/user";
import {useSharePlan} from 'utils/plan/planWork'
import {useShareModal} from '../util'

const {Option} = Select

export const ShareModalForm = () => {
  const [form] = Form.useForm();
  const {ModalOpen, close, publishPlanWorkId} = useShareModal()
  const {mutateAsync, isLoading} = useSharePlan()
  const {data: personList} = useUserAll()

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...value, planId: publishPlanWorkId}).then(() => {
      message.success("发布成功")
      form.resetFields()
      close()
    })
  }

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title={"发布计划"}
      width={800}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>取消</Button>,
        <Button key="submit" type="primary" onClick={onOk} loading={isLoading}>提交</Button>
      ]}
    >
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