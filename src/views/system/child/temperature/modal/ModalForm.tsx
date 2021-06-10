import { Button, Form, Input, Modal, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { rules } from "../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue(formData)
  }, [formData, form, visible, type])

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

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
          label="设备编号"
          name="equipmentNum"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="员工卡号"
          name="number"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="测量温度"
          name="temperature"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="类型"
          name="type"
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>上岗</Radio>
            <Radio value={2}>离岗</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};