import React, {useCallback, useEffect, useState} from "react";
import {Button, Checkbox, Form, Input, Modal, Select} from "antd";
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
  const [roleList, setRoleList] = useState([])
  const [personList, setPersonList] = useState([])
  const client = useHttp()

  const getRoleLIst = useCallback(() => {
    client(`role/getAll`, {method: "POST"}).then((res) => {
      res.data.forEach((item: any) => {
        item.label = item.name
        item.value = item.id
      })
      setRoleList(res.data)
    })
  }, [client])

  const getPersonList = useCallback(() => {
    client(`person/list`, {method: "POST"}).then(res => {
      console.log(res.data);
      setPersonList(res.data)
    })
  }, [client])

  useEffect(() => {
  getPersonList()
  getRoleLIst()
  }, [getPersonList, getRoleLIst])

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
          label="登陆账户"
          name="loginName"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="人员id"
          name="personId"
          rules={rules}
        >
          <Select>
            {personList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="角色集合"
          name="roles"
          rules={rules}
        >
          <Checkbox.Group options={roleList}/>
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