import {Button, Form, Input, message, Modal, Radio, Select, Spin} from "antd";
import {useEffect} from "react";
import {rules} from "utils/verification";
import {usePerson} from "utils/person/personManage";
import {useSepModal} from './util'
import {useMod, useAdd} from 'utils/hardware/sep'

export const ModalForm = () => {
  const [form] = Form.useForm();
  const {ModalOpen, isLoading, close, editingSep, editingSepId} = useSepModal()
  const title = editingSep ? "修改" : "新增"
  const msg = editingSep ? () => message.success("修改成功") : () => message.success("新增成功")
  const useMutateProject = editingSep ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingSep?.data)
  }, [form, editingSep])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingSep, ...value, id: editingSepId}).then((res) => {
        msg()
        form.resetFields()
        close()
    }).catch(err => {
      message.error(err.msg)
    })
  }

  const {data: personList} = usePerson()

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
              name="codeNumber"
              rules={rules}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="人员"
              name="personId"
              rules={rules}
            >
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {personList?.data.map((item: any, index: number) => <Select.Option value={item.id}
                                                                                   key={index}>{item.name}</Select.Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              label="imei号"
              name="imei"
              rules={rules}
              getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="流量卡号码"
              name="phone"
              rules={[{required: true, len: 10, message: "请输入10位卡号"}]}
            >
              <Input type={"number"}/>
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