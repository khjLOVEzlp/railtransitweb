import { Button, Form, Modal, Select } from "antd";
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";
import { rules } from "../../../../../utils/verification";
import { useUserAll } from "../../../../system/child/user/user";
const { Option } = Select

interface ModalFormProps {
  visible: boolean,
  onCancel: () => void,
  type: string,
  formData: any
}

export const ShareModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();

  const { data: personList } = useUserAll()

  const onOk = () => {
    form.submit();
  };

  useResetFormOnCloseModal({
    form,
    visible,
  });

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
          label="人员"
          name="users"
          rules={rules}
        >
          <Select allowClear mode="multiple">
            {personList?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}