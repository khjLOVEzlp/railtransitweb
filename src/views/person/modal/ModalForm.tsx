import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal, Radio} from "antd";
import {rules} from "../../../utils/verification";
import {useResetFormOnCloseModal} from "../../../hook/useResetFormOnCloseModal";

/*const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};*/

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState()
  useEffect(() => {
    form.setFieldsValue(formData)
    return () => {
      form.setFieldsValue(null)
    }
  }, [formData, form])

  const radioChange = (e: any) => {
    setValue(e.target.value);
  }

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={type} width={800} visible={visible} onOk={onOk} onCancel={onCancel}
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
          label="姓名"
          name="name"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="性别"
          name="sex"
          rules={rules}
        >
          <Radio.Group onChange={radioChange} defaultValue={1} value={value}>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="身份证号"
          name="identityCard"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系方式"
          name="phone"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="卡号"
          name="number"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="部门id"
          name="departmentId"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="出生日期"
          name="birthday"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="家庭住址"
          name="address"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};