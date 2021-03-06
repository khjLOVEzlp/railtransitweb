import { useEffect } from "react";
import { Button, Form, Input, message, Modal, Select, Spin } from "antd";
import { rules } from "utils/verification";
import { useUserAll } from 'views/system/child/user/request'
import { useToolTypeModal } from '../util'
import { useMod, useAdd } from '../request'

const { Option } = Select

type Props = {
  param: {
    index: number
    size: number
    name: string
    type: string
  }
  setParam: (param: Props["param"]) => void
}

export const ModalForm = ({ param, setParam }: Props) => {
  const [form] = Form.useForm();
  const { ModalOpen, isLoading, close, editingToolType, editId } = useToolTypeModal()
  const title = editingToolType ? "修改" : "新增"
  const msg = editingToolType ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }
  const useMutateProject = editingToolType ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    if (title === "新增") {
      form.setFieldsValue(null)
    }
    form.setFieldsValue(editingToolType?.data)
  }, [form, editingToolType, title])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingToolType?.data, ...value, id: editId }).then((res) => {
      if (res.code === 200) {
        form.resetFields()
        closeModal()
        msg()
      } else {
        message.error(res.msg)
      }
    })
  }

  const { data: personList } = useUserAll()

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
              label="仓库名称"
              name="name"
              rules={rules}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="类型"
              name="type"
              rules={rules}
            >
              <Select>
                <Option value={1}>轨行区内</Option>
                <Option value={2}>轨行区外</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="联系人"
              name="userId"
              rules={rules}
            >
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {personList?.data.map((item: any, index: number) => <Option value={item.id}
                  key={index}>{item.name}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              label="地址"
              name="address"
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