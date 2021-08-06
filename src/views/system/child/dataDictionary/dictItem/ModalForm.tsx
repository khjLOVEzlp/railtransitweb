import { Button, Form, Input, message, Modal, Spin } from "antd";
import { rules } from "utils/verification";
import { useDictItemModal } from "./util";
import { useAdd, useMod } from "./request";
import { useEffect } from "react";
import { useSetUrlSearchParam } from "hook/useUrlQueryParam";

export const ModalForm = () => {
  const [form] = Form.useForm();
  const setUrlParams = useSetUrlSearchParam();

  const { ModalOpen, isLoading, close, editingDictItem, editId } = useDictItemModal()
  const title = editingDictItem ? "修改" : "新增"
  const msg = editingDictItem ? () => {
    message.success("修改成功")
    close()
  } : () => {
    message.success("新增成功")
    close()
    setUrlParams({ index: 1, createDictItem: "" })
  }
  const useMutateProject = editingDictItem ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingDictItem?.data)
  }, [form, editingDictItem])

  const onOk = () => {
    form.submit();
  };

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingDictItem?.data, ...value, id: editId }).then((res) => {
      if (res.code === 200) {
        msg()
        form.resetFields()
      } else {
        message.error(res.msg)
      }
    })
  }

  return (
    <Modal title={title} width={800} visible={ModalOpen} onOk={onOk} onCancel={closeModal}
      footer={[<Button key="back" onClick={closeModal}>取消</Button>,
      <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>]}
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
              label="值"
              name="value"
              rules={rules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="键"
              name="item"
              rules={rules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="类型"
              name="typeId"
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