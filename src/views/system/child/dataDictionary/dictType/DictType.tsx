import styled from "@emotion/styled"
import { Button, Form, Input, message, Popconfirm, Table } from "antd"
import qs from "qs"
import React, { useEffect, useState } from "react"
import { useHttp } from "../../../../../utils/http"
import { UserModal } from "./dialog/modal"

export const DictType = () => {
  const client = useHttp()
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    type: '',
    name: ''
  })

  const [isShow, setIsShow] = useState(false)
  const [formType, setFormType] = useState('')
  const [formData, setFormData] = useState({})

  const [loading, setloading] = useState(false)

  const [data, setData] = useState([])

  const getHardware = () => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      type: pagination.type,
      name: pagination.name
    }
    client(`dictType/list?${qs.stringify(param)}`, { method: "POST" }).then(res => {
      setData(res.data)
      setPagination({ ...pagination, totla: res.count })
    })
  }

  useEffect(() => {
    getHardware()
  }, [pagination.page, pagination.type])

  const search = (values: any) => {
    setPagination({ ...pagination, name: values.username })
  }

  const add = () => {
    setIsShow(true)
    setFormType('新增')
  }

  const mod = (item: any) => {
    setIsShow(true)
    setFormType('修改')
    setFormData(item)
  }

  const del = async (id: number | string) => {
    client(`dictType/delete/${id}`).then(() => {
      getHardware()
    })
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const onChange = (value: any) => {
    setPagination({ ...pagination, page: value })
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'address',
      render: (item: any) => <><Button type="link" onClick={() => mod(item)}>修改</Button><Popconfirm
        title={`是否要删除${item.name}`}
        onConfirm={() => confirm(item)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">删除</a>
      </Popconfirm></>
    },
  ]

  return (
    <Contianer>
      <Header>
        <Form
          name="basic"
          onFinish={search}
          layout={"inline"}
        >
          <Form.Item
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
      {isShow ? <UserModal formData={formData} formType={formType} isShow={isShow} setIsShow={setIsShow} getHardware={getHardware} /> : ''}
    </Contianer>
  )
}

const Contianer = styled.div`
overflow: hidden;
`

const Header = styled.div`
display: flex;
justify-content: space-between;
margin: 1rem 1rem;
`

const Main = styled.div`

`