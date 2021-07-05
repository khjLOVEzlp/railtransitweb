import { Button, Form, Input, Modal, Radio, Select } from "antd";
import { useEffect } from "react";
import { useResetFormOnCloseModal } from "../../../../hook/useResetFormOnCloseModal";
import { rules } from "../../../../utils/verification";
import { useWarehouse } from "../../../../utils/warehouse/toolType";

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

  const { data: warehouse } = useWarehouse()

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
          label="十进制编码"
          name="codeHex10"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="915编码"
          name="codeHex915"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="归属仓库"
          name="warehouseId"
          rules={rules}
        >
          <Select
            showSearch
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {warehouse?.data.map((item: any) => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="是否使用"
          name="isUse"
          initialValue={"1"}
        >
          <Radio.Group>
            <Radio value={"1"}>否</Radio>
            <Radio value={"0"}>是</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};