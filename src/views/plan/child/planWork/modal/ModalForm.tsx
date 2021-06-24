import React, { useCallback, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Modal, Radio, Select, Space, Upload, Row, Col } from "antd";
import { useHttp } from "../../../../../utils/http";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";
import { UploadOutlined } from "@ant-design/icons";
import { getToken } from "../../../../../auth-provider";
import { rules } from "../../../../../utils/verification";
import { usePerson } from "../../../../person/person";
import { useMaterialType } from "../../../../system/child/materialType/materialType";
import { useInit } from "../../../../system/child/department/department";
import { usePlanType } from "../../planType/planType";
import { useLine } from "../../../../system/child/line/line";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../../style.css'
import { useShare, useSite } from "../planWork";
const baseUrl = process.env["REACT_APP_API_URL"]
const { TextArea } = Input;
const { Option } = Select;

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
export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();
  const token = getToken()
  let document: number[] = []
  const [value, setValue] = useState()
  const [id, setId] = useState<number>(0)

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue(formData)
  }, [formData, form, visible, type])

  const { data: material } = useMaterialType()
  const { data: department } = useInit()
  const { data: planTypeList } = usePlanType()
  const { data: lineLIst } = useLine()
  const { data: personList } = usePerson()
  const { data: allList } = useSite(id)

  const radioChange = (e: any) => {
    setValue(e.target.value);
  }

  const beginTime = (obj: any | null, time: string) => {
    form.setFieldsValue({ beginTime: time })
  }

  const dateTime = (obj: any, time: string) => {
    form.setFieldsValue({ dateTime: time })
  }

  const endTime = (obj: any, item: string) => {
    form.setFieldsValue({ endTime: item })
  }

  const warnTime = (obj: any, item: string) => {
    form.setFieldsValue({ warnTime: item })
  }

  useResetFormOnCloseModal({
    form,
    visible,
  });

  /* 选择线路 */
  const onGenderChange = (value: number) => {
    console.log(value);
    setId(value)
  }

  const props = {
    name: 'file',
    action: `${baseUrl}file/upload`,
    headers: {
      authorization: `${token}`,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        document = [...document, info.file.response.data]
        form.setFieldsValue({ documentList: document })
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
        <Space style={{ display: 'flex' }}>
          <Form.Item
            label="计划名称"
            name="name"
            rules={rules}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作业单位"
            name="departmentId"
            rules={rules}
          >
            <Select style={{ width: "100%" }}>
              {department?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Space style={{ display: 'flex' }}>
          <Form.Item
            label="施工负责人"
            name="leaderPerson"
            rules={rules}
          >
            <Select style={{ width: "100%" }}>
              {personList?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="线路"
            name="lineId"
            rules={rules}
          >
            <Select style={{ width: "100%" }} onChange={onGenderChange}>
              {lineLIst?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Space style={{ display: 'flex' }}>
          <Form.Item
            label="作业区间"
            name="workAddr"
            rules={rules}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="请站点"
            name="pleaseStand"
            rules={rules}
          >
            <Select style={{ width: "100%" }}>
              {allList?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Space style={{ display: 'flex' }}>
          <Form.Item
            label="销站点"
            name="pinStand"
            rules={rules}
          >
            <Select style={{ width: "100%" }}>
              {allList?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="作业类型"
            name="type"
            rules={rules}
          >
            <Select style={{ width: "100%" }}>
              {planTypeList?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.type}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Space style={{ display: 'flex' }}>
          <Form.Item
            label="开始时间"
            name="beginTime"
            rules={rules}
          >
            <Space style={{ width: "100%" }}>
              <DatePicker style={{ width: "100%" }} locale={locale} onChange={beginTime} placeholder="开始时间" />
            </Space>
          </Form.Item>

          <Form.Item
            label="结束时间"
            name="endTime"
            rules={rules}
          >
            <Space style={{ width: "100%" }}>
              <DatePicker style={{ width: "100%" }} locale={locale} onChange={endTime} placeholder="结束时间" />
            </Space>
          </Form.Item>
        </Space>

        <Space style={{ display: 'flex' }}>
          <Form.Item
            label="作业人数"
            name="workPerson"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作业计划工作量"
            name="workContent"
          >
            <Input />
          </Form.Item>
        </Space>

        <Space style={{ display: 'flex' }}>
          <Form.Item
            label="计划令号"
            name="num"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作业人员"
            name="personList"
          >
            <Select style={{ width: "100%" }} allowClear mode="multiple">
              {personList?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Form.List name="toolList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8, width: '100%' }} align="baseline">
                  <Form.Item
                    style={{ width: '100%' }}
                    {...restField}
                    name={[name, 'toolId']}
                    fieldKey={[fieldKey, 'toolId']}
                    rules={rules}
                  >
                    <Select>
                      {
                        material?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.name}</Option>)
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ width: '100%' }}
                    {...restField}
                    name={[name, 'num']}
                    fieldKey={[fieldKey, 'num']}
                    rules={rules}

                  >
                    <Input placeholder="数量" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加工具
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="materialList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    style={{ width: '100%' }}
                    {...restField}
                    name={[name, 'materialId']}
                    fieldKey={[fieldKey, 'materialId']}
                  >
                    <Select>
                      {
                        material?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.name}</Option>)
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ width: '100%' }}
                    {...restField}
                    name={[name, 'num']}
                    fieldKey={[fieldKey, 'num']}

                  >
                    <Input placeholder="数量" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加物料
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="groupList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    style={{ width: '100%' }}
                    {...restField}
                    name={[name, 'groupName']}
                    fieldKey={[fieldKey, 'groupName']}
                    label="组名"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    style={{ width: '100%' }}
                    {...restField}
                    name={[name, 'leader']}
                    fieldKey={[fieldKey, 'leader']}
                    label="组长"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    style={{ width: '100%' }}
                    {...restField}
                    name={[name, 'personList']}
                    fieldKey={[fieldKey, 'personList']}
                    label="小组成员"
                  >
                    <Select>
                      {
                        personList?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.name}</Option>)
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ width: '100%' }}
                    {...restField}
                    name={[name, 'groupMaterialList']}
                    fieldKey={[fieldKey, 'groupMaterialList']}
                    label="物料"
                  >
                    <Select>
                      {
                        material?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.name}</Option>)
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ width: '100%' }}
                    {...restField}
                    name={[name, 'groupToolList']}
                    fieldKey={[fieldKey, 'groupToolList']}
                    label="工具"
                  >
                    <Select>
                      {
                        material?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.name}</Option>)
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ width: '100%' }}
                    {...restField}
                    name={[name, 'remark']}
                    fieldKey={[fieldKey, 'remark']}
                    label="备注"
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加小组
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Space style={{ display: "flex" }}>
          <Form.Item
            label="文档"
            name="documentList"
          >
            <Upload {...props} style={{ width: "100%" }}>
              <Button style={{ width: "100%" }} icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="作业日期"
            name="dateTime"
          >
            <Space style={{ width: "100%" }}>
              <DatePicker style={{ width: "100%" }} locale={locale} onChange={dateTime} placeholder="作业日期" />
            </Space>
          </Form.Item>
        </Space>

        <Space style={{ display: "flex" }}>
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
            label="提醒时间"
            name="warnTime"
          >
            <Space style={{ display: 'flex' }}>
              <DatePicker style={{ width: "100%" }} locale={locale} onChange={warnTime} placeholder="提醒时间" />
            </Space>
          </Form.Item>
        </Space>

        <Space style={{ display: "flex" }}>
          <Form.Item
            label="防疫专员"
            name="preventionPerson"
          >
            <Select style={{ width: "100%" }}>
              {personList?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="安全员"
            name="safePerson"
          >
            <Select style={{ width: "100%" }}>
              {personList?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>
        </Space>

        <Space style={{ display: "flex" }}>
          <Form.Item
            label="施工负责人职责"
            name="leaderDuty"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="防疫专员职责"
            name="preventionDuty"
          >
            <Input />
          </Form.Item>
        </Space>

        <Space style={{ display: "flex" }}>
          <Form.Item
            label="安全员职责"
            name="safeDuty"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="备注"
            name="remark"
          >
            <TextArea rows={1} />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};
// 发布计划
export const ShareModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();
  const [personList, setPersonList] = useState([])
  const client = useHttp()

  const getPersonList = useCallback(() => {
    //  人员集合
    client(`person/list`, { method: "POST" }).then(res => {
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
          label="人员"
          name="users"
          rules={rules}
        >
          <Select allowClear mode="multiple">
            {personList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
// 反馈
export const ShareBackModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
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
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
// 查看
export const ViewModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();

  const { data } = useShare(formData.id)

  useResetFormOnCloseModal({
    form,
    visible,
  });

  /*const onChange = (e: any) => {
    setValue(e.target.value);
  };*/

  return (
    <Modal title={type} width={800} visible={visible} onCancel={onCancel} footer={null}>
      {
        data?.data.map((item: any) => (
          <Row key={item.id}>
            <Col style={mb} span={12}>人员名称：{item.userName}</Col>
            <Col span={12}>发布者名称：{item.shareUserName}</Col>
            <Col style={mb} span={12}>是否通过：{item.isPass === 0 ? "通过" : "驳回"}</Col>
            <Col span={12}>备注：{item.remark}</Col>
          </Row>
        ))
      }
    </Modal>
  )
}

const mb = { marginBottom: "1rem" }