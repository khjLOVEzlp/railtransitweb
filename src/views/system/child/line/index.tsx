import styled from "@emotion/styled"
import { Button, Form, Input, Table, Modal, Popconfirm, message } from "antd";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useMount } from "../../../../hook";
import { useHttp } from "../../../../utils/http";
import { LineDialog } from './dialog/LineDialog'

export const Line = () => {
  const [loading, setloading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [formData, setFormData] = useState({})
  const [formType, setFormType] = useState('')
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    name: ''
  })

  const add = () => {
    setIsShow(true)
    setFormType('新增')
  }

  const manage = (item: any) => {
    setIsShow(true)
    setFormType('线路详情')
    setFormData(item)
  }

  const mod = (item: any) => {
    setIsShow(true)
    setFormType('修改')
    setFormData(item)
  }

  const del = async (id: number | string) => {
    client(`plan/delete/${id}`)
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const client = useHttp()
  useEffect(() => {
    let { page, size } = pagination
    client(`log/list?index=${page}&size=${size}`, { method: "POST" }).then(res => {
      setData(res.data)
      setPagination({ ...pagination, totla: res.count })
    })

    console.log(pagination.page);

  }, [pagination.page])

  const columns = [
    {
      title: '操作者',
      dataIndex: 'operName',
      key: 'operName',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '操作时间',
      dataIndex: 'operTime',
      key: 'operTime',
    },
    {
      title: '操作',
      key: 'id',
      render: (item: any) => (<><Button type="link" onClick={() => manage(item)}>管理</Button><Button type="link" onClick={() => mod(item)}>修改</Button><Popconfirm
        title={`是否要删除${item.name}`}
        onConfirm={() => confirm(item)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">删除</a>
      </Popconfirm></>)
    },
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onChange = (page: number) => {
    setPagination({ ...pagination, page })
  }

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

        <Button onClick={() => add()}>新增</Button>
      </Header>
      <Main>
        <Table columns={columns} pagination={{ total: pagination.totla, onChange: onChange }} dataSource={data} rowKey={(item: any) => item.id} />
      </Main>

      {isShow ? <LineDialog setIsShow={setIsShow} formData={formData} formType={formType} /> : ''}
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
overflow-y: auto;
`