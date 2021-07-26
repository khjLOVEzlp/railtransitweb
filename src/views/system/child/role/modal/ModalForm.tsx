import { Button, Form, Input, message, Modal, Select, Spin, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { rules } from "utils/verification";
import { useAdd, useMod } from 'utils/system/role'
import { useRoleModal } from '../util'
import { useInit } from 'utils/system/menu'
import { useSetUrlSearchParam } from "hook/useUrlQueryParam";

export const ModalForm = () => {
  const [form] = Form.useForm();
  const setUrlParams = useSetUrlSearchParam();
  const { ModalOpen, isLoading, close, editingRole, editingRoleId, isSuccess } = useRoleModal()
  const title = editingRole ? "修改" : "新增"
  const msg = editingRole ? () => {
    message.success("修改成功")
    close()
  } : () => {
    message.success("新增成功")
    close()
    setUrlParams({ index: 1, createRole: "" })
  }
  const useMutateProject = editingRole ? useMod : useAdd;

  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  const { data: menu, isSuccess: success } = useInit()

  useEffect(() => {
    form.setFieldsValue(editingRole?.data)
  }, [form, editingRole])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingRole, ...value, id: editingRoleId }).then((res) => {
      if (res.code === 200) {
        msg()
        form.resetFields()
      } else {
        message.error(res.msg)
      }
    })
  }

  const [options] = useState([
    {
      name: '所有数据权限',
      value: 1
    },
    {
      name: '本部门数据权限',
      value: 2
    },
    {
      name: '本部门及以下数据权限',
      value: 3
    },
    {
      name: '仅本人数据权限',
      value: 4
    }
  ])

  const onCheck = (checkedKeys: any) => {
    form.setFieldsValue({ menuList: checkedKeys })
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={title} width={800}
      visible={ModalOpen} onOk={onOk}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>取消</Button>,
        <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>
      ]}
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
              label="数据权限"
              name="dataScope"
              rules={rules}
            >
              <Select>
                {options.map((item: any, index: number) => <Select.Option
                  value={item.value
                  }
                  key={index}>{item.name}</Select.Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              label="资源集合"
              name="menuList"
            >
              <Tree
                checkable
                onCheck={onCheck}
                checkedKeys={editingRole?.data?.menuList}
                // @ts-ignore
                treeData={success ? menu.data : []}
              />
            </Form.Item>

            <Form.Item
              label="角色名称"
              name="name"
              rules={rules}
            >
              <Input />
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
