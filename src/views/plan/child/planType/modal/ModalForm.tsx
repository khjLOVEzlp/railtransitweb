import React, {useState} from "react";
import {Button, DatePicker, Form, Input, Modal, Radio, Select, Space} from "antd";
import {useHttp} from "../../../../../utils/http";
import {useMount, useResetFormOnCloseModal} from "../../../../../hook";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const {Option} = Select;
const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

interface ModalFormProps {
  visible: boolean,
  onCancel: () => void,
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const [materialList, setMaterialList] = useState([])
  const [value, setValue] = useState()
  const [personList, setPersonList] = useState([])
  const client = useHttp()

  const getMaterialList = () => {
    client(`materialType/getAll`, {method: "POST"}).then(res => {
      setMaterialList(res.data)
    })
  }

  const getPersonList = () => {
    client(`person/list`, {method: "POST"}).then((res) => {
      setPersonList(res.data)
    })
  }

  const radioChange = (e: any) => {
    setValue(e.target.value);
  }

  const beginTime = (obj: any | null, time: string) => {
    form.setFieldsValue({beginTime: time})
  }

  const dateTime = (obj: any, time: string) => {
    form.setFieldsValue({dateTime: time})
  }

  const endTime = (obj: any, item: string) => {
    form.setFieldsValue({endTime: item})
  }

  useMount(() => {
    getMaterialList()
    getPersonList()
  })

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
          label="物料列表id集合"
          name="materialList"
        >
          <Select style={{width: "100%"}}>
            {materialList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="工具列表id集合"
          name="toolList"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="作业类型"
          name="type"
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