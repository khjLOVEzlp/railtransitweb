import { Button, Form, Input, message, Modal, Select, Space, Spin } from "antd";
import 'moment/locale/zh-cn';
import { rules } from "utils/verification";
import TextArea from "antd/lib/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { usePlanTypeModal } from '../util'
import { useAdd, useMod } from "../request";
import { useEffect } from "react";
import { useMaterialType } from 'views/warehouse/child/materialType/request'

const { Option } = Select;

type Props = {
  param: {
    index: number
    size: number
    type: string
  }
  setParam: (param: Props["param"]) => void
}

export const ModalForm = ({ param, setParam }: Props) => {
  const [form] = Form.useForm();

  const { ModalOpen, close, isLoading, editingPlanType, editId } = usePlanTypeModal()
  const title = editingPlanType ? "修改" : "新增"
  const msg = editingPlanType ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }
  const useMutateProject = editingPlanType ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();
  const { data: tool } = useMaterialType(1)
  const { data: material } = useMaterialType(2)

  useEffect(() => {
    form.setFieldsValue(editingPlanType?.data)
  }, [form, editingPlanType])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingPlanType?.data, ...value, id: editId }).then(() => {
      form.resetFields()
      closeModal()
      msg()
    })
  }

  const materialListChange = (value: any) => {

  }

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title={title}
      width={800}
      maskClosable={false}
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
            autoComplete="off"
            onFinish={onFinish}
            form={form}
            labelAlign="right"
            layout={"vertical"}
          >
            <Form.Item
              label="作业类型"
              name="type"
              rules={rules}
            >
              <Input />
            </Form.Item>

            <Form.List name="materialList">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        style={{ width: '100%' }}
                        {...restField}
                        name={[name, 'materialId']}
                        fieldKey={[fieldKey, 'materialId']}
                        rules={rules}
                        label={"物料"}
                      >
                        <Select
                          onChange={materialListChange}
                        >
                          {
                            material?.data.map((item: any) => <Option value={item.id}
                              key={item.id}>{item.name}</Option>)
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item
                        style={{ width: '100%' }}
                        {...restField}
                        name={[name, 'num']}
                        fieldKey={[fieldKey, 'num']}
                        rules={rules}
                        label={"数量"}
                        getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
                      >
                        <Input placeholder="数量" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      添加物料
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.List name="toolList">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8, width: '100%' }} align="baseline">
                      <Form.Item
                        style={{ width: '100%' }}
                        {...restField}
                        name={[name, 'toolId']}
                        fieldKey={[fieldKey, 'toolId']}
                        rules={rules}
                        label={"工具"}
                      >
                        <Select
                          onChange={materialListChange}
                        >
                          {
                            tool?.data.map((item: any) => <Option value={item.id}
                              key={item.id}>{item.name}</Option>)
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item
                        style={{ width: '100%' }}
                        {...restField}
                        name={[name, 'num']}
                        fieldKey={[fieldKey, 'num']}
                        rules={rules}
                        label={"数量"}
                        getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
                      >
                        <Input placeholder="数量" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      添加工具
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item
              label="备注"
              name="remark"
            >
              <TextArea rows={1} />
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};
