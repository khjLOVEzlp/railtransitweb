import { Col, Modal, Row, Image } from "antd";
import { usePageBoxContext } from "PageBox";
import logo from 'assets/logo1.png'
import logo2 from 'assets/logo2.png'
export const OnHelp = () => {
  const { ModalOpen, close } = useOnHelpModal()
  return (
    <Modal
      visible={ModalOpen}
      onCancel={close}
      footer={false}
      title={"关于、帮助"}
    >
      <Row style={{ padding: "0.5rem" }}>
        <Col span={12}>版本：1.0</Col>
      </Row>
      <Row style={{ padding: "0.5rem" }}>
        <Col span={24}>公司：深圳市阿尔艾富信息科技股份有限公司</Col>
      </Row>
      <Row style={{ padding: "0.5rem" }}>
        <Col span={24}>系统名称：智慧轨行区数字化维养安全管控系统</Col>
      </Row>
      <Image width={"100px"} height={"100px"} src={logo} />
      <Image width={"100px"} height={"100px"} src={logo2} />
    </Modal>
  )
}

export const useOnHelpModal = () => {
  const { help, setHelp } = usePageBoxContext()

  const open = () => setHelp(true)
  const close = () => setHelp(false)

  return {
    ModalOpen: help === true,
    open,
    close,
  };
};