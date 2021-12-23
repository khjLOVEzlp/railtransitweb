import { Button, Form, Input, Modal, Radio, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import { getToken } from "auth-provider";
const apiUrl = process.env.REACT_APP_API_URL;
interface Props {
  title: string;
  visible: boolean;
  handleAdd: (value: any) => Promise<void>;
  handleUpdate: (value: any) => Promise<void>;
  close: () => void;
}

export const ModalForm = (props: Props) => {
  const { title, visible, handleAdd, handleUpdate, close } = props;
  const [form] = useForm();

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const uploadProps = {
    name: "file",
    action: `${apiUrl}file/upload`,
    headers: {
      authorization: `${getToken()}`,
    },
    maxCount: 1
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {      
      return e;
    }
    
    return e && e.file?.response?.data;
  };

  const onFinish = (value: any) => {
    title === "新增"
      ? handleAdd(value).then(() => {
          closeModal();
        })
      : handleUpdate(value).then(() => {
          closeModal();
        });
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={title} onOk={onOk} visible={visible} onCancel={closeModal}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {title === "新增" ? (
          <>
            <Form.Item label="APP名称" name="appName">
              <Input />
            </Form.Item>

            <Form.Item label="包Id" name="packageId">
              <Input />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              name="appFileId"
              label="APP文件"
              valuePropName="file"
              getValueFromEvent={normFile}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="版本号" name="versionCode">
              <Input />
            </Form.Item>

            <Form.Item
              label="是否强制更新"
              initialValue="0"
              name="updatePolicy"
            >
              <Radio.Group>
                <Radio value="0">否</Radio>
                <Radio value="1">是</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="更新说明" name="updateMessage">
              <Input />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};
