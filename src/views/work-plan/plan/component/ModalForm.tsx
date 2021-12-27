import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Upload,
  TreeSelect,
  Spin,
  Divider,
  Empty,
} from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { getToken } from "auth-provider";
import { rules } from "utils/verification";
import { AddToolModal } from "./AddToolModal";
import { useAddToolModal, usePlanWorkModal } from "../util";
import { useInitDepartment } from "views/system/child/department/request";
import moment from "moment";
import { usePlanContext } from "views/work-plan/work-plan";
import { PersonSelect } from "components/PersonSelect";
import ic from "assets/n/main-jihua-addicon1.png";
import group from "assets/n/main-jihua-addicon6.png";
import remark from "assets/n/main-jihua-addicon5.png";

import styled from "@emotion/styled";
import { useLine } from "api/home/subway";
import { useAdd, useMod, useSite } from "api/work-plan/plan";
import { usePlanType } from "api/work-plan/work-type";
const baseUrl = process.env["REACT_APP_API_URL"];
const { TextArea } = Input;
const { Option } = Select;

type Props = {
  param: {
    index: number;
    size: number;
    name: string;
  };
  setParam: (param: Props["param"]) => void;
};

// 新增修改
export const ModalForm = ({ param, setParam }: Props) => {
  const { groupList, setGroupList } = usePlanContext();
  const [groupIndex, setGroupIndex] = useState<any>();
  const [form] = Form.useForm();
  const token = getToken();
  let document: string[] = [];
  const [id, setId] = useState<number | undefined>(undefined);
  const { open, startEdit } = useAddToolModal();
  const { ModalOpen, isLoading, close, editingPlanWork, editId, isSuccess } =
    usePlanWorkModal();
  const title = editingPlanWork ? "修改" : "新增";
  const msg = editingPlanWork
    ? () => {
        message.success("修改成功");
      }
    : () => {
        message.success("新增成功");
        setParam({ ...param, index: 1 });
      };

  const useMutateProject = editingPlanWork ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  const closeModal = () => {
    setId(undefined);
    setGroupList([]);
    form.resetFields();
    close();
  };

  const onFinish = (value: any) => {
    const { beginTime, dateTime, endTime, warnTime } = value;

    mutateAsync({
      ...editingPlanWork?.data,
      ...value,
      documentList: document,
      groupList: groupList,
      dateTime: moment(dateTime).format("YYYY-MM-DD"),
      beginTime: moment(beginTime).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment(endTime).format("YYYY-MM-DD HH:mm:ss"),
      warnTime: moment(warnTime).format("YYYY-MM-DD HH:mm:ss"),
      id: editId,
    })
      .then(() => {
        form.resetFields();
        closeModal();
        msg();
      })
      .catch((err) => {
        message.error(err.msg);
      });
  };

  const onFinishFailed = () => {
    message.error("请检查是否有必填信息未填写");
  };

  const { data: departmentList } = useInitDepartment();
  const { data: planTypeList } = usePlanType();
  const { data: lineLIst } = useLine();
  const { data: allList } = useSite(id);

  useEffect(() => {
    if (editingPlanWork) {
      document = editingPlanWork?.data.documentList.map(
        (key: any) => key.documentId + ""
      );
      setId(editingPlanWork?.data.lineId);
      setGroupList(editingPlanWork?.data.groupList);
      form.setFieldsValue({
        ...editingPlanWork?.data,
        dateTime: moment(editingPlanWork?.data?.dateTime),
        beginTime: moment(editingPlanWork?.data?.beginTime),
        endTime: moment(editingPlanWork?.data?.endTime),
        warnTime: moment(editingPlanWork?.data?.warnTime),
      });
    }
  }, [form, editingPlanWork]);

  /* 选择线路 */
  const onGenderChange = (value: number) => {
    setId(value);
  };

  /* 上传文档 */
  const props = {
    name: "file",
    action: `${baseUrl}file/upload`,
    headers: {
      authorization: `${token}`,
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        document = [...document, info.file.response?.data + ""];
        /*
        form.setFieldsValue({ documentList: document }) */
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name}上传成功`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    defaultFileList: editingPlanWork?.data?.documentList,
  };

  const onOk = () => {
    form.submit();
  };

  const deleteGroup = (id: number) => {
    let newList = [...groupList];
    newList.splice(id, 1);
    setGroupList(newList);
  };

  return (
    <Modal
      title={title}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
      width="80%"
      footer={[
        <Button key="back" onClick={closeModal}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onOk}
          loading={mutateLoading}
        >
          提交
        </Button>,
      ]}
    >
      <LineTitle>
        <div className="icon">
          <img src={ic} alt="" />
          <span>计划基本信息</span>
        </div>
        <div className="right"></div>
      </LineTitle>
      <Divider />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          scrollToFirstError={true}
          labelAlign="right"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
        >
          <Space style={{ display: "flex" }}>
            <Form.Item label="计划名称" name="name" rules={rules}>
              <Input />
            </Form.Item>

            <Form.Item label="作业部门" name="departmentId" rules={rules}>
              <TreeSelect
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                showSearch
                style={{ width: "100%" }}
                treeData={departmentList?.data}
              />
            </Form.Item>

            <PersonSelect label="施工负责人" name="leaderPerson" rul={true} />
          </Space>

          <Space style={{ display: "flex" }}>
            <Form.Item label="线路" name="lineId" rules={rules}>
              <Select
                style={{ width: "100%" }}
                showSearch
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={onGenderChange}
              >
                {lineLIst?.data.map((item: any, index: number) => (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="作业区域" name="workAddr" rules={rules}>
              <Input />
            </Form.Item>

            <Form.Item label="请站点" name="pleaseStand" rules={rules}>
              <Select
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                style={{ width: "100%" }}
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {allList?.data.map((item: any, index: number) => (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space>

          <Space style={{ display: "flex" }}>
            <Form.Item label="销站点" name="pinStand" rules={rules}>
              <Select
                style={{ width: "100%" }}
                showSearch
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {allList?.data.map((item: any, index: number) => (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="作业类型" name="typeList" rules={rules}>
              <Select
                style={{ width: "100%" }}
                allowClear
                mode="multiple"
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
              >
                {planTypeList?.data.map((item: any, index: number) => (
                  <Option value={item.id} key={index}>
                    {item.type}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="开始时间"
              name="beginTime"
              rules={rules}
              style={{ width: "100%" }}
            >
              <DatePicker
                getPopupContainer={(triggerNode) => triggerNode}
                style={{ width: "100%" }}
                showTime
                locale={locale}
                format={"YYYY-MM-DD HH:mm:ss"}
                placeholder="开始时间"
              />
            </Form.Item>
          </Space>

          <Space style={{ display: "flex" }}>
            <Form.Item
              label="结束时间"
              name="endTime"
              rules={rules}
              style={{ width: "100%" }}
            >
              <DatePicker
                getPopupContainer={(triggerNode) => triggerNode}
                style={{ width: "100%" }}
                showTime
                locale={locale}
                format={"YYYY-MM-DD HH:mm:ss"}
                placeholder="结束时间"
              />
            </Form.Item>

            <div></div>

            <div></div>
          </Space>

          <LineTitle>
            <div className="icon">
              <img src={group} alt="" />
              <span>小组信息</span>
            </div>
            <Button onClick={open} icon={<PlusOutlined />} type="link">
              添加小组
            </Button>
          </LineTitle>
          <Divider />

          <Form.Item name="groupList">
            {groupList?.length > 0 ? (
              groupList?.map((item: any, index: number) => (
                <Space
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                  key={index}
                >
                  <div>小组名称：{item.groupName}</div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div></div>
                    <div>
                      {/* <Button>修改</Button> */}
                      <Button
                        style={{ marginLeft: "1rem" }}
                        onClick={() => {
                          startEdit(item);
                          setGroupIndex(index);
                        }}
                      >
                        修改
                      </Button>
                      <Button
                        style={{ marginLeft: "1rem" }}
                        onClick={() => {
                          Modal.confirm({
                            title: `是否要删除当前小组`,
                            content: "点击确定删除",
                            okText: "确定",
                            cancelText: "取消",
                            onOk() {
                              deleteGroup(index);
                            },
                          });
                        }}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                </Space>
              ))
            ) : (
              <Empty description="暂无小组信息" />
            )}
          </Form.Item>

          <LineTitle>
            <div className="icon">
              <img src={remark} alt="" />
              <span>其他备注信息</span>
            </div>
          </LineTitle>
          <Divider />

          <Space style={{ display: "flex" }}>
            <Form.Item label="作业内容" name="workContent">
              <Input />
            </Form.Item>

            <Form.Item label="计划令号" name="num">
              <Input />
            </Form.Item>

            <PersonSelect label="防疫专员" name="preventionPerson" />
          </Space>

          <Space style={{ display: "flex" }}>
            <Form.Item label="是否自动提醒" name="isWarn">
              <Select>
                <Select.Option value={0}>是</Select.Option>
                <Select.Option value={1}>否</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="作业日期" name="dateTime">
              <DatePicker
                getPopupContainer={(triggerNode) => triggerNode}
                style={{ width: "100%" }}
                locale={locale}
                placeholder="作业日期"
              />
            </Form.Item>

            <Form.Item
              label="作业人数"
              name="workPerson"
              getValueFromEvent={(event) =>
                event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, "")
              }
            >
              <Input />
            </Form.Item>
          </Space>

          <Space style={{ display: "flex" }}>
            <Form.Item label="施工负责人职责" name="leaderDuty">
              <Input />
            </Form.Item>

            <PersonSelect label="安全员" name="safePerson" />

            <Form.Item label="安全员职责" name="safeDuty">
              <Input />
            </Form.Item>
          </Space>

          <Space style={{ display: "flex" }}>
            <Form.Item label="提醒时间" name="warnTime">
              <DatePicker
                getPopupContainer={(triggerNode) => triggerNode}
                style={{ width: "100%" }}
                showTime
                locale={locale}
                format={"YYYY-MM-DD HH:mm:ss"}
                placeholder="提醒时间"
              />
            </Form.Item>

            <Form.Item
              label="文档"
              name="documentList"
              style={{ width: "100%" }}
            >
              {/* @ts-ignore */}
              <Upload {...props} style={{ width: "100%" }}>
                <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                  上传
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item label="防疫专员职责" name="preventionDuty">
              <Input />
            </Form.Item>
          </Space>

          <Space style={{ display: "flex" }}>
            <Form.Item label="备注" name="remark">
              <TextArea rows={1} />
            </Form.Item>

            <div></div>

            <div></div>
          </Space>
        </Form>
      )}

      {/*添加工具*/}
      <AddToolModal groupIndex={groupIndex} />
    </Modal>
  );
};

const LineTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon {
    font-size: 16px;
    font-weight: bold;
    color: #1b81ff;
  }
`;
