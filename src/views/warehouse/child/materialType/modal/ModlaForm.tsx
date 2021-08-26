import { Button, Form, Input, message, Modal, Spin } from "antd";
import { rules } from "utils/verification";
import { useMaterialModal } from '../util'
import { useAdd, useMod } from '../request'
import { useEffect } from "react";

type Props = {
  param: {
    index: number
    size: number
    name: string,
    type: string
  }
  setParam: (param: Props["param"]) => void
}

export const ModalForm = ({ param, setParam }: Props) => {
  const [form] = Form.useForm();
  const { ModalOpen, isLoading, close, editingMaterial, editId } = useMaterialModal()
  const title = editingMaterial ? "修改" : "新增"
  const name = param.type === "1" ? "工具名称" : "物料名称"
  const msg = editingMaterial ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }
  const useMutateProject = editingMaterial ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingMaterial?.data)
  }, [form, editingMaterial])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingMaterial?.data, ...value, id: editId, type: param.type }).then((res) => {
      if (res.code === 200) {
        form.resetFields()
        closeModal()
        msg()
      } else {
        message.error(res.msg)
      }
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
              label={name}
              name="name"
              rules={rules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="性能指标"
              name="perfIndex"
              rules={rules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="规格型号"
              name="specsModel"
              rules={rules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="备注"
              name="remark"
            >
              <Input />
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};