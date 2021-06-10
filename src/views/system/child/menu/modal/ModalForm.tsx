import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";
import { rules } from "../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";

/*const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};*/

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();
  const [menuType, setMenuType] = useState(1)
  const [status, setStatus] = useState(1)

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue(formData)
  }, [formData, form, visible, type])

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const menuTypeChange = (e: any) => {
    setMenuType(e.target.value)
  }

  const statusChange = (e: any) => {
    setStatus(e.target.value)
  }

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={type} width={800} visible={visible} onOk={onOk} onCancel={onCancel}
      footer={[<Button key="back" onClick={onCancel}>取消</Button>,
      <Button key="submit" type="primary" onClick={onOk}>提交</Button>]}
    >
      <Form
        form={form}
        name={type}
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
          <Radio.Group onChange={menuTypeChange} value={menuType}>
            <Radio value={1}>web</Radio>
            <Radio value={2}>app</Radio>
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
          label="父节点"
          name="parentId"
          rules={rules}
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
          label="类型"
          name="type"
          rules={rules}
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
          label="菜单状态"
          name="visible"
          rules={rules}
        >
          <Radio.Group onChange={statusChange} value={status}>
            <Radio value={0}>显示</Radio>
            <Radio value={1}>隐藏</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};