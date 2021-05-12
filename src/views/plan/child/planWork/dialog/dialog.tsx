


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
      url = 'materialType/update'
    } else {
      url = 'materialType/save'
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
          label="开始时间"
          name="beginTime"
        >
          <Space direction="vertical">
            <DatePicker onChange={beginTime} />
          </Space>
        </Form.Item>

        <Form.Item
          label="结束时间"
          name="endTime"
        >
          <Space direction="vertical">
            <DatePicker onChange={dateTime} />
          </Space>
        </Form.Item>

        <Form.Item
          label="作业日期"
          name="dateTime"
        >
          <Space direction="vertical">
            <DatePicker onChange={dateTime} />
          </Space>
        </Form.Item>

        <Form.Item
          label="作业单位"
          name="departmentId"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="文档id集合"
          name="documentList"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="是否自动提醒"
          name="isWarn"
        >
          <Radio.Group onChange={radioChange} value={value}>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="施工负责人职责"
          name="leaderDuty"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="施工负责人"
          name="leaderPerson"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="线路id"
          name="lineId"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="物料列表id集合"
          name="materialList"
        >
          <Select style={{ width: "100%" }} onChange={handleChange}>
            {materialList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="计划名称"
          name="name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="计划令号"
          name="num"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业人员id列表"
          name="personList"
        >
          <Select style={{ width: "100%" }} onChange={handleChange}>
            {personList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="销站点"
          name="pinStand"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="请站点"
          name="pleaseStand"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="防疫专员职责"
          name="preventionDuty"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="防疫专员"
          name="preventionPerson"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="安全员职责"
          name="safeDuty"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="安全员"
          name="safePerson"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="工具列表id集合"
          name="toolList"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业类型"
          name="type"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="提醒时间"
          name="warnTime"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业区间"
          name="workAddr"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业计划工作量"
          name="workContent"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业人数"
          name="workPerson"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}