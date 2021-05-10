import { Checkbox, Form, Input, message } from "antd"
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react"
import { MyModal } from "../../../../../components/MyModal"
import { useMount } from "../../../../../hook";
import { useHttp } from "../../../../../utils/http";

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

interface Props {
  setIsShow: (isShow: boolean) => void,
  formType: string,
  formData: object
}

export const UserDialog = ({ setIsShow, formType, formData }: Props) => {
  const [form] = useForm()

  const [role, setRole] = useState<any>([])
  const [id, setId] = useState<any>([])
  const client = useHttp()

  useMount(() => {
    client(`role/getAll`, { method: "POST" }).then(res => {
      setRole(res.data)
    })
  })

  const onChange = (value: any) => {
    console.log(value);
    let idList = []
    idList.push(value.id)
    setId([...id, ...idList])
  }

  const onFinish = (values: any) => {
    console.log(id);

    let url
    if (formType === '新增') {
      url = 'user/save'
    } else {
      url = 'user/update'
    }

    client(url, { method: "POST", body: JSON.stringify(values) }).then(() => {
      message.success(`${formType}成功`)
    })
  };

  const submit = () => {
    form.submit()
  }

  return (
    <MyModal title={formType} isWidth="100rem" isVisible={true} setIsShow={setIsShow} submit={submit}>
      <Form
        form={form}
        onFinish={onFinish}
        labelAlign="right"
        initialValues={formData}
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
          {role.map((item: any, index: number) => <Checkbox onChange={() => onChange(item)} key={index}>{item.name}</Checkbox>)}
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