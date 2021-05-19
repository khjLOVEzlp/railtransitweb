import {Button, Form, Input, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import {useHttp} from "../../../../../utils/http";
import {useResetFormOnCloseModal} from "../../../../../hook";
import {rules} from "../../../../../utils/verification";

const {Option} = Select;

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {

  const [form] = Form.useForm();
  const [departmentList, setDepartmentList] = useState([])
  const client = useHttp()
  useEffect(() => {
    client(`department/getAll`).then(res => {
      setDepartmentList(res.data)
    })
  }, [])

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
        initialValues={type === '修改' ? formData : {}}
        labelAlign="right"
        {...layout}
      >
        <Form.Item
          label="管辖部门集合"
          name="departmentIds"
          rules={rules}
        >
          <Select>
            {departmentList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="线路名称"
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
    </Modal>
  );
};