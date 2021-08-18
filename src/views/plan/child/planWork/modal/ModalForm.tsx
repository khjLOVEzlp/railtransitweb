import { useEffect, useState } from "react";
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
  Spin
} from "antd";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { getToken } from "../../../../../auth-provider";
import { rules } from "utils/verification";
import { usePlanType } from "../../planType/request";
import { useLine } from "views/system/child/line/request";
import { useSite } from "../request";
import { AddToolModal } from './AddToolModal'
import { useAddToolModal, usePlanWorkModal } from '../util'
import { useAdd, useMod } from "../request";
import { useInitDepartment } from 'views/system/child/department/request'
import moment from "moment";
import { usePlanContext } from "views/plan";
import { PersonSelect } from "components/PersonSelect";
import { useQueryClient } from "react-query";
const baseUrl = process.env["REACT_APP_API_URL"]
const { TextArea } = Input;
const { Option } = Select;

type Props = {
  param: {
    index: number
    size: number
    name: string
  }
  setParam: (param: Props["param"]) => void
}

// 新增修改
export const ModalForm = ({ param, setParam }: Props) => {
  const { groupList, setGroupList } = usePlanContext()
  const [form] = Form.useForm();
  const token = getToken()
  let document: string[] = []
  const [value, setValue] = useState()
  const [id, setId] = useState<number>(0)
  const { open } = useAddToolModal()
  const { ModalOpen, isLoading, close, editingPlanWork, editId } = usePlanWorkModal()
  const queryClient = useQueryClient()
  const title = editingPlanWork ? "修改" : "新增"
  const msg = editingPlanWork ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }

  const useMutateProject = editingPlanWork ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    console.log(groupList);
  }, [groupList])

  useEffect(() => {
    if (editingPlanWork) {
      queryClient.invalidateQueries('lineAll')
      setGroupList(editingPlanWork?.data.groupList)
      form.setFieldsValue({
        ...editingPlanWork?.data,
        dateTime: moment(editingPlanWork?.data?.dateTime),
        beginTime: moment(editingPlanWork?.data?.beginTime),
        endTime: moment(editingPlanWork?.data?.endTime),
        warnTime: moment(editingPlanWork?.data?.warnTime),
      })
    }
  }, [form, editingPlanWork])

  const closeModal = () => {
    setGroupList([])
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    const { beginTime, dateTime, endTime, warnTime } = value
    const documentId = editingPlanWork?.data.documentList.map((key: { [key: string]: unknown }) => key.documentId + "").concat(document)

    mutateAsync({
      ...editingPlanWork?.data,
      ...value,
      documentList: documentId,
      groupList: groupList,
      dateTime: moment(dateTime).format("YYYY-MM-DD"),
      beginTime: moment(beginTime).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment(endTime).format("YYYY-MM-DD HH:mm:ss"),
      warnTime: moment(warnTime).format("YYYY-MM-DD HH:mm:ss"),
      id: editId,
    }).then(() => {
      form.resetFields()
      closeModal()
      msg()
    }).catch((err) => {
      message.error(err.msg)
    })
  }

  const onFinishFailed = () => {
    message.error("请检查是否有必填信息未填写")
  }

  const { data: departmentList } = useInitDepartment()
  const { data: planTypeList } = usePlanType()
  const { data: lineLIst } = useLine()
  const { data: allList } = useSite(id)

  const radioChange = (e: any) => {
    setValue(e.target.value);
  }

  /* 添加小组 */
  const addGroup = () => {
    message.success("添加小组待开发")
  }

  /* 选择线路 */
  const onGenderChange = (value: number) => {
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
        document = [...document, info.file.response?.data + ""]
        /*
        form.setFieldsValue({ documentList: document }) */
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name}上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    defaultFileList: editingPlanWork?.data.documentList

  };

  const onOk = () => {
    form.submit();
  };

  const deleteGroup = (id: number) => {
    let newList = [...groupList]
    newList.splice(id, 1)
    setGroupList(newList)
  }

  return (
    <Modal title={title} width={800} visible={ModalOpen} onOk={onOk} onCancel={closeModal}
      footer={[<Button key="back" onClick={closeModal}>取消</Button>,
      <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>]}
    >
      {
        isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError={true}
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
                label="作业部门"
                name="departmentId"
                rules={rules}
              >
                <TreeSelect
                  getPopupContainer={triggerNode => triggerNode.parentElement}
                  showSearch
                  style={{ width: '100%' }}
                  treeData={departmentList?.data}
                />
              </Form.Item>
            </Space>

            <Space style={{ display: 'flex' }}>
              <PersonSelect label="施工负责人" name="leaderPerson" rul={true} />

              <Form.Item
                label="线路"
                name="lineId"
                rules={rules}
              >
                <Select
                  style={{ width: "100%" }}
                  showSearch
                  getPopupContainer={triggerNode => triggerNode.parentElement}
                  filterOption={(input, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={onGenderChange}
                >
                  {lineLIst?.data.map((item: any, index: number) => <Option value={item.id}
                    key={index}>{item.name}</Option>)}
                </Select>
              </Form.Item>
            </Space>

            <Space style={{ display: 'flex' }}>
              <Form.Item
                label="作业区域"
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
                <Select
                  getPopupContainer={triggerNode => triggerNode.parentElement}
                  style={{ width: "100%" }}
                  showSearch
                  filterOption={(input, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {allList?.data.map((item: any, index: number) => <Option value={item.id}
                    key={index}>{item.name}</Option>)}
                </Select>
              </Form.Item>
            </Space>

            <Space style={{ display: 'flex' }}>
              <Form.Item
                label="销站点"
                name="pinStand"
                rules={rules}
              >
                <Select
                  style={{ width: "100%" }}
                  showSearch
                  getPopupContainer={triggerNode => triggerNode.parentElement}
                  filterOption={(input, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {allList?.data.map((item: any, index: number) => <Option value={item.id}
                    key={index}>{item.name}</Option>)}
                </Select>
              </Form.Item>

              <Form.Item
                label="作业类型"
                name="typeList"
                rules={rules}
              >
                <Select style={{ width: "100%" }} allowClear mode="multiple" getPopupContainer={triggerNode => triggerNode.parentElement}>
                  {planTypeList?.data.map((item: any, index: number) => <Option value={item.id}
                    key={index}>{item.type}</Option>)}
                </Select>
              </Form.Item>
            </Space>

            <Space style={{ display: 'flex', justifyContent: "space-between", width: "100%" }}>
              <Form.Item
                label="开始时间"
                name="beginTime"
                rules={rules}
                style={{ width: "100%" }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  locale={locale}
                  format={"YYYY-MM-DD HH:mm:ss"}
                  placeholder="开始时间"
                />
              </Form.Item>

              <Form.Item
                label="结束时间"
                name="endTime"
                rules={rules}
                style={{ width: "100%" }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  locale={locale}
                  format={"YYYY-MM-DD HH:mm:ss"}
                  placeholder="结束时间"
                />
              </Form.Item>
            </Space>

            <Space style={{ display: "flex" }}>
              <Form.Item
                label="提醒时间"
                name="warnTime"
              >
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  locale={locale}
                  format={"YYYY-MM-DD HH:mm:ss"}
                  placeholder="提醒时间"
                />
              </Form.Item>

              <Form.Item
                label="作业日期"
                name="dateTime"
              >
                <DatePicker
                  style={{ width: "100%" }}
                  locale={locale}
                  placeholder="作业日期"
                />
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
                label="文档"
                name="documentList"
              >
                {/* @ts-ignore */}
                <Upload {...props} style={{ width: "100%" }}>
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>上传</Button>
                </Upload>
              </Form.Item>
            </Space>

            <Space style={{ display: 'flex' }}>
              <Form.Item
                label="作业人数"
                name="workPerson"
                getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="作业内容"
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

              <PersonSelect label="防疫专员" name="preventionPerson" />

              {/* <Form.Item
                label="作业人员"
                name="personList"
              >
                <Select
                  style={{ width: "100%" }}
                  allowClear mode="multiple"
                  showSearch
                  filterOption={(input, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {personList?.data.map((item: any, index: number) => <Option value={item.id}
                    key={index}>{item.name}</Option>)}
                </Select>
              </Form.Item> */}
            </Space>

            <Form.Item name="groupList">
              {
                groupList?.length > 0 ?
                  groupList?.map((item: any, index: number) => <Space style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }} key={index}>
                    <div>
                      小组名称：{item.groupName}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div></div>
                      <div>
                        {/* <Button>修改</Button> */}
                        <Button style={{ marginLeft: "1rem" }} onClick={() => deleteGroup(index)}>删除</Button>
                      </div>
                    </div>
                  </Space>)
                  : (
                    <div></div>
                  )
              }
            </Form.Item>

            <Form.Item>
              <Button style={{ width: "100%" }} onClick={open} icon={<PlusOutlined />}>添加小组</Button>
            </Form.Item>

            <Space style={{ display: "flex" }}>
              <Form.Item
                label="施工负责人职责"
                name="leaderDuty"
              >
                <Input />
              </Form.Item>

              <PersonSelect label="安全员" name="safePerson" />
            </Space>

            <Space style={{ display: "flex" }}>
              <Form.Item
                label="安全员职责"
                name="safeDuty"
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
                label="备注"
                name="remark"
              >
                <TextArea rows={1} />
              </Form.Item>
            </Space>
          </Form>
        )
      }

      {/*添加工具*/}
      <AddToolModal />
    </Modal>
  )
};
