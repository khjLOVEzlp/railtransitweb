import {DatePicker, Form, Input, Modal, Space} from "antd"
import {useToolDetail} from "utils/warehouse/toolType"
import locale from 'antd/es/date-picker/locale/zh_CN';
import {useForm} from "antd/lib/form/Form";
import {useEffect, useState} from "react";

export const ToolModalForm = () => {
  const [visible] = useState(false)
  const [form] = useForm()

  const beginTime = (obj: any | null, time: string) => {
    form.setFieldsValue({beginTime: time})
  }

  const onCancel = () => {}

  const onOk = () => {
    form.submit();
  };

  return (
    <>
      <Modal
        title="详情"
        width={800}
        onOk={onOk}
        visible={visible}
        onCancel={onCancel}
        okText="提交"
        cancelText="取消">
        <Form
          form={form}
          layout={"vertical"}
        >
          <Form.Item
            label={"失效时间"}
            name={"invalidTime"}
          >
            <Space direction="vertical" style={{width: '30rem'}}>
              <DatePicker locale={locale} onChange={beginTime}/>
            </Space>
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
      </Modal>
    </>
  )
}