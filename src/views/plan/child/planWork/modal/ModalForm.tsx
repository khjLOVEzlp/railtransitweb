import React, {useCallback, useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, message, Modal, Radio, Select, Space, Upload} from "antd";
import {useHttp} from "../../../../../utils/http";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {useResetFormOnCloseModal} from "../../../../../hook/useResetFormOnCloseModal";
import {UploadOutlined} from "@ant-design/icons";
import {getToken} from "../../../../../auth-provider";
import {rules} from "../../../../../utils/verification";
const baseUrl = process.env["REACT_APP_API_URL"]
const {TextArea} = Input;
const {Option} = Select;

/*const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};*/

interface ModalFormProps {
  visible: boolean,
  onCancel: () => void,
  type: string,
  formData: any
}

// 新增修改
export const ModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const token = getToken()
  const [department, setDepartment] = useState([])
  const [materialList, setMaterialList] = useState([])
  const [value, setValue] = useState()
  const [personList, setPersonList] = useState([])
  const [planTypeList, setPlanTypeList] = useState([])
  const client = useHttp()

  useEffect(() => {
    form.setFieldsValue(formData)
    return () => {
      form.setFieldsValue(null)
    }
  }, [formData, form])

  const getMaterialList = useCallback(() => {
    client(`materialType/getAll`, {method: "POST"}).then(res => {
      setMaterialList(res.data)
    })
  }, [client])

  const getDepartment = useCallback(() => {
    client(`department/getAll`).then(res => {
      setDepartment(res.data)
    })
  }, [client])

  const getPersonList = useCallback(() => {
    client(`person/list`, {method: "POST"}).then((res) => {
      setPersonList(res.data)
    })
  }, [client])

  const getPlanTypeList = () => {
    client(`planType/getAll`, {method: "POST"}).then(res => {
      setPlanTypeList(res.data)
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

  useEffect(() => {
    getMaterialList()
  }, [getMaterialList])

  useEffect(() => {
    getPlanTypeList()
  }, [getMaterialList])

  useEffect(() => {
    getDepartment()
  }, [getDepartment])

  useEffect(() => {
    getPersonList()
  }, [getPersonList])

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const props = {
    name: 'file',
    action: `${baseUrl}file/upload`,
    headers: {
      authorization: `${token}`,
    },
    onChange(info: any) {
      let arr = []
      if (info.file.status !== 'uploading') {
        arr.push(info.file.response.data)
        form.setFieldsValue({documentList: arr})
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

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
        labelAlign="right"
        layout={"vertical"}
      >
        <Form.Item
          label="开始时间"
          name="beginTime"
          rules={rules}
        >
          <Space direction="vertical">
            <DatePicker locale={locale} onChange={beginTime} placeholder="开始时间"/>
          </Space>
        </Form.Item>

        <Form.Item
          label="结束时间"
          name="endTime"
          rules={rules}
        >
          <Space direction="vertical">
            <DatePicker locale={locale} onChange={endTime} placeholder="结束时间"/>
          </Space>
        </Form.Item>

        <Form.Item
          label="作业日期"
          name="dateTime"
          rules={rules}
        >
          <Space direction="vertical">
            <DatePicker locale={locale} onChange={dateTime} placeholder="作业日期"/>
          </Space>
        </Form.Item>

        <Form.Item
          label="作业单位"
          name="departmentId"
          rules={rules}
        >
          <Select style={{width: "100%"}}>
            {department.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="文档"
          name="documentList"
          rules={rules}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined/>}>上传</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="是否自动提醒"
          name="isWarn"
          rules={rules}
        >
          <Radio.Group onChange={radioChange} defaultValue={1} value={value}>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="施工负责人职责"
          name="leaderDuty"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="施工负责人"
          name="leaderPerson"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="线路"
          name="lineId"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="物料列表"
          name="materialList"
          rules={rules}
        >
          <Select style={{width: "100%"}}>
            {materialList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="计划名称"
          name="name"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="计划令号"
          name="num"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业人员"
          name="personList"
          rules={rules}
        >
          <Select style={{width: "100%"}}>
            {personList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="销站点"
          name="pinStand"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="请站点"
          name="pleaseStand"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="防疫专员职责"
          name="preventionDuty"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="防疫专员"
          name="preventionPerson"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
          rules={rules}
        >
          <TextArea rows={1}/>
        </Form.Item>

        <Form.Item
          label="安全员职责"
          name="safeDuty"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="安全员"
          name="safePerson"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="工具列表"
          name="toolList"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业类型"
          name="type"
          rules={rules}
        >
          <Select style={{width: "100%"}}>
            {planTypeList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.type}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="提醒时间"
          name="warnTime"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业区间"
          name="workAddr"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业计划工作量"
          name="workContent"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业人数"
          name="workPerson"
          rules={rules}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
// 发布计划
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
        labelAlign="right"
        layout={"vertical"}
      >
        <Form.Item
          label="人员id"
          name="users"
          rules={rules}
        >
          <Select>
            {personList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
// 反馈
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
        labelAlign="right"
        layout={"vertical"}
      >
        <Form.Item
          label="是否通过"
          name="isPass"
          rules={rules}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={0}>是</Radio>
            <Radio value={1}>否</Radio>
          </Radio.Group>
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
// 查看
export const ViewModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const client = useHttp()
  // const [value, setValue] = useState(0);

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

  /*const onChange = (e: any) => {
    setValue(e.target.value);
  };*/

  return (
    <Modal title={type} width={800} visible={visible} onOk={onOk} onCancel={onCancel} footer={null}>
      <Form
        form={form}
        name={type}
        labelAlign="right"
        layout={"vertical"}
      >

      </Form>
    </Modal>
  )
}