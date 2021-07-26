import React, {useEffect} from "react";
import {Button, Checkbox, Form, Input, message, Modal, Select, Spin} from "antd";
import {rules} from "utils/verification";
import {useUserList} from "utils/system/user";
import {useInit} from 'utils/person/personManage'
import {useUserModal} from '../util'
import {useAdd, useMod} from 'utils/system/user'
import {useSetUrlSearchParam} from "hook/useUrlQueryParam";
import {useRoleAll} from "utils/system/role";

const {Option} = Select;

export const ModalForm = () => {
  const [form] = Form.useForm();
  const {data: userList} = useUserList()
  const {data: personList} = useInit({})
  const {data: roleList} = useRoleAll()

  const setUrlParams = useSetUrlSearchParam();
  const {ModalOpen, isLoading, close, editingUser, editingUserId} = useUserModal()
  const title = editingUser ? "修改" : "新增"
  const msg = editingUser ? () => {
    message.success("修改成功")
    close()
  } : () => {
    message.success("新增成功")
    close()
    setUrlParams({index: 1, createUser: ""})
  }
  const useMutateProject = editingUser ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingUser?.data)
  }, [form, editingUser])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingUser, ...value, id: editingUserId}).then((res) => {
      if (res.code === 200) {
        msg()
        form.resetFields()
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
          <Spin size={"large"}/>
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
            <Input/>
          </Form.Item>

          {
            !editingUser ? <Form.Item
              label="密码"
              name="password"
              rules={rules}
              getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
            >
              <Input/>
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
                {userList?.data.map((item: any) => <Option value={item.personId}
                                                                          key={item.id}>{item.name}</Option>)}
              </Select>) : (<Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {personList?.data.map((item: any) => <Option value={item.id}
                                                                            key={item.id}>{item.name}</Option>)}
              </Select>)
            }
          </Form.Item>

          <Form.Item
            label="角色集合"
            name="roles"
            rules={rules}
          >
            <Checkbox.Group options={roleList?.data}/>
          </Form.Item>

          <Form.Item
            label="备注"
            name="remark"
          >
            <Input/>
          </Form.Item>
        </Form>
      }
    </Modal>
  );
};