import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { useHttp } from "../../../../../utils/http";
import 'moment/locale/zh-cn';
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";
import { rules } from "../../../../../utils/verification";

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
  const [materialList, setMaterialList] = useState([])
  const [planTypeList, setPlanTypeList] = useState([])
  const client = useHttp()

  useEffect(() => {
    form.setFieldsValue(formData)
    return () => {
      form.setFieldsValue(null)
    }
  }, [formData, form])

  const getMaterialList = useCallback(() => {
    client(`materialType/getAll`, { method: "POST" }).then(res => {
      setMaterialList(res.data)
    })
  }, [client])

  const getPlanTypeList = useCallback(() => {
    client(`planType/getAll`, { method: "POST" }).then(res => {
      setPlanTypeList(res.data)
    })
  }, [client])

  useEffect(() => {
    getMaterialList()
  }, [getMaterialList])

  useEffect(() => {
    getPlanTypeList()
  }, [getPlanTypeList])

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const handleChange = (value: any) => {
    console.log(value);

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
          label="物料"
          name="materialList"
          rules={rules}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            onChange={handleChange}
          >
            {
              materialList.map((item: any) => <Option value={item.id} key={item.id}>{item.name}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="工具"
          name="toolList"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业类型"
          name="type"
          rules={rules}
        >
          <Select style={{ width: "100%" }}>
            {planTypeList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.type}</Option>)}
          </Select>
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