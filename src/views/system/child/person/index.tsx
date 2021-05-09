import styled from "@emotion/styled"
import { Button, Form, Input, Table, Modal } from "antd";
import React, { useState } from "react";
import { useMount } from "../../../../hook";
import { useHttp } from "../../../../utils/http";

export const Person = () => {
  const [loading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };

  const showModal = (title: string) => {
    setTitle(title)
    setVisible(true)
  }

  const handleOk = () => {
  }

  const handleCancel = () => {
    setVisible(false)
  }
  const client = useHttp()
  useMount(() => {
    client(`person/list`, { method: "POST" }).then(res => {
      setData(res.data)
    })
  })
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: () => <><Button type="link" onClick={() => showModal('修改')}>修改</Button><Button type="link">删除</Button></>
    },
  ]

  const [data, setData] = useState([])

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <Header>
        <Form
          name="basic"
          onFinish={onFinish}
          layout={"inline"}
        >
          <Form.Item
            label="角色名"
            name="username"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
        </Button>
          </Form.Item>
        </Form>

        <Button onClick={() => showModal('新增')}>新增</Button>
      </Header>
      <Main>
        <Table columns={columns} dataSource={data} rowKey={(item: any) => item.id} />
      </Main>

      <Modal
        visible={visible}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
            </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            提交
            </Button>,
        ]}
      >
        <Form
          labelAlign="right"
          {...layout}
        >
          <Form.Item
            label="登陆账户"
            name="loginName"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="人员id"
            name="personId"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="角色集合"
            name="roles"
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
    </div>
  )
}

const Header = styled.div`
height: 13rem;
background: #fff;
margin-bottom: 1rem;
border-radius: 1rem;
display: flex;
align-items: center;
padding: 0 2rem;
justify-content: space-between;
`

const Main = styled.div`
background: #fff;
height: 73rem;
border-radius: 1rem;
padding: 0 1.5rem;
`