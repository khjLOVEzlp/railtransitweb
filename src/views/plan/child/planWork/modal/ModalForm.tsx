import React, {useCallback, useEffect, useState} from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Space,
  Upload,
  TreeSelect,
  InputNumber
} from "antd";
import {useHttp} from "utils/http";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {useResetFormOnCloseModal} from "../../../../../hook/useResetFormOnCloseModal";
import {UploadOutlined} from "@ant-design/icons";
import {getToken} from "../../../../../auth-provider";
import {rules} from "utils/verification";
import {usePlanType} from "utils/plan/planType";
import {useLine} from "utils//system/line";
// import '../../style.css'
import {useSite} from "utils/plan/planWork";
import {useMaterialType} from "utils/warehouse/materialType";
import {usePerson} from "utils/person/personManage";
import {AddToolModal} from './AddToolModal'

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
  const [visibleTool, setVisibleTool] = useState(false)
  const [title, setTitle] = useState("")
  const token = getToken()
  let document: number[] = []
  const [departmentList, setDepartmentList] = useState([])
  const [value, setValue] = useState()
  const [id, setId] = useState<number>(0)
  const client = useHttp()

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue(formData)
  }, [formData, form, visible, type])

  const {data: material} = useMaterialType()
  const {data: planTypeList} = usePlanType()
  const {data: lineLIst} = useLine()
  const {data: personList} = usePerson()
  const {data: allList} = useSite(id)

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

  const warnTime = (obj: any, item: string) => {
    form.setFieldsValue({warnTime: item})
  }

  /* 添加工具 */
  const addTool = () => {
    setTitle("工具类型")
    setVisibleTool(true)
  }

  const handleSubmit = (value: object) => {
    console.log(value)
  }

  /* 添加物资 */
  const addMaterial = () => {
    setTitle("物资类型")
    setVisibleTool(true)
  }

  /* 添加小组 */
  const addGroup = () => {

  }

  const cancel = () => {
    setVisibleTool(false)
  }

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const getDepartmentList = useCallback(() => {
    client(`department/getAll`).then(res => {

      const fuc = (data: any) => {
        if (data && data.length > 0) {
          data.forEach((item: any) => {
            item.title = item.name
            item.key = item.id
            item.children = fuc(item.departmentList)
          });
        } else {
          data = []
        }
        return data
      }
      setDepartmentList(fuc(res.data))
    })
  }, [client])

  useEffect(() => {
    getDepartmentList()
  }, [getDepartmentList])

  /* 选择线路 */
  const onGenderChange = (value: number) => {
    console.log(value);
    setId(value)
  }

  /* 上传文档 */
  const props = {
    name: 'file',
    action: `${baseUrl}file/upload`,
    headers: {
      authorization: `${token}`,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        document = [...document, info.file.response.data]
        form.setFieldsValue({documentList: document})
        console.log(document)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name}上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
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
        <Space style={{display: 'flex'}}>
          <Form.Item
            label="计划名称"
            name="name"
            rules={rules}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="作业部门"
            name="departmentId"
            rules={rules}
          >
            <TreeSelect
              showSearch
              style={{width: '100%'}}
              treeData={departmentList}
            />
          </Form.Item>
        </Space>

        <Space style={{display: 'flex'}}>
          <Form.Item
            label="施工负责人"
            name="leaderPerson"
            rules={rules}
          >
            <Select
              style={{width: "100%"}}
              showSearch
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {personList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                          key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="线路"
            name="lineId"
            rules={rules}
          >
            <Select style={{width: "100%"}} onChange={onGenderChange}>
              {lineLIst?.data.map((item: any, index: number) => <Option value={item.id}
                                                                        key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Space style={{display: 'flex'}}>
          <Form.Item
            label="作业区域"
            name="workAddr"
            rules={rules}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="请站点"
            name="pleaseStand"
            rules={rules}
          >
            <Select style={{width: "100%"}}>
              {allList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                       key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Space style={{display: 'flex'}}>
          <Form.Item
            label="销站点"
            name="pinStand"
            rules={rules}
          >
            <Select style={{width: "100%"}}>
              {allList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                       key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="作业类型"
            name="typeList"
            rules={rules}
          >
            <Select style={{width: "100%"}} allowClear mode="multiple">
              {planTypeList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                            key={index}>{item.type}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Space style={{display: 'flex', justifyContent: "space-between", width: "100%"}}>
          <Form.Item
            label="开始时间"
            name="beginTime"
            rules={rules}
            style={{width: "100%"}}
          >
            <Space style={{width: "100%"}}>
              <DatePicker style={{width: "100%"}} showTime locale={locale} onChange={beginTime} placeholder="开始时间"/>
            </Space>
          </Form.Item>

          <Form.Item
            label="结束时间"
            name="endTime"
            rules={rules}
            style={{width: "100%"}}
          >
            <Space style={{width: "100%"}}>
              <DatePicker style={{width: "100%"}} showTime locale={locale} onChange={endTime} placeholder="结束时间"/>
            </Space>
          </Form.Item>
        </Space>

        <Space style={{display: "flex"}}>
          <Form.Item
            label="提醒时间"
            name="warnTime"
          >
            <Space style={{width: "100%"}}>
              <DatePicker style={{width: "100%"}} locale={locale} onChange={warnTime} placeholder="提醒时间"/>
            </Space>
          </Form.Item>

          <Form.Item
            label="作业日期"
            name="dateTime"
          >
            <Space style={{width: "100%"}}>
              <DatePicker style={{width: "100%"}} locale={locale} onChange={dateTime} placeholder="作业日期"/>
            </Space>
          </Form.Item>
        </Space>

        <Space style={{display: "flex"}}>
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
            label="文档"
            name="documentList"
          >
            <Upload {...props} style={{width: "100%"}}>
              <Button style={{width: "100%"}} icon={<UploadOutlined/>}>上传</Button>
            </Upload>
          </Form.Item>
        </Space>

        <Space style={{display: 'flex'}}>
          <Form.Item
            label="作业人数"
            name="workPerson"
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="作业内容"
            name="workContent"
          >
            <Input/>
          </Form.Item>
        </Space>

        <Space style={{display: 'flex'}}>
          <Form.Item
            label="计划令号"
            name="num"
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="作业人员"
            name="personList"
          >
            <Select style={{width: "100%"}} allowClear mode="multiple">
              {personList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                          key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Space style={{display: 'flex'}}>
          <Form.Item
            label=""
            name="num"
          >
            <Input disabled/>
          </Form.Item>

          <Form.Item
            label=""
            name=""
          >
            <InputNumber placeholder={"数量"}/>
          </Form.Item>
        </Space>

        <Form.Item>
          <Button style={{width: "100%"}} onClick={addTool}>添加工具</Button>
        </Form.Item>

        <Form.Item>
          <Button style={{width: "100%"}} onClick={addMaterial}>添加物料</Button>
        </Form.Item>

        <Form.Item>
          <Button style={{width: "100%"}} onClick={addGroup}>添加小组</Button>
        </Form.Item>

        <Space style={{display: "flex"}}>
          <Form.Item
            label="防疫专员"
            name="preventionPerson"
          >
            <Select style={{width: "100%"}}>
              {personList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                          key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="安全员"
            name="safePerson"
          >
            <Select style={{width: "100%"}}>
              {personList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                          key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Space style={{display: "flex"}}>
          <Form.Item
            label="施工负责人职责"
            name="leaderDuty"
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="防疫专员职责"
            name="preventionDuty"
          >
            <Input/>
          </Form.Item>
        </Space>

        <Space style={{display: "flex"}}>
          <Form.Item
            label="安全员职责"
            name="safeDuty"
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="备注"
            name="remark"
          >
            <TextArea rows={1}/>
          </Form.Item>
        </Space>
      </Form>

      {/*添加工具*/}
      <AddToolModal visible={visibleTool} onCancel={cancel} title={title} onSubmit={handleSubmit} />
    </Modal>
  );
};