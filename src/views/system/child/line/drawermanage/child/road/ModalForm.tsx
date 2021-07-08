import React, {useEffect} from "react";
import {Button, Form, Input, message, Modal, Spin} from "antd";
import {rules} from "utils/verification";
import {useLineRoadModal} from './util'
import {useAdd, useMod} from 'utils/system/lineRoad'
import {useProjectModal} from "../../../util";

export const ModalForm = () => {
  const {editingProjectId} = useProjectModal()
  const {ModalOpen, editingLineRoad, close, isLoading, editingLineRoadId} = useLineRoadModal()
  const [form] = Form.useForm();
  const title = editingLineRoad ? "修改" : "新增"
  const msg = editingLineRoad ? () => message.success("修改成功") : () => message.success("新增成功")
  const useMutateProject = editingLineRoad ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingLineRoad?.data)
  }, [form, editingLineRoad])

  const onOk = () => {
    form.submit();
  };

  const onFinish = (value: any) => {
    mutateAsync({...editingLineRoad, ...value, id: editingLineRoadId, lineId: editingProjectId}).then(() => {
      msg()
      form.resetFields();
      close();
    }).catch(err => {
      message.error(err.msg)
    })
  }

  const closeModal = () => {
    form.resetFields()
    close()
  }

  return (
    <Modal
      forceRender={true}
      style={{zIndex: 9999999999}}
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
              label="区间"
              name="name"
              rules={rules}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="备注"
              name="remark"
            >
              <Input/>
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
}