import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Spin,
  TreeSelect,
} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import { rules } from "utils/verification";
import { usePersonModal } from "../util";
import { useAdd, useMod, useAddPost, usePostList } from "../request";
import { useInit } from "views/system/child/department/request";
import moment from "moment";
import { useGetNotUseList } from "views/hardware/children/seperateController/request";
import { PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;

type Props = {
  param: {
    index: number;
    size: number;
    name: string;
  };
  setParam: (param: Props["param"]) => void;
  detail: any;
};

export const ModalForm = ({ param, setParam, detail }: Props) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<any>();
  const { ModalOpen, editId, editingPerson, isLoading, close } =
    usePersonModal();
  const title = editingPerson ? "修改" : "新增";
  const msg = editingPerson
    ? () => {
        message.success("修改成功");
      }
    : () => {
        message.success("新增成功");
        setParam({ ...param, index: 1 });
      };
  const { data: postList } = usePostList();
  const { mutateAsync: mutateAddPost, isLoading: addLoading } = useAddPost();
  const useMutateProject = editingPerson ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();
  const { data, isSuccess } = useGetNotUseList();
  const [seperate, setSeperate] = useState<any>([]);

  useEffect(() => {
    if (isSuccess) {
      if (detail?.irfId && detail?.codeNumber) {
        setSeperate([
          ...data.data,
          { id: detail?.irfId, codeNumber: detail?.codeNumber },
        ]);
      } else {
        setSeperate(data.data);
      }
    }
  }, [isSuccess, data?.data, detail?.irfId, detail?.codeNumber]);

  useEffect(() => {
    if (editingPerson) {
      form.setFieldsValue({
        ...editingPerson?.data,
        postId:
          editingPerson?.data.postId === 0
            ? undefined
            : editingPerson?.data.postId,
        birthday:
          editingPerson?.data.birthday === null
            ? ""
            : moment(editingPerson?.data.birthday),
        irfId:
          editingPerson?.data.irfId === 0
            ? undefined
            : editingPerson?.data.irfId,
      });
    }
  }, [form, editingPerson]);

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const onFinish = (value: any) => {
    mutateAsync({
      ...editingPerson?.data,
      ...value,
      id: editId,
      irfId: value.irfId === undefined ? null : value.irfId,
    })
      .then((res) => {
        if (res.code === 200) {
          form.resetFields();
          closeModal();
          msg();
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        message.error(err.msg);
      });
  };

  const { data: departmentList } = useInit();

  const onChange = (value: any) => {
    form.setFieldsValue({ departmentId: value });
  };

  const disabledDate = (current: any) => {
    return current && current > moment().endOf("day");
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title={title}
      width={800}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
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
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          labelAlign="right"
          layout={"vertical"}
        >
          <Space style={{ width: "100%" }}>
            <Form.Item label="姓名" name="name" rules={rules}>
              <Input />
            </Form.Item>

            <Form.Item label="性别" name="sex" rules={rules}>
              <Select>
                <Select.Option value={0}>男</Select.Option>
                <Select.Option value={1}>女</Select.Option>
              </Select>
            </Form.Item>
          </Space>

          <Space style={{ width: "100%" }}>
            <Form.Item
              label="联系方式"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "请输入联系方式",
                },
                {
                  pattern: new RegExp(
                    /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
                  ),
                  message: "请输入正确的联系方式",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="员工卡号" name="number" rules={rules}>
              <Input />
            </Form.Item>
          </Space>

          <Space style={{ width: "100%" }}>
            <Form.Item label="归属部门" name="departmentId" rules={rules}>
              <TreeSelect
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                style={{ width: "100%" }}
                treeData={departmentList?.data}
                treeDefaultExpandAll
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item label="防分离器" name="irfId">
              <Select
                showSearch
                allowClear
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {seperate?.map((item: any) => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.codeNumber}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Space>

          <Space style={{ width: "100%" }}>
            <Form.Item label="家庭住址" name="address">
              <Input />
            </Form.Item>

            <Form.Item label="出生日期" name="birthday">
              <DatePicker
                disabledDate={disabledDate}
                locale={locale}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Space>

          <Space style={{ width: "100%" }}>
            <Form.Item label={"职务"} name={"postId"}>
              <Select
                showSearch
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        padding: 8,
                      }}
                    >
                      <Input
                        style={{ flex: "auto" }}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                      <Button
                        type={"link"}
                        loading={addLoading}
                        style={{
                          flex: "none",
                          padding: "8px",
                          display: "block",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (value) {
                            setValue("");
                            mutateAddPost(value);
                          }
                        }}
                      >
                        <PlusOutlined /> 添加职务
                      </Button>
                    </div>
                  </div>
                )}
              >
                {postList?.data.map((key: any) => (
                  <Select.Option value={key.id} style={{ display: "flex" }}>
                    {key.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="身份证号码"
              name="identityCard"
              rules={[
                {
                  pattern: new RegExp(
                    /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
                  ),
                  message: "请输入正确的身份证号码",
                  type: "number"
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Space>

          <Form.Item label="备注" name="remark">
            <TextArea rows={1} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
