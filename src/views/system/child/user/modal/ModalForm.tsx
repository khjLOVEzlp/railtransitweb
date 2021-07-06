import React, {useCallback, useEffect, useState} from "react";
import {Button, Checkbox, Form, Input, message, Modal, Select, Spin} from "antd";
import {useHttp} from "utils/http";
import {rules} from "utils/verification";
import {useUserList} from "utils/system/user";
import {useInit} from 'utils/person/personManage'
import {useUserModal} from '../util'
import {useAdd, useMod} from 'utils/system/user'

const {Option} = Select;

export const ModalForm = () => {
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState([])
  const client = useHttp()
  const {ModalOpen, isLoading, close, editingUser, editingUserId} = useUserModal()
  const title = editingUser ? "修改" : "新增"
  const msg = editingUser ? () => message.success("修改成功") : () => message.success("新增成功")
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
    mutateAsync({...editingUser, ...value, id: editingUserId}).then(() => {
      msg()
      form.resetFields()
      close()
    })
  }

  const getRoleLIst = useCallback(() => {
    client(`role/getAll`, {method: "POST"}).then((res) => {
      res.data.forEach((item: any) => {
        item.label = item.name
        item.value = item.id
      })
      setRoleList(res.data)
    })
  }, [client])

  const {data: userList} = useUserList()
  // const { data: personList } = usePerson()
  const {data: personList} = useInit({})

  useEffect(() => {
    getRoleLIst()
  }, [getRoleLIst])

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
                {userList?.data.map((item: any, index: number) => <Option value={item.personId}
                                                                          key={index}>{item.name}</Option>)}
              </Select>) : (<Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {personList?.data.map((item: any, index: number) => <Option value={item.id}
                                                                            key={index}>{item.name}</Option>)}
              </Select>)
            }
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
      }
    </Modal>
  );
};