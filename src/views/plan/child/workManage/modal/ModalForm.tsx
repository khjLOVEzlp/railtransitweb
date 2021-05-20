import React, {useState} from "react";
import {Button, DatePicker, Form, Input, Modal, Radio, Select, Space} from "antd";
import {useHttp} from "../../../../../utils/http";
import {useMount, useResetFormOnCloseModal} from "../../../../../hook";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const {Option} = Select;
const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

interface ModalFormProps {
  visible: boolean,
  onCancel: () => void,
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const [materialList, setMaterialList] = useState([])
  const [value, setValue] = useState()
  const [personList, setPersonList] = useState([])
  const client = useHttp()

  const getMaterialList = () => {
    client(`materialType/getAll`, {method: "POST"}).then(res => {
      setMaterialList(res.data)
    })
  }

  const getPersonList = () => {
    client(`person/list`, {method: "POST"}).then((res) => {
      setPersonList(res.data)
    })
  }

  const radioChange = (e: any) => {
    setValue(e.target.value);
  }

  const beginTime = (obj: any | null, time: string) => {
    form.setFieldsValue({beginTime: time})
  }

  const dateTime = (obj: any, time: string) => {
    form.setFieldsValue({dateTime: time})
  }

  const endTime = (obj: any, item: string) => {
    form.setFieldsValue({endTime: item})
  }

  useMount(() => {
    getMaterialList()
    getPersonList()
  })

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={type} width={800} visible={visible} onOk={onOk} onCancel={onCancel}
           footer={[<Button key="back" onClick={onCancel}>取消</Button>,
             <Button key="submit" type="primary" onClick={onOk}>提交</Button>]}
    >
      <Form
        form={form}
        name={type}
        initialValues={type === '修改' ? formData : {}}
        labelAlign="right"
        {...layout}
      >
        <Form.Item
          label="开始时间"
          name="beginTime"
        >
          <Space direction="vertical">
            <DatePicker locale={locale} onChange={beginTime} placeholder="开始时间"/>
          </Space>
        </Form.Item>

        <Form.Item
          label="结束时间"
          name="endTime"
        >
          <Space direction="vertical">
            <DatePicker locale={locale} onChange={endTime} placeholder="结束时间"/>
          </Space>
        </Form.Item>

        <Form.Item
          label="作业日期"
          name="dateTime"
        >
          <Space direction="vertical">
            <DatePicker locale={locale} onChange={dateTime} placeholder="作业日期"/>
          </Space>
        </Form.Item>

        <Form.Item
          label="作业单位"
          name="departmentId"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="文档id集合"
          name="documentList"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="是否自动提醒"
          name="isWarn"
        >
          <Radio.Group onChange={radioChange} defaultValue={1} value={value}>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="施工负责人职责"
          name="leaderDuty"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="施工负责人"
          name="leaderPerson"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="线路id"
          name="lineId"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="物料列表id集合"
          name="materialList"
        >
          <Select style={{width: "100%"}}>
            {materialList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="计划名称"
          name="name"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="计划令号"
          name="num"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业人员id列表"
          name="personList"
        >
          <Select style={{width: "100%"}}>
            {personList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="销站点"
          name="pinStand"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="请站点"
          name="pleaseStand"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="防疫专员职责"
          name="preventionDuty"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="防疫专员"
          name="preventionPerson"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="安全员职责"
          name="safeDuty"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="安全员"
          name="safePerson"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="工具列表id集合"
          name="toolList"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业类型"
          name="type"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="提醒时间"
          name="warnTime"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业区间"
          name="workAddr"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业计划工作量"
          name="workContent"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业人数"
          name="workPerson"
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
