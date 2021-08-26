import { Modal, Spin, Table, Tag } from "antd"
import { useForm } from "antd/lib/form/Form";
import { noData } from "utils/verification";
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

  const seStatus = (status: number) => {
    switch (status) {
      case 0:
        return <Tag color="processing">未使用</Tag>
      case 1:
        return <Tag color="success" >使用中</Tag>

      default:
        break;
    }
  }

  const status = (status: number) => {
    switch (status) {
      case 0:
        return <Tag color="success">正常</Tag>
      case 1:
        return <Tag color="processing" >快过期</Tag>
      case 2:
        return <Tag color="error" >已过期</Tag>

      default:
        break;
    }
  }

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
                render: (item) => (<span>{seStatus(item.useStatus)}</span>)
              },
              {
                title: "失效状态",
                render: (item) => (<span>{status(item.status)}</span>)
              },
              {
                title: "失效时间",
                dataIndex: "invalidTime"
              },
            ]}
              dataSource={viewTool?.data}
              locale={noData}
            />
          )
        }
      </Modal>
    </>
  )
}