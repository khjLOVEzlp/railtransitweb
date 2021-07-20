import React, {useEffect, useState} from "react";
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
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {getToken} from "../../../../../auth-provider";
import {rules} from "utils/verification";
import {usePlanType} from "utils/plan/planType";
import {useLine} from "utils//system/line";
import {useSite} from "utils/plan/planWork";
import {useMaterialType} from "utils/warehouse/materialType";
import {usePerson} from "utils/person/personManage";
import {AddToolModal} from './AddToolModal'
import {usePlanWorkModal} from '../util'
import {useAdd, useMod} from "utils/plan/planWork";
import {useSetUrlSearchParam} from "hook/useUrlQueryParam";
import {useInit} from 'utils/system/department'
import moment from "moment";

const baseUrl = process.env["REACT_APP_API_URL"]
const {TextArea} = Input;
const {Option} = Select;

// 新增修改
export const ModalForm = () => {
  const [form] = Form.useForm();
  const token = getToken()
  let document: string[] = []
  const [value, setValue] = useState()
  const [id, setId] = useState<number>(0)
  const setUrlParams = useSetUrlSearchParam();

  const {ModalOpen, isLoading, close, editingPlanWork, editingPlanWorkId, isSuccess} = usePlanWorkModal()
  const title = editingPlanWork ? "修改" : "新增"
  const msg = editingPlanWork ? () => {
    message.success("修改成功")
    close()
  } : () => {
    message.success("新增成功")
    close()
    setUrlParams({index: 1, createPlanWork: ""})
  }
  const useMutateProject = editingPlanWork ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    if (isSuccess && editingPlanWork) {
      form.setFieldsValue({
          ...editingPlanWork?.data,
          dateTime: moment(editingPlanWork?.data?.dateTime),
          beginTime: moment(editingPlanWork?.data?.beginTime),
          endTime: moment(editingPlanWork?.data?.endTime),
          warnTime: moment(editingPlanWork?.data?.warnTime),
        }
      )
    }
  }, [form, editingPlanWork])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    const {beginTime, dateTime, endTime, warnTime, groupList} = value
    const temp = JSON.parse(JSON.stringify(value))
    temp.groupList.forEach((item: any) => {
      for (let i = 0; i < item.personList.length; i++) {
        let temp = item.personList[i];
        item.personList[i] = {personId: temp, id: temp};
      }
    });

    console.log(temp)

    mutateAsync({
      ...editingPlanWork,
      ...temp,
      dateTime: moment(dateTime).format("YYYY-MM-DD"),
      beginTime: moment(beginTime).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment(endTime).format("YYYY-MM-DD HH:mm:ss"),
      warnTime: moment(warnTime).format("YYYY-MM-DD HH:mm:ss"),
      id: editingPlanWorkId,
    }).then(() => {
      msg()
      form.resetFields()
    })
  }

  const {data: departmentList} = useInit()
  const {data: material} = useMaterialType()
  const {data: planTypeList} = usePlanType()
  const {data: lineLIst} = useLine()
  const {data: personList} = usePerson()
  const {data: allList} = useSite(id)

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
        document = [...document, info.file.response.data + ""]
        form.setFieldsValue({documentList: document})
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

  const materialListChange = (value: any) => {

  }

  const personChange = (value: any) => {
    let arr: any = []
    let obj: any = {}
    value.forEach((key: any) => {
      obj["personId"] = key
      obj["id"] = key
      arr.push(obj)
    })
    return value
  }

  return (
    <Modal title={title} width={800} visible={ModalOpen} onOk={onOk} onCancel={closeModal}
           footer={[<Button key="back" onClick={closeModal}>取消</Button>,
             <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>]}
    >
      {
        isLoading ? (
          <Spin size={"large"}/>
        ) : (
          <Form
            form={form}
            onFinish={onFinish}
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
                  treeData={departmentList?.data}
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
                <Select
                  style={{width: "100%"}}
                  showSearch
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
                <Select
                  style={{width: "100%"}}
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

            <Space style={{display: 'flex'}}>
              <Form.Item
                label="销站点"
                name="pinStand"
                rules={rules}
              >
                <Select
                  style={{width: "100%"}}
                  showSearch
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
                <DatePicker
                  style={{width: "100%"}}
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
                style={{width: "100%"}}
              >
                <DatePicker
                  style={{width: "100%"}}
                  showTime
                  locale={locale}
                  format={"YYYY-MM-DD HH:mm:ss"}
                  placeholder="结束时间"
                />
              </Form.Item>
            </Space>

            <Space style={{display: "flex"}}>
              <Form.Item
                label="提醒时间"
                name="warnTime"
              >
                <DatePicker
                  style={{width: "100%"}}
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
                  style={{width: "100%"}}
                  locale={locale}
                  placeholder="作业日期"
                />
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
                getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
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
                <Select
                  style={{width: "100%"}}
                  allowClear mode="multiple"
                  showSearch
                  filterOption={(input, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {personList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                              key={index}>{item.name}</Option>)}
                </Select>
              </Form.Item>
            </Space>

            {/*<Form.Item>
              <Button style={{width: "100%"}} onClick={addTool}>添加工具</Button>
            </Form.Item>

            <Form.Item>
              <Button style={{width: "100%"}} onClick={addMaterial}>添加物料</Button>
            </Form.Item>*/}

            {/*添加物料*/}
            <Form.List name="materialList">
              {(fields, {add, remove}) => (
                <>
                  {fields.map(({key, name, fieldKey, ...restField}) => (
                    <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                      <Form.Item
                        style={{width: '100%'}}
                        {...restField}
                        name={[name, 'materialId']}
                        fieldKey={[fieldKey, 'materialId']}
                        rules={rules}
                      >
                        <Select
                          onChange={materialListChange}
                          showSearch
                          filterOption={(input, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          placeholder={"请选择物料"}
                        >
                          {
                            material?.data.map((item: any) => <Option value={item.id}
                                                                      key={item.id}>{item.name}</Option>)
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item
                        style={{width: '100%'}}
                        {...restField}
                        name={[name, 'num']}
                        fieldKey={[fieldKey, 'num']}
                        rules={rules}
                        getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
                      >
                        <Input placeholder="数量"/>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)}/>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                      添加物料
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            {/*添加工具*/}
            <Form.List name="toolList">
              {(fields, {add, remove}) => (
                <>
                  {fields.map(({key, name, fieldKey, ...restField}) => (
                    <Space key={key} style={{display: 'flex', marginBottom: 8, width: '100%'}} align="baseline">
                      <Form.Item
                        style={{width: '100%'}}
                        {...restField}
                        name={[name, 'toolId']}
                        fieldKey={[fieldKey, 'toolId']}
                        rules={rules}
                      >
                        <Select
                          onChange={materialListChange}
                          showSearch
                          filterOption={(input, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          placeholder={"请选择工具"}
                        >
                          {
                            material?.data.map((item: any) => <Option value={item.id}
                                                                      key={item.id}>{item.name}</Option>)
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item
                        style={{width: '100%'}}
                        {...restField}
                        name={[name, 'num']}
                        fieldKey={[fieldKey, 'num']}
                        rules={rules}
                        getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
                      >
                        <Input placeholder="数量"/>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)}/>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                      添加工具
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            {/*添加小组*/}
            <Form.List name="groupList">
              {(fields, {add, remove}) => (
                <>
                  {fields.map(({key, name, fieldKey, ...restField}) => (
                    <>
                      <Space style={{width: "100%"}}>
                        <Form.Item
                          style={{width: '100%'}}
                          {...restField}
                          name={[name, 'groupName']}
                          fieldKey={[fieldKey, 'groupName']}
                          rules={rules}
                        >
                          <Input placeholder={"小组名称"}/>
                        </Form.Item>

                        <Form.Item
                          style={{width: '100%'}}
                          {...restField}
                          name={[name, 'leader']}
                          fieldKey={[fieldKey, 'leader']}
                          rules={rules}
                        >
                          <Select
                            style={{width: "100%"}}
                            showSearch
                            filterOption={(input, option: any) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            placeholder={"小组组长"}
                          >
                            {personList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                                        key={index}>{item.name}</Option>)}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'personList']}
                          fieldKey={[fieldKey, 'personList']}
                          rules={rules}
                        >
                          <Select
                            style={{width: "100%"}}
                            allowClear
                            mode="multiple"
                            showSearch
                            onChange={personChange}
                            filterOption={(input, option: any) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            placeholder={"小组成员"}
                          >
                            {personList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                                        key={index}>{item.name}</Option>)}
                          </Select>
                        </Form.Item>

                        <Form.Item name={"remark"}>
                          <Input placeholder={"备注"}/>
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)}/>
                      </Space>

                      {/*添加物料*/}
                      <Form.List
                        name={[name, 'groupMaterialList']}
                      >
                        {(fields, {add, remove}) => (
                          <>
                            {fields.map(({key, name, fieldKey, ...restField}) => (
                              <Space key={key} style={{display: 'flex', marginBottom: 8, width: '100%'}}
                                     align="baseline">
                                <Form.Item
                                  style={{width: '100%'}}
                                  {...restField}
                                  name={[name, 'materialId']}
                                  fieldKey={[fieldKey, 'materialId']}
                                  rules={rules}
                                >
                                  <Select
                                    showSearch
                                    filterOption={(input, option: any) =>
                                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    placeholder={"请选择物料"}
                                  >
                                    {
                                      material?.data.map((item: any) => <Option value={item.id}
                                                                                key={item.id}>{item.name}</Option>)
                                    }
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  style={{width: '100%'}}
                                  {...restField}
                                  name={[name, 'num']}
                                  fieldKey={[fieldKey, 'num']}
                                  rules={rules}
                                  getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
                                >
                                  <Input placeholder="数量"/>
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)}/>
                              </Space>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                物料
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>

                      {/*添加工具*/}
                      <Form.List name={[name, "groupToolList"]}>
                        {(fields, {add, remove}) => (
                          <>
                            {fields.map(({key, name, fieldKey, ...restField}) => (
                              <Space key={key} style={{display: 'flex', marginBottom: 8, width: '100%'}}
                                     align="baseline">
                                <Form.Item
                                  style={{width: '100%'}}
                                  {...restField}
                                  name={[name, 'toolId']}
                                  fieldKey={[fieldKey, 'toolId']}
                                  rules={rules}
                                >
                                  <Select
                                    showSearch
                                    filterOption={(input, option: any) =>
                                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    placeholder={"请选择工具"}
                                  >
                                    {
                                      material?.data.map((item: any) => <Option value={item.id}
                                                                                key={item.id}>{item.name}</Option>)
                                    }
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  style={{width: '100%'}}
                                  {...restField}
                                  name={[name, 'num']}
                                  fieldKey={[fieldKey, 'num']}
                                  rules={rules}
                                  getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
                                >
                                  <Input placeholder="数量"/>
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)}/>
                              </Space>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                工具
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                      添加小组
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Space style={{display: "flex"}}>
              <Form.Item
                label="防疫专员"
                name="preventionPerson"
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
                label="安全员"
                name="safePerson"
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
        )
      }

      {/*添加工具*/}
      <AddToolModal/>
    </Modal>
  );
};
