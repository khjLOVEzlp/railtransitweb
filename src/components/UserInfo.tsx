import {Col, Modal, Row} from "antd";
import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useInfo} from "utils/system/user";

export const UserInfo = () => {
  const {ModalOpen, close, info} = useInfoModal()
  return (
    <Modal
      title={"用户信息"}
      footer={false}
      width={600}
      visible={ModalOpen}
      onCancel={close}
    >
      <Row style={{padding: "0.5rem"}}>
        <Col span={12}>归属部门：{info?.data.departmentName}</Col>
        <Col span={12}>用户名：{info?.data.name}</Col>
      </Row>

      <Row style={{padding: "0.5rem"}}>
        <Col span={12}>账号：{info?.data.loginName}</Col>
        <Col span={12}>手机号：{info?.data.phone}</Col>
      </Row>

      <Row style={{padding: "0.5rem"}}>
        <Col span={12}>登陆时间：{info?.data.updateTime}</Col>
        <Col span={12}>创建时间：{info?.data.createTime}</Col>
      </Row>

      <Row style={{padding: "0.5rem"}}>
        <Col span={12}>生日：{info?.data.birthday}</Col>
        <Col span={12}>身份证：{info?.data.identityCard}</Col>
      </Row>
    </Modal>
  )
}

export const useInfoModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{infoId}, setInfoId] = useUrlQueryParam([
    "infoId",
  ]);

  const {data: info, isLoading} = useInfo(
    Number(infoId)
  );

  const close = () => setUrlParams({infoId: ""});

  const startEdit = (id: number | undefined) =>
    setInfoId({infoId: id});

  return {
    ModalOpen: Boolean(infoId),
    close,
    info,
    startEdit,
    isLoading
  }
}