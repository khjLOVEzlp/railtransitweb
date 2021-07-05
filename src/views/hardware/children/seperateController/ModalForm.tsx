import { Button, Form, Input, Modal, Radio, Select } from "antd";
import { useEffect } from "react";
import { useResetFormOnCloseModal } from "../../../../hook/useResetFormOnCloseModal";
import { rules } from "../../../../utils/verification";
import { usePerson } from "../../../../utils/person/personManage";

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: any
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

  const { data: personList } = usePerson()

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={type} width={800} maskClosable={false} visible={visible} onOk={onOk} onCancel={onCancel}
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
          name="codeNumber"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="人员"
          name="personId"
          rules={rules}
        >
          <Select
            showSearch
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {personList?.data.map((item: any, index: number) => <Select.Option value={item.id} key={index}>{item.name}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="imei号"
          name="imei"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="流量卡号码"
          name="phone"
          rules={rules}
        >
          <Input />
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