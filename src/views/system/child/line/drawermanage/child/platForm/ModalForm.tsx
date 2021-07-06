import {Button, Form, Input, message, Modal, Select, Spin} from "antd";
import {rules} from "utils/verification";
import {useLinePlatFormModal} from './util'
import {useInit} from 'utils/system/lineRoad'
import {useMod, useAdd} from 'utils/system/linePlatform'
import {useProjectModal} from "../../../util";
import {useEffect} from "react";

export const ModalForm = () => {
  const [form] = Form.useForm();
  const {editingProjectId} = useProjectModal()
  const {editingLinePlatForm, isLoading, close, ModalOpen, editingLinePlatFormId} = useLinePlatFormModal()
  const title = editingLinePlatForm ? "修改" : "新增"
  const msg = editingLinePlatForm ? () => message.success("修改成功") : () => message.success("新增成功")
  const useMutateProject = editingLinePlatForm ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingLinePlatForm?.data)
  }, [form, editingLinePlatForm])

  const {data: roadList} = useInit({index: 1, size: 1000, lineId: editingProjectId})

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingLinePlatForm, ...value, id: editingLinePlatFormId, lineId: editingProjectId}).then(() => {
      msg()
      form.resetFields()
      close()
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
          <Spin size={"large"}/>
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
};
