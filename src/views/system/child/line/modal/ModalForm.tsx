import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Spin,
  TreeSelect,
} from "antd";
import React, { useEffect } from "react";
import { rules } from "utils/verification";
import { useLineModal } from "../util";
import { useAdd, useMod } from "../request";
import { useInit } from "views/system/child/department/request";
import * as dataLineList from "views/system/child/dataDictionary/dictItem/request";

type Props = {
  param: {
    index: number;
    size: number;
    name: string;
  };
  setParam: (param: Props["param"]) => void;
};

const lineList = [
  "地铁1号线",
  "地铁2号线",
  "地铁3号线",
  "地铁3号线北延段",
  "地铁4号线",
  "地铁5号线",
  "地铁6号线",
  "地铁7号线",
  "地铁8号线",
  "地铁9号线",
  "地铁13号线",
  "地铁14号线",
  "地铁21号线",
  "广佛线",
  "apm线",
  "地铁14号线支线(知识城线)",
];

export const ModalForm = ({ param, setParam }: Props) => {
  const [form] = Form.useForm();
  const { data: departmentList } = useInit();
  const { ModalOpen, isLoading, close, editingLine, editId } = useLineModal();
  const title = editingLine ? "修改" : "新增";
  const msg = editingLine
    ? () => {
        message.success("修改成功");
      }
    : () => {
        message.success("新增成功");
        setParam({ ...param, index: 1 });
      };
  const useMutateProject = editingLine ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();
  const { data } = dataLineList.useInit({ index: 1, size: 100, typeId: 100 });

  useEffect(() => {
    form.setFieldsValue(editingLine?.data);
  }, [form, editingLine]);

  const onOk = () => {
    form.submit();
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const onFinish = (value: any) => {
    mutateAsync({ ...editingLine?.data, ...value, id: editId }).then((res) => {
      if (res.code === 200) {
        form.resetFields();
        closeModal();
        msg();
      } else {
        message.error(res.msg);
      }
    });
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
        <Spin />
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          labelAlign="right"
          layout={"vertical"}
        >
          <Form.Item label="管辖部门" name="departmentIds" rules={rules}>
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              allowClear
              multiple
              treeData={departmentList?.data}
            />
          </Form.Item>

          {/* <Form.Item
              label="地铁线路名称"
              name="name"
              rules={rules}
            >
              <Input />
            </Form.Item> */}

          <Form.Item label="地铁线路名称" name="name" rules={rules}>
            <Select>
              {data?.data.map((item: any) => (
                <Select.Option value={item.value} key={item.id}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <Input />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
