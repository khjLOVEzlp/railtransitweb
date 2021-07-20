import {Button, DatePicker, Form, Input, message, Modal, Spin} from "antd"
import locale from 'antd/es/date-picker/locale/zh_CN';
import {useForm} from "antd/lib/form/Form";
import {useToolModal} from '../util'
import React, {useEffect} from "react";
import {useModMaterial} from 'utils/warehouse/toolType'
import moment from "moment";

export const ToolModalForm = () => {
  const [form] = useForm()
  const {ModalOpen, close, isLoading, viewTool, viewToolDetailId} = useToolModal()
  const {mutateAsync, isLoading: mutateLoading} = useModMaterial()
  useEffect(() => {
    if (viewTool) {
      form.setFieldsValue({
        ...viewTool?.data,
        invalidTime: moment(viewTool?.data?.invalidTime)
      })
    }
  }, [viewTool])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...viewTool?.data, ...value, id: viewToolDetailId}).then((res) => {
      if (res.code === 200) {
        message.success("修改成功")
        form.resetFields()
        close()
      } else {
        message.error(res.msg)
      }
    })
  }

  const onOk = () => {
    form.submit();
  };

  return (
    <>
      <Modal
        title="详情"
        width={800}
        onOk={onOk}
        visible={ModalOpen}
        onCancel={closeModal}
        style={{zIndex: 10000}}
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
              layout={"vertical"}
              onFinish={onFinish}
            >
              <Form.Item
                label={"失效时间"}
                name={"invalidTime"}
              >
                  <DatePicker locale={locale}/>
              </Form.Item>

              <Form.Item
                label={"标签"}
                name={"labelNum"}
              >
                <Input disabled/>
              </Form.Item>

              <Form.Item
                label={"仓库"}
                name={"warehouseId"}
              >
                <Input disabled/>
              </Form.Item>

              <Form.Item
                label={"备注"}
                name={"remark"}
              >
                <Input/>
              </Form.Item>
            </Form>
          )
        }
      </Modal>
    </>
  )
}