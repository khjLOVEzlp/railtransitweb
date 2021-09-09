import { message, Modal, Tag, Upload } from "antd";
import { useAuth } from "context/auth-context"
import { useQueryClient } from "react-query"
import { InboxOutlined } from '@ant-design/icons';

const apiUrl = process.env.REACT_APP_API_URL;

const useImportModal = () => {
  const { drawer, setDrawer } = useAuth()
  const open = () => setDrawer(true)
  const close = () => setDrawer(false)
  return {
    ModalOpen: drawer === true,
    open,
    close
  }
}

export const ImportModal = ({ title, url, query }: { title: string, url: string, query: string }) => {
  const { ModalOpen, close } = useImportModal()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const props = {
    name: 'file',
    action: `${apiUrl}${url}`,
    headers: {
      authorization: `${user?.jwtToken}`,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done' && info.file.response?.code === 200) {
        message.success(`${info.file.name}上传成功`);
        queryClient.invalidateQueries(query)
        close()
      } else if (info.file.status === 'error' || info.file.response?.code != 200) {
        if (info?.file?.response?.msg) {
          message.error(info?.file?.response?.msg)
        }
      }
    },
  };

  return (
    <Modal
      title={title}
      visible={ModalOpen}
      onCancel={close}
      footer={false}
      destroyOnClose={true}
    >
      <Upload.Dragger {...props} maxCount={1}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击{title}</p>
      </Upload.Dragger>

      <Tag style={{ marginTop: "10px" }} color="processing">请上传 xls 或者 xlsx 格式文件</Tag>
    </Modal>
  )
}