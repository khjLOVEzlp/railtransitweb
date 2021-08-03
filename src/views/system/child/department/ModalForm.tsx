import React, { useEffect } from "react";
import { Button, Form, Input, message, Modal, Spin, TreeSelect } from "antd";
import { rules } from "utils/verification";
import { useAdd, useMod } from 'utils/system/department'
import { useDepartmentModal } from './util'
import { useInit } from 'utils/system/department'
import { useSetUrlSearchParam } from "hook/useUrlQueryParam";

export const ModalForm = () => {
  const [form] = Form.useForm();
  const setUrlParams = useSetUrlSearchParam();
  const { ModalOpen, isLoading, close, editingDepartment, editId } = useDepartmentModal()
  const title = editingDepartment ? "修改" : "新增"
  const msg = editingDepartment ? () => {
    message.success("修改成功")
    close()
  } : () => {
    message.success("新增成功")
    close()
    setUrlParams({ index: 1, createDepartment: "" })
  }
  const useMutateProject = editingDepartment ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  const { data } = useInit()

  useEffect(() => {
    form.setFieldsValue({
      ...editingDepartment?.data,
    })
  }, [form, editingDepartment])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingDepartment, ...value, id: editId }).then(() => {
      msg()
      form.resetFields()
    })
  }

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
              label="部门名称"
              name="name"
              rules={rules}
            >
              <Input />
            </Form.Item>

            {
              editingDepartment ? (
                <div />
              ) : (
                <Form.Item
                  label="部门归属"
                  name="parentId"
                >
                  <TreeSelect
                    style={{ width: '100%' }}
                    treeData={data?.data}
                    treeDefaultExpandAll
                    onChange={onChange}
                  />
                </Form.Item>
              )
            }

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