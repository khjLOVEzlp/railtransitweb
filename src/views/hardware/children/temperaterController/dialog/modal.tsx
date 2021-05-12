import { Modal, Button, Form, Input, Checkbox, Select, message, Radio } from 'antd';
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
  getHardware: () => void
}

export const UserModal = ({ formData, formType, isShow, setIsShow, getHardware }: Props) => {
  const [form] = useForm()
  const [value, setValue] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(isShow);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const client = useHttp()
  useMount(() => {
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
      url = 'hardware/seperate/update'
    } else {
      url = 'hardware/seperate/save'
    }
    setConfirmLoading(true);
    client(url, { method: "POST", body: JSON.stringify(values) }).then(() => {
      setConfirmLoading(false);
      message.success(`${formType}成功`)
      getHardware()
    })
  };

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

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
          label="编号"
          name="codeNumber"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="imei号"
          name="imei"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="是否使用"
          name="isUse"
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={0}>是</Radio>
            <Radio value={1}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="流量卡号码"
          name="phone"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}