import { Col, Form, Modal, Row } from "antd";
import { useResetFormOnCloseModal } from "hook/useResetFormOnCloseModal";
import { useShare } from "../request";

// 查看
interface ModalFormProps {
  visible: boolean,
  onCancel: () => void,
  type: string,
  formData: any
}

export const ViewModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();

  const { data } = useShare(formData.id)

  useResetFormOnCloseModal({
    form,
    visible,
  });

  /*const onChange = (e: any) => {
    setValue(e.target.value);
  };*/

  return (
    <Modal title={type} width={800} visible={visible} onCancel={onCancel} footer={null}>
      {
        data?.data.map((item: any) => (
          <Row key={item.id}>
            <Col style={mb} span={12}>人员名称：{item.userName}</Col>
            <Col span={12}>发布者名称：{item.shareUserName}</Col>
            <Col style={mb} span={12}>是否通过：{item.isPass === 0 ? "通过" : "驳回"}</Col>
            <Col span={12}>备注：{item.remark}</Col>
          </Row>
        ))
      }
    </Modal>
  )
}

const mb = { marginBottom: "1rem" }