import { Button, Form, Input, message, Modal, Select, Spin, Tree, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import { rules } from "utils/verification";
import { useAdd, useMod } from '../request'
import { useRoleModal } from '../util'
import { useInit } from 'views/system/child/menu/request'

type Props = {
  param: {
    index: number
    size: number
    name: string
  }
  setParam: (param: Props["param"]) => void
}

export const ModalForm = ({ param, setParam }: Props) => {
  const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const { ModalOpen, isLoading, close, editingRole, editId } = useRoleModal()
  const title = editingRole ? "修改" : "新增"
  const useMutateProject = editingRole ? useMod : useAdd;
  const msg = editingRole ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  const { data: menu, isSuccess: success } = useInit()

  useEffect(() => {
    setCheckedKeys(editingRole?.data?.menuList)
    form.setFieldsValue(editingRole?.data)
  }, [form, editingRole])

  const closeModal = () => {
    setCheckedKeys([])
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingRole?.data, ...value, id: editId }).then((res) => {
      if (res.code === 200) {
        form.resetFields()
        closeModal()
        msg()
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
  ])

  /* const onCheck = (checkedKeys: any) => {
    form.setFieldsValue({ menuList: checkedKeys })
  }; */

  const onCheck = (checkedKeysValue: any, e: any) => {
    const data = [...e.halfCheckedKeys, ...checkedKeysValue]
    setCheckedKeys(checkedKeysValue);
    form.setFieldsValue({ menuList: data })
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
                  value={item.value}
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
                // checkedKeys={editingRole?.data?.menuList}
                checkedKeys={checkedKeys}
                // @ts-ignore
                treeData={success ? menu.data : []}
              />

              {/* <TreeSelect
                showSearch
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                allowClear
                treeDefaultExpandAll
                multiple
                treeData={menu?.data}
              /> */}
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
