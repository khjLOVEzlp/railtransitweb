import React, {useEffect} from "react";
import {Button, Form, Input, Modal} from "antd";
import {rules} from "../../../../../utils/verification";
import {useResetFormOnCloseModal} from "../../../../../hook/useResetFormOnCloseModal";

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

export const ModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData)
    return () => {
      form.setFieldsValue(null)
    }
  }, [formData, form])

  useResetFormOnCloseModal({
    form,
    visible,
  });

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
          <Input />
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
          label="父节点id"
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
          <Input />
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