import { Button, Form, Input, message, Modal, Select, Spin } from "antd";
import { rules } from "utils/verification";
import { useLinePlatFormModal } from './util'
import { useInit } from './request'
import { useMod, useAdd } from './request'
import { useProjectModal } from "../../../util";
import { useEffect } from "react";

type Props = {
  param: {
    index: number
    size: number
    name: string
  }
  setParam: (param: Props["param"]) => void
}

export const ModalForm = ({ param, setParam }: Props) => {
  const [form] = Form.useForm();
  const { editId } = useProjectModal()
  const { editingLinePlatForm, isLoading, close, ModalOpen, platId } = useLinePlatFormModal()
  const title = editingLinePlatForm ? "修改" : "新增"
  const msg = editingLinePlatForm ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }
  const useMutateProject = editingLinePlatForm ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingLinePlatForm?.data)
  }, [form, editingLinePlatForm])

  const { data: roadList } = useInit({ index: 1, size: 1000, lineId: editId })

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingLinePlatForm?.data, ...value, id: platId, lineId: editId }).then((res) => {
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
      forceRender={true}
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
              label="路段"
              name="roadId"
              rules={rules}
            >
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  roadList?.data.map((item: any) => (
                    <Select.Option
                      value={item.id}
                      key={item.id}
                    >
                      {item.name}
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="站台名称"
              name="name"
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
