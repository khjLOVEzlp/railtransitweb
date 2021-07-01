import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Select, Spin } from "antd";
import { useHttp } from "../../../../../utils/http";
import { rules } from "../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";
import { useDetail, useUserList } from "../user";
import { usePerson } from "../../../../person/person";

const { Option } = Select;

/*const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};*/

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  id: number | undefined
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, id }) => {
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState([])
  const client = useHttp()

  const { data: formData, isLoading } = useDetail(id)

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue({ ...formData?.data })
  }, [formData, form, visible, type])

  const getRoleLIst = useCallback(() => {
    client(`role/getAll`, { method: "POST" }).then((res) => {
      res.data.forEach((item: any) => {
        item.label = item.name
        item.value = item.id
      })
      setRoleList(res.data)
    })
  }, [client])

  const { data: userList } = useUserList()
  const { data: personList } = usePerson()

  useEffect(() => {
    getRoleLIst()
  }, [getRoleLIst])

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
      {
        isLoading ? (
          <Spin size={"large"} />
        ) : <Form
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

          {
            type === "新增" ? <Form.Item
              label="密码"
              name="password"
              rules={rules}
            >
              <Input />
            </Form.Item> : ""
          }

          <Form.Item
            label="人员"
            name="personId"
            rules={rules}
          >
            {
              type === "新增" ? (<Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {userList?.data.map((item: any, index: number) => <Option value={item.personId} key={index}>{item.name}</Option>)}
              </Select>) : (<Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {personList?.data.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
              </Select>)
            }
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
      }
    </Modal>
  );
};