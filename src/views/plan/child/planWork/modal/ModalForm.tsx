import React, {useCallback, useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, Modal, Radio, Select, Space} from "antd";
import {useHttp} from "../../../../../utils/http";
import {useResetFormOnCloseModal} from "../../../../../hook";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { TextArea } = Input;
const {Option} = Select;

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

interface ModalFormProps {
  visible: boolean,
  onCancel: () => void,
  type: string,
  formData: any
}

export const ModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const [materialList, setMaterialList] = useState([])
  const [value, setValue] = useState()
  const [personList, setPersonList] = useState([])
  const client = useHttp()

  const getMaterialList = useCallback(() => {
    client(`materialType/getAll`, {method: "POST"}).then(res => {
      setMaterialList(res.data)
    })
  }, [client])

  const getPersonList = useCallback(() => {
    client(`person/list`, {method: "POST"}).then((res) => {
      setPersonList(res.data)
    })
  }, [client])

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

  useEffect(() => {
    getMaterialList()
    getPersonList()
  }, [getMaterialList, getPersonList])

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
        layout={"vertical"}
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
          <TextArea rows={1} />
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

export const ShareModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const [personList, setPersonList] = useState([])

  const client = useHttp()

  const getPersonList = useCallback(() => {
    //  人员集合
    client(`person/list`, {method: "POST"}).then(res => {
      setPersonList(res.data)
    })
  }, [client])
  useEffect(() => {
    getPersonList()
  }, [getPersonList])

  const onOk = () => {
    form.submit();
  };

  useResetFormOnCloseModal({
    form,
    visible,
  });

  return (
    <Modal title={type} width={800} visible={visible} onOk={onOk} onCancel={onCancel}
           footer={[<Button key="back" onClick={onCancel}>取消</Button>,
             <Button key="submit" type="primary" onClick={onOk}>提交</Button>]}
    >
      <Form
        form={form}
        name={type}
        initialValues={formData}
        labelAlign="right"
        layout={"vertical"}
      >
        <Form.Item
          label="计划id"
          name="planId"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="人员id"
          name="users"
        >
          <Select>
            {personList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export const ShareBackModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(0);
  const onOk = () => {
    form.submit();
  };

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Modal title={type} width={800} visible={visible} onOk={onOk} onCancel={onCancel}
           footer={[<Button key="back" onClick={onCancel}>取消</Button>,
             <Button key="submit" type="primary" onClick={onOk}>提交</Button>]}
    >
      <Form
        form={form}
        name={type}
        initialValues={formData}
        labelAlign="right"
        layout={"vertical"}
      >
        <Form.Item
          label="是否通过"
          name="isPass"
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={0}>是</Radio>
            <Radio value={1}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="计划id"
          name="planId"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export const ViewModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const client = useHttp()
  const [value, setValue] = useState(0);

  const getShare = useCallback(() => {
    if (formData.id === undefined) return
    client(`plan/getShare/${formData.id}`).then(res => {
    })
  }, [client, formData])

  useEffect(() => {
    getShare()
  }, [getShare])

  const onOk = () => {
    form.submit();
  };

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Modal title={type} width={800} visible={visible} onOk={onOk} onCancel={onCancel} footer={null}>
      <Form
        form={form}
        name={type}
        initialValues={formData}
        labelAlign="right"
        {...layout}
      >

      </Form>
    </Modal>
  )
}