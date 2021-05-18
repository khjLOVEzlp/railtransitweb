


import { Modal, Button, Form, Input, Checkbox, Select, message, Radio, Space, DatePicker } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useMount } from '../../../../../hook';
import { useHttp } from '../../../../../utils/http';
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface Props {
  formData: object,
  formType: string,
  isShow: boolean,
  setIsShow: (isShow: boolean) => void,
  getUserList: () => void
}

export const Dialog = ({ formData, formType, isShow, setIsShow, getUserList }: Props) => {
  const [form] = useForm()
  const [isModalVisible, setIsModalVisible] = useState(isShow);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState(1);
  const [materialList, setMaterialList] = useState([])
  const [personList, setPersonList] = useState([])
  const client = useHttp()

  useMount(() => {
    getMaterialList()
    PersonList()
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
      url = 'planType/update'
    } else {
      url = 'planType/save'
    }
    setConfirmLoading(true);
    client(url, { method: "POST", body: JSON.stringify(values) }).then(() => {
      setConfirmLoading(false);
      message.success(`${formType}成功`)
      getUserList()
    })
  };

  const getMaterialList = () => {
    client(`materialType/getAll`, { method: "POST" }).then(res => {
      console.log(res.data);
      setMaterialList(res.data)
    })
  }

  const PersonList = () => {
    client(`person/list`, { method: "POST" }).then((res) => {
      setPersonList(res.data)
    })
  }

  const beginTime = () => {

  }

  const dateTime = () => {

  }

  const endTime = () => { }

  const handleChange = (value: any) => {
    console.log(value);
  }

  const radioChange = (e: any) => {
    setValue(e.target.value);
  }

  return (
    <Modal title={formType} maskClosable={false} visible={isModalVisible} onOk={handleOk} width={800} onCancel={handleCancel} confirmLoading={confirmLoading} footer={[
      <Button key="back" onClick={handleCancel}>
        取消
            </Button>,
      <Button key="submit" type="primary" onClick={handleOk}>
        提交
            </Button>,
    ]}>
      <Form
        onFinish={onFinish}
        form={form}
        labelAlign="right"
        {...layout}
        initialValues={formType === '修改' ? formData : {}}
      >

        <Form.Item
          label="作业类型"
          name="type"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="物料集合"
          name="materialList"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="工器具集合"
          name="toolList"
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