import {Button, Form, Input, message, Modal, Radio, Spin} from "antd";
import {useEffect} from "react";
import {rules} from "utils/verification";
import {useAdd, useMod} from 'utils/hardware/alc'
import {useAlcModal} from './util'

export const ModalForm = () => {
  const [form] = Form.useForm();
  const {ModalOpen, isLoading, close, editingAlc, editingAlcId} = useAlcModal()
  const title = editingAlc ? "修改" : "新增"
  const msg = editingAlc ? () => message.success("修改成功") : () => message.success("新增成功")
  const useMutateProject = editingAlc ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingAlc?.data)
  }, [form, editingAlc])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingAlc, ...value, id: editingAlcId}).then(() => {
      msg()
      form.resetFields()
      close()
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
          <Spin size={"large"}/>
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
              <Input/>
            </Form.Item>

            <Form.Item
              label="厂商"
              name="operator"
              rules={rules}
            >
              <Input/>
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