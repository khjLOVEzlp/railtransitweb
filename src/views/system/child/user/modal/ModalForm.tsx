import { useEffect } from "react";
import { Button, Checkbox, Form, Input, message, Modal, Select, Spin } from "antd";
import { rules } from "utils/verification";
import { useUserList } from "../request";
import { useInit } from 'views/person/child/personManage/request'
import { useUserModal } from '../util'
import { useAdd, useMod } from '../request'
import { useRoleAll } from "views/system/child/role/request";

const { Option } = Select;

type Props = {
  param: {
    index: number
    size: number
    name: string
  }
  setParam: (param: Props["param"]) => void
}

export const ModalForm = ({ param, setParam }: Props) => {
  const [form] = Form.useForm();
  const { data: userList } = useUserList()
  const { data: personList } = useInit({})
  const { data: roleList } = useRoleAll()

  const { ModalOpen, isLoading, close, editingUser, editId, isSuccess } = useUserModal()
  const title = editingUser ? "修改" : "新增"
  const msg = editingUser ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }
  const useMutateProject = editingUser ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    if (isSuccess) {
      editingUser.data.personId = personList?.data.map(item => item.id).includes(editingUser.data.personId) ? editingUser.data.personId : null
      form.setFieldsValue(editingUser?.data)
    }
  }, [form, editingUser])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingUser?.data, ...value, id: editId }).then((res) => {
      if (res.code === 200) {
        form.resetFields()
        closeModal()
        msg()
      } else {
        message.error(res.msg)
      }
    })
  }

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      forceRender={true}
      title={title}
      width={800}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>取消</Button>,
        <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>
      ]}
    >
      {
        isLoading ? (
          <Spin size={"large"} />
        ) : <Form
          form={form}
          onFinish={onFinish}
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
            !editingUser ? <Form.Item
              label="密码"
              name="password"
              rules={rules}
              getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
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
              !editingUser ? (<Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {userList?.data.map((item: any) => <Option disabled={item.disabled} value={item.personId}
                  key={item.id}>{item.name}</Option>)}
              </Select>) : (<Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {personList?.data.map((item: any) => <Option disabled={item.disabled} value={item.id}
                  key={item.id}>{item.name}</Option>)}
              </Select>)
            }
          </Form.Item>

          <Form.Item
            label="角色集合"
            name="roles"
            rules={rules}
          >
            <Checkbox.Group options={roleList?.data} />
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