import React, { useEffect } from "react";
import { Button, Form, Input, message, Modal, Select, Spin, TreeSelect } from "antd";
import { useProjectModal } from "../../../util";
import { useAdd, useMod } from "./request";
import { useWarehouse } from "views/warehouse/child/toolType/request";
import { rules } from "utils/verification";
import { useLineClassModal } from './util'
import { useInit } from "./request";
import * as department from 'views/system/child/department/request'

type Props = {
  param: {
    index: number
    size: number
    departmentName: string
  }
  setParam: (param: Props["param"]) => void
}

export const ModalForm = ({ param, setParam }: Props) => {
  const [form] = Form.useForm();
  const { editId } = useProjectModal()
  const { ModalOpen, close, editingLineClass, classId, isLoading } = useLineClassModal()
  const title = editingLineClass ? "修改" : "新增"
  const msg = editingLineClass ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }
  const useMutateProject = editingLineClass ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingLineClass?.data)
  }, [form, editingLineClass])

  const { data: roadList } = useInit({ index: 1, size: 1000, lineId: editId })
  const { data: warehouse } = useWarehouse()

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingLineClass?.data, ...value, id: classId, lineId: editId }).then((res) => {
      if (res.code === 200) {
        form.resetFields()
        closeModal()
        msg()
      } else {
        message.error(res.msg)
      }
    })
  }

  const { data: departmentList } = department.useInit()

  const onChange = (value: any) => {
    form.setFieldsValue({ parentId: value })
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={title} width={800} visible={ModalOpen} onOk={onOk} onCancel={closeModal}
      footer={[<Button key="back" onClick={closeModal}>取消</Button>,
      <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>]}
    >
      {
        isLoading ? (
          <Spin />
        ) : (
          <Form
            form={form}
            onFinish={onFinish}
            labelAlign="right"
            layout={"vertical"}
          >
            <Form.Item
              label="班别"
              name="departmentId"
              rules={rules}
            >
              <TreeSelect
                style={{ width: '100%' }}
                treeData={departmentList?.data}
                treeDefaultExpandAll
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item
              label="区间"
              name="roadId"
              rules={rules}
            >
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {roadList?.data.map((item: any) => <Select.Option value={item.id}
                  key={item.id}>{item.name}</Select.Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              label="仓库"
              name="warehouseIds"
              rules={rules}
            >
              <Select
                allowClear
                mode="multiple"
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {warehouse?.data.map((item: any) => <Select.Option value={item.id}
                  key={item.id}>{item.name}</Select.Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              label="备注"
              name="remark"
            >
              <Input />
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};