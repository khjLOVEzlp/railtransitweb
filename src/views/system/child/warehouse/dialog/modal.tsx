import { Modal, Button, Form, Input, Checkbox, Select, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useMount } from '../../../../../hook';
import { useHttp } from '../../../../../utils/http';
const { Option } = Select;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

interface Props {
  formData: object,
  formType: string,
  isShow: boolean,
  setIsShow: (isShow: boolean) => void,
  getUserList: () => void
}

export const WarehouseModal = ({ formData, formType, isShow, setIsShow, getUserList }: Props) => {
  const [form] = useForm()
  const [isModalVisible, setIsModalVisible] = useState(isShow);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [role, setRole] = useState([])
  const [person, setPerson] = useState([])
  const client = useHttp()
  useMount(() => {
    client(`role/getAll`, { method: "POST" }).then((res) => {
      res.data.forEach((item: any) => {
        item.label = item.name
        item.value = item.id
      })
      setRole(res.data)
    })

    client(`person/list`, { method: "POST" }).then(res => {
      console.log(res.data);
      setPerson(res.data)
    })
  })

  const handleOk = () => {
    setIsModalVisible(false);
    setIsShow(false)
    form.submit()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsShow(false)
  };

  const onFinish = (values: any) => {
    let url = ''
    if (formType === '修改') {
      url = 'warehouse/update'
    } else {
      url = 'warehouse/save'
    }
    setConfirmLoading(true);
    client(url, { method: "POST", body: JSON.stringify(values) }).then(() => {
      setConfirmLoading(false);
      message.success(`${formType}成功`)
      getUserList()
    })
  };

  const onChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
  }

  const handleChange = (value: any) => {
    console.log(value);
  }

  return (
    <Modal title={formType} visible={isModalVisible} onOk={handleOk} width={800} maskClosable={false} onCancel={handleCancel} confirmLoading={confirmLoading} footer={[
      <Button key="back" onClick={handleCancel}>
        取消
            </Button>,
      <Button key="submit" type="primary" onClick={handleOk}>
        提交
            </Button>,
    ]}>
      <Form
        form={form}
        onFinish={onFinish}
        labelAlign="right"
        initialValues={formType === '修改' ? formData : {}}
        {...layout}
      >
        <Form.Item
          label="仓库名称"
          name="name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="类型"
          name="type"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系人姓名"
          name="personName"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系人电话"
          name="personPhone"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="地址"
          name="address"
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
    </Modal>
  )
}