import { Modal, Button, Form, Input, Checkbox, Select, message, Tree } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useMount } from '../../../../../hook';
import { useHttp } from '../../../../../utils/http';
const { Option } = Select;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

interface Props {
  formData: object,
  formType: string,
  isShow: boolean,
  setIsShow: (isShow: boolean) => void,
  getRoleList: () => void
}

export const RoleModal = ({ formData, formType, isShow, setIsShow, getRoleList }: Props) => {
  const [form] = useForm()
  const [isModalVisible, setIsModalVisible] = useState(isShow);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [menuList, setMenuList] = useState<any>([])
  const [menu, setMenu] = useState<any>([])
  const client = useHttp()
  useMount(() => {
    client(`menu/getAll?type=1`, { method: "POST" }).then(res => {
      res.data.forEach((item: any) => {
        item.title = item.name
        item.children = item.childMenu
        item.key = item.id

        if (item.childMenu) {
          item.childMenu.forEach((key: any) => {
            key.title = key.name
            key.children = key.childMenu
            key.key = key.id

            if (key.childMenu) {
              key.childMenu.forEach((value: any) => {
                value.title = value.name
                value.children = value.childMenu
                value.key = value.id
              })
            }
          })
        }
      })
      setMenu(res.data)
    })
  })

  const handleOk = () => {
    setIsModalVisible(false);
    setIsShow(false)
    form.submit()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsShow(false)
  };

  const onFinish = (values: any) => {
    let url = ''
    if (formType === '修改') {
      url = 'role/update'
    } else {
      url = 'role/save'
    }
    setConfirmLoading(true);
    client(url, { method: "POST", body: JSON.stringify(values) }).then(() => {
      setConfirmLoading(false);
      message.success(`${formType}成功`)
      getRoleList()
    })
  };

  const options = [
    {
      name: '所有数据权限',
      value: 1
    },
    {
      name: '本部门数据权限',
      value: 2
    },
    {
      name: '本部门及以下数据权限',
      value: 3
    },
    {
      name: '仅本人数据权限',
      value: 4
    }
  ]

  const onSelect = (selectedKeys: any, info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys: any, info: any) => {
    setMenuList([...checkedKeys])
  };

  const handleChange = (value: any) => {
    console.log(value);
  }

  return (
    <Modal title={formType} visible={isModalVisible} onOk={handleOk} width={800} onCancel={handleCancel} maskClosable={false} confirmLoading={confirmLoading} footer={[
      <Button key="back" onClick={handleCancel}>
        取消
            </Button>,
      <Button key="submit" type="primary" onClick={handleOk}>
        提交
            </Button>,
    ]}>
      <Form
        form={form}
        onFinish={onFinish}
        labelAlign="right"
        initialValues={formType === '修改' ? formData : {}}
        {...layout}
      >
        <Form.Item
          label="数据权限"
          name="dataScope"
        >
          <Select onChange={handleChange}>
            {options.map((item: any, index: number) => <Option value={item.value} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="资源集合"
          name="menuList">
          <Tree
            checkable
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={menu}
          />
        </Form.Item>

        <Form.Item
          label="角色名"
          name="name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}