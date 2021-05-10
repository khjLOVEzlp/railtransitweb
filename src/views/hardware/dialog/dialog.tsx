import { Form, Input } from "antd"
import { useForm } from "antd/lib/form/Form";
import React from "react"
import { MyModal } from "../../../components/MyModal"
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

export const Dialog = ({ setIsShow, isWidth }: { setIsShow: (isShow: boolean) => void, isWidth: string }) => {
  const [form] = useForm()
  const submit = () => {
    form.submit()
  }

  return (
    <MyModal submit={submit} title="查看" isWidth={isWidth} isVisible={true} setIsShow={setIsShow}>
      <Form
        labelAlign="right"
        {...layout}
      >
        <Form.Item
          label="登陆账户"
          name="loginName"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="人员id"
          name="personId"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="角色集合"
          name="roles"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input />
        </Form.Item>
      </Form>
    </MyModal>
  )
}