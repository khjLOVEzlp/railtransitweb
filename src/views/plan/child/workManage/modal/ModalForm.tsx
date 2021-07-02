import { Col, Form, Modal, Row } from "antd";
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";
import { useShare } from "../../../../../utils/plan/planHistory";

interface ModalFormProps {
  visible: boolean
  onCancel: () => void
  formData: any
  type: string,
}

// 查看
export const ViewModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();

  const { data } = useShare(formData.id)
  console.log(data?.data);

  useResetFormOnCloseModal({
    form,
    visible,
  });

  /*const onChange = (e: any) => {
    setValue(e.target.value);
  };*/

  return (
    <Modal title={type} width={800} visible={visible} onCancel={onCancel} footer={null}>
      <Row>
        <Col style={mb} span={12}>开始时间：{data?.data.beginTime}</Col>
        <Col span={12}>部门名称：{data?.data.departmentName}</Col>
        <Col style={mb} span={12}>负责人：{data?.data.leaderName}</Col>
        <Col span={12}>地铁路线：{data?.data.lineName}</Col>
        <Col style={mb} span={12}>销站点：{data?.data.pinName}</Col>
        <Col span={12}>请站点：{data?.data.pleaseName}</Col>
        {
          data?.data.groupList.map((item: any) => (
            <div key={item.id} style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
              <Col span={12} style={mb}>小组名称：{item.groupName}</Col>
              <Col span={12} style={mb}>组长：{item.leaderName}</Col>
              {
                item.personList.map((key: any) => (
                  <Col key={key.id} span={12} style={mb}>作业人员：{key.personName}</Col>
                ))
              }
            </div>
          ))
        }
        {/* <Col style={mb} span={12}>备注：{data?.data.remark}</Col> */}
      </Row>
    </Modal>
  )
}

const mb = { marginBottom: "1rem" }
