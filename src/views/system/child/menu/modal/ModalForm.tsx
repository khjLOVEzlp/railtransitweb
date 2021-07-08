import React, { useEffect } from "react";
import {Button, Form, Input, message, Modal, Radio, Spin} from "antd";
import { rules } from "utils/verification";
import {useMenuModal} from '../util'
import {useAdd, useMod} from "utils/system/menu";

export const ModalForm = () => {
  const [form] = Form.useForm();
  const {ModalOpen, isLoading, close, editingMenu, editingMenuId} = useMenuModal()
  const title = editingMenu ? "修改" : "新增"
  const msg = editingMenu ? () => message.success("修改成功") : () => message.success("新增成功")
  const useMutateProject = editingMenu ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingMenu?.data)
  }, [form, editingMenu])

  const onOk = () => {
    form.submit();
  };

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingMenu, ...value, id: editingMenuId}).then((res) => {
      if (res.code === 200) {
        msg()
        form.resetFields()
        close()
      } else {
        message.error(res.msg)
      }
    })
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
            <Form.Item
              label="菜单图标"
              name="icon"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="菜单类型"
              name="menuType"
              rules={rules}
            >
              <Radio.Group>
                <Radio value={0}>web</Radio>
                <Radio value={1}>app</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="菜单名称"
              name="name"
              rules={rules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="显示顺序"
              name="orderNum"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="权限标识"
              name="permission"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="请求地址"
              name="url"
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