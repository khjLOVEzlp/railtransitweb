import React, { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { rules } from "../utils/verification";

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
  passwd: string;
}

export const PassModal: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  passwd,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible, form]);

  return (
    <Modal
      visible={visible}
      title="修改密码"
      okText="提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form}>
        <Form.Item
          name={"newpassword"}
          rules={rules}
          getValueFromEvent={(event) =>
            event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, "")
          }
        >
          <Input placeholder={"请输入新密码"} />
        </Form.Item>

        {passwd === "mod" ? (
          <Form.Item
            name={"oldpassword"}
            rules={rules}
            getValueFromEvent={(event) =>
              event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, "")
            }
          >
            <Input placeholder={"请输入旧密码"} />
          </Form.Item>
        ) : (
          ""
        )}
      </Form>
    </Modal>
  );
};
