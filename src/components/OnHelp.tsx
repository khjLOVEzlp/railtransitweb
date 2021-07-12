import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {Modal} from "antd";

export const OnHelp = () => {
  const {ModalOpen, close} = useOnHelpModal()
  return (
    <Modal
      visible={ModalOpen}
      onCancel={close}
      footer={false}
      title={"关于、帮助"}
    >

    </Modal>
  )
}

export const useOnHelpModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{OnHelp}, setOnHelp] = useUrlQueryParam([
    "OnHelp"
  ])

  const open = () => setOnHelp({OnHelp: true})
  const close = () => setUrlParams({OnHelp: ""});

  return {
    ModalOpen: OnHelp === "true",
    open,
    close,
  };
};