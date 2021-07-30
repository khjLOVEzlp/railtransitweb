import { Button, Form, Input, message, Modal, Radio, Spin } from "antd";
import { useEffect } from "react";
import { rules } from "utils/verification";
import { useTemModal } from './util'
import { useAdd, useMod } from './request'
import { useSetUrlSearchParam } from "hook/useUrlQueryParam";

export const ModalForm = () => {
  const [form] = Form.useForm();
  const setUrlParams = useSetUrlSearchParam();

  const { ModalOpen, isLoading, close, editingTem, editingTemId } = useTemModal()
  const title = editingTem ? "修改" : "新增"
  const msg = editingTem ? () => {
    message.success("修改成功")
    close()
  } : () => {
    message.success("新增成功")
    close()
    setUrlParams({ index: 1, createTem: "" })
  }
  const useMutateProject = editingTem ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingTem?.data)
  }, [form, editingTem])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingTem, ...value, id: editingTemId }).then((res) => {
      msg()
      form.resetFields()
    }).catch(err => {
      message.error(err.msg)
    })
  }

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title={title}
      width={800}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>取消</Button>,
        <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>
      ]}
    >
      {
        isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Form
            form={form}
            onFinish={onFinish}
            labelAlign="right"
            layout={"vertical"}
          >
            <Form.Item
              label="设备编号"
              name="code"
              rules={rules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="厂商"
              name="operator"
              rules={rules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="是否使用"
              name="status"
              initialValue={"1"}
            >
              <Radio.Group>
                <Radio value={"1"}>否</Radio>
                <Radio value={"0"}>是</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};