import { Button, Form, Input, Modal, Radio } from "antd";
import { useEffect } from "react";
import { useResetFormOnCloseModal } from "../../../../hook/useResetFormOnCloseModal";
import { rules } from "../../../../utils/verification";

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue(formData)

  }, [formData, form, visible, type])

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
          label="设备编号"
          name="code"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="厂商"
          name="operator"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="是否使用"
          name="status"
          initialValue={"0"}
        >
          <Radio.Group>
            <Radio value={"0"}>否</Radio>
            <Radio value={"1"}>是</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};