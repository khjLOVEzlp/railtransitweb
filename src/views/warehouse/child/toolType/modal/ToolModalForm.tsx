import { Modal, Spin, Table } from "antd"
import { useForm } from "antd/lib/form/Form";
import { useToolModal } from '../util'

export const ToolModalForm = () => {
  const [form] = useForm()
  const { ModalOpen, close, isLoading, viewTool } = useToolModal()

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onOk = () => {
    form.submit();
  };

  return (
    <>
      <Modal
        title="详情"
        width={800}
        onOk={onOk}
        visible={ModalOpen}
        onCancel={closeModal}
        style={{ zIndex: 10000 }}
        footer={false}
      >
        {
          isLoading ? (
            <Spin />
          ) : (
            <Table columns={[
              {
                title: "标签",
                dataIndex: "labelNum"
              },
              {
                title: "使用状态",
                dataIndex: "useStatus"
              },
              {
                title: "失效状态",
                dataIndex: "status"
              },
              {
                title: "失效时间",
                dataIndex: "invalidTime"
              },
            ]}
              dataSource={viewTool?.data}
            />
          )
        }
      </Modal>
    </>
  )
}