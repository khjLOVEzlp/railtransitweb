import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useHttp } from "../../../../../utils/http";
import { rules } from "../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";

const { Option } = Select;

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

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState([])
  const [personList, setPersonList] = useState([])
  const client = useHttp()
  const data = type === "修改" ? formData : ""

  useEffect(() => {
    form.setFieldsValue(data)
  }, [data, form])

  const getRoleLIst = useCallback(() => {
    client(`role/getAll`, { method: "POST" }).then((res) => {
      res.data.forEach((item: any) => {
        item.label = item.name
        item.value = item.id
      })
      setRoleList(res.data)
    })
  }, [client])

  const getPersonList = useCallback(() => {
    client(`person/list`, { method: "POST" }).then(res => {
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
    <Modal forceRender={true} title={type} width={800} visible={visible} onOk={onOk} onCancel={onCancel}
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
          label="登陆账户"
          name="loginName"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="人员"
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
          <Checkbox.Group options={roleList} />
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