import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, Input, Modal, Select} from "antd";
import {useHttp} from "../../../../../utils/http";
import 'moment/locale/zh-cn';
import {useResetFormOnCloseModal} from "../../../../../hook/useResetFormOnCloseModal";

const {Option} = Select;
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

export const ModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();
  const [materialList, setMaterialList] = useState([])
  const client = useHttp()
  const data = type === "修改" ? formData : ""

  useEffect(() => {
    form.setFieldsValue(data)
  }, [data, form])

  const getMaterialList = useCallback(() => {
    client(`materialType/getAll`, {method: "POST"}).then(res => {
      setMaterialList(res.data)
    })
  }, [client])

  useEffect(() => {
    getMaterialList()
  }, [getMaterialList])

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