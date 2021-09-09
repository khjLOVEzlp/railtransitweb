import { Button, Checkbox, Form, Input, message, Modal, Radio, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { rules } from "utils/verification";
import { useWarehouse } from "views/warehouse/child/toolType/request";
import { useAdd, useMod } from './request'
import { useLabModal } from './util'
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
  const [checked, setChecked] = useState<any>(["2.4G"])
  const { ModalOpen, isLoading, close, editingLab, editId } = useLabModal()
  const title = editingLab ? "修改" : "新增"
  const msg = editingLab ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }
  const useMutateProject = editingLab ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    if (title === "新增") {
      setChecked(['2.4G'])
    }
  }, [title])

  useEffect(() => {
    const s = editingLab?.data.type.split(",")
    setChecked(s)
    form.setFieldsValue({ ...editingLab?.data, type: s })
  }, [form, editingLab])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingLab?.data, ...value, type: Array.isArray(value.type) ? value.type.join(",") : value.type, id: editId }).then((res) => {
      form.resetFields()
      closeModal()
      msg()
    }).catch(err => {
      message.error(err.msg)
    })
  }

  const { data: warehouse } = useWarehouse()

  const onOk = () => {
    form.submit();
  };

  function onChange(checkedValues: any) {
    setChecked(checkedValues)
  }

  const plainOptions = ['915M', '2.4G'];

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
          <Spin />
        ) : (
          <Form
            form={form}
            onFinish={onFinish}
            labelAlign="right"
            layout={"vertical"}
          >
            <Form.Item
              label="编码类型"
              name="type"
              initialValue={['2.4G']}
              rules={rules}
            >
              <Checkbox.Group options={plainOptions} onChange={onChange} />
            </Form.Item>

            {
              checked?.find((key: any) => key === '2.4G') && <Form.Item
                label="2.4G编码"
                name="codeHex10"
                rules={rules}
              >
                <Input />
              </Form.Item>
            }

            {
              checked?.find((key: any) => key === '915M') && <Form.Item
                label="915编码"
                name="codeHex915"
                rules={rules}
              >
                <Input />
              </Form.Item>
            }

            <Form.Item
              label="归属仓库"
              name="warehouseId"
              rules={rules}
            >
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {warehouse?.data.map((item: any) => <Select.Option value={item.id}
                  key={item.id}>{item.name}</Select.Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              label="是否使用"
              name="isUse"
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