import {Button, Form, Input, message, Modal, Radio, Select, Spin} from "antd";
import {useEffect} from "react";
import {rules} from "utils/verification";
import {useWarehouse} from "utils/warehouse/toolType";
import {useAdd, useMod} from 'utils/hardware/sim'
import {useSimModal} from './util'
import {useSetUrlSearchParam} from "hook/useUrlQueryParam";

export const ModalForm = () => {
  const [form] = Form.useForm();
  const setUrlParams = useSetUrlSearchParam();
  const {ModalOpen, isLoading, close, editingSim, editingSimId} = useSimModal()
  const title = editingSim ? "修改" : "新增"
  const msg = editingSim ? () => {
    message.success("修改成功")
    close()
  } : () => {
    message.success("新增成功")
    close()
    setUrlParams({index: 1, createSim: ""})
  }
  const useMutateProject = editingSim ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingSim?.data)
  }, [form, editingSim])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingSim, ...value, id: editingSimId}).then((res) => {
      msg()
      form.resetFields()
    }).catch(err => {
      message.error(err.msg)
    })
  }

  const {data: warehouse} = useWarehouse()

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
              label="设备编号"
              name="cardNo"
              rules={rules}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="流量卡号码"
              name="phone"
              rules={[{required: true, len: 11, message: "请输入11位卡号"}]}
            >
              <Input type={"number"}/>
            </Form.Item>

            <Form.Item
              label="运营商"
              name="supplier"
              rules={rules}
            >
              <Radio.Group>
                <Radio value={"移动"}>移动</Radio>
                <Radio value={"联通"}>联通</Radio>
                <Radio value={"电信"}>电信</Radio>
                <Radio value={"其他"}>其他</Radio>
              </Radio.Group>
            </Form.Item>

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

            <Form.Item
              label="备注"
              name="operator"
            >
              <Input/>
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};