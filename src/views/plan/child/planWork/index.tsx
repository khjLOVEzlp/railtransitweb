
import styled from "@emotion/styled"
import { Button, Form, Input, Popconfirm, message, Table } from "antd";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useDocumentTitle, useMount } from "../../../../hook";
import { useHttp } from "../../../../utils/http";
import { Dialog } from './dialog/dialog'
export const PlanWork = () => {
  const [loading, setloading] = useState(false)
  const [formData, setformData] = useState({})
  const [isShow, setIsShow] = useState(false)
  const [formType, setFormType] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    name: ''
  })

  const client = useHttp()

  useEffect(() => {
    getUserList()
  }, [pagination.page, pagination.name])

  const getUserList = () => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name
    }

    client(`plan/list?${qs.stringify(param)}`, { method: "POST" }).then(res => {
      setData(res.data)
      setPagination({ ...pagination, totla: res.count })
      setloading(false)
    })
  }

  const search = (values: any) => {
    setPagination({ ...pagination, name: values.username })
    getUserList()
  };

  const add = () => {
    setIsShow(true)
    setFormType('新增')
  }

  const mod = (item: any) => {
    setIsShow(true)
    setFormType('修改')
    setformData(item)
  }

  const fabu = () => {
    setIsShow(true)
    setFormType('发布')
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

  const onChange = (page: number) => {
    setPagination({ ...pagination, page })
  }

  const columns = [
    {
      title: '计划名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '计划执行时间',
      dataIndex: 'beginTime',
      key: 'name',
    },
    {
      title: '是否自动转为计划',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '提醒',
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
      key: 'id',
      render: (item: any) => (
        <><Button type="link" onClick={fabu}>发布计划</Button>
          <Button type="link" onClick={() => mod(item)}>修改</Button>
          <Popconfirm
            title={`是否要删除${item.name}`}
            onConfirm={() => confirm(item)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </>
      )
    },
  ]

  const [data, setData] = useState([])

  useDocumentTitle('作业计划')

  return (
    <div>
      <Header>
        <Form
          name="basic"
          onFinish={search}
          layout={"inline"}
        >
          <Form.Item
            label="计划名称"
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

        <Button onClick={add}>新增</Button>
      </Header>
      <Main>
        <Table columns={columns} loading={loading} pagination={{ total: pagination.totla, onChange: onChange }} dataSource={data} rowKey={(item: any) => item.id} />
      </Main>

      {isShow ? <Dialog formData={formData} formType={formType} isShow={isShow} setIsShow={setIsShow} getUserList={getUserList} /> : ''}
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