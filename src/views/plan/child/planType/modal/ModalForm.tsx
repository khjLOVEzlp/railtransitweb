import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import 'moment/locale/zh-cn';
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";
import { rules } from "../../../../../utils/verification";
import TextArea from "antd/lib/input/TextArea";
import { useMaterialType } from "../../../../system/child/materialType/materialType";

const { Option } = Select;
/*const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};*/

interface ModalFormProps {
  visible: boolean,
  onCancel: () => void,
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue(formData)
  }, [formData, form, visible, type])

  const { data: material } = useMaterialType()

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const materialListChange = (value: any) => {

  }

  const toolListChange = (value: any) => {
  }


  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={type} width={800} maskClosable={false} visible={visible} onOk={onOk} onCancel={onCancel}
      footer={[<Button key="back" onClick={onCancel}>取消</Button>,
      <Button key="submit" type="primary" onClick={onOk}>提交</Button>]}
    >
      <Form
        form={form}
        name={type}
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

        <Form.Item
          label="物料"
          name="materialList"
          rules={rules}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            onChange={materialListChange}
          >
            {
              material?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.name}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="工具"
          name="toolList"
          rules={rules}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            onChange={toolListChange}
          >
            {
              material?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.name}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <TextArea rows={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};