import React, {useEffect} from "react";
import {Button, Form, Input, Modal} from "antd";
import {rules} from "../../../../../utils/verification";
import {useResetFormOnCloseModal} from "../../../../../hook/useResetFormOnCloseModal";

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

export interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const data = type === "修改" ? formData : ""

  useEffect(() => {
    form.setFieldsValue(data)
  }, [data, form])

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
        {...layout}
      >
        <Form.Item
          label="仓库名称"
          name="name"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="类型"
          name="type"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="联系人姓名"
          name="personName"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="联系人电话"
          name="personPhone"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="地址"
          name="address"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};