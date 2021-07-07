import {Button, Form, Input, message, Modal, Radio, Spin} from "antd";
import {useEffect} from "react";
import {rules} from "utils/verification";
import {useAdd, useMod} from 'utils/hardware/pla'
import {usePlaModal} from './util'

export const ModalForm = () => {
  const [form] = Form.useForm();
  const {ModalOpen, isLoading, close, editingPla, editingPlaId} = usePlaModal()
  const title = editingPla ? "修改" : "新增"
  const msg = editingPla ? () => message.success("修改成功") : () => message.success("新增成功")
  const useMutateProject = editingPla ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingPla?.data)
  }, [form, editingPla])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingPla, ...value, id: editingPlaId}).then((res) => {
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
          <Spin/>
        ) : (
          <Form
            form={form}
            onFinish={onFinish}
            labelAlign="right"
            layout={"vertical"}
          >
            <Form.Item
              label="设备名称"
              name="name"
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
              label="流量卡号码"
              name="phone"
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