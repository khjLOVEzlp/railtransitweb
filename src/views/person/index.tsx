import styled from "@emotion/styled"
import { Button, Form, Input, Table } from "antd"
import React, { useEffect, useState } from "react"
import { useMount } from "../../hook"
import { useHttp } from "../../utils/http"

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
export const Person = () => {
  const [isShow, setIsShow] = useState(false)
  const [title, setTitle] = useState('')
  const [data, setData] = useState([])
  const [loading, setloading] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    type: ''
  })
  const client = useHttp()

  useEffect(() => {
    client(`person/list`, { method: "POST" }).then(res => {
      setData(res.data)
    })
  }, [pagination.type, pagination.totla, pagination.page])
  useMount(() => {
  })

  const onChange = (page: number) => {
    setPagination({ ...pagination, page })
  }

  const handleChange = (value: any) => {
    setPagination({ ...pagination, type: value })
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const showModal = (title: string) => {
    setTitle(title)
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (item: any) => {
        console.log(item);

        return item == '0' ? '男' : '女'
      }
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '身份证',
      dataIndex: 'identityCard',
      key: 'identityCard',
    },
    {
      title: '部门id',
      dataIndex: 'departmentId',
      key: 'departmentId',
    },
    {
      title: '出身日期',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: '卡号',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '体温状态',
      dataIndex: 'number',
      key: 'number',
      render: () => <><Button type="link" onClick={() => setIsShow(true)}>查看</Button></>
    },
    {
      title: '酒精状态',
      dataIndex: 'number',
      key: 'number',
      render: () => <><Button type="link">查看</Button></>
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
  return (
    <AlarmStyle>
      <Header>
        <Form
          name="basic"
          onFinish={onFinish}
          layout={"inline"}
        >
          <Form.Item
            label="用户名称"
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
        <Table columns={columns} pagination={{ total: pagination.totla, onChange: onChange }} dataSource={data} rowKey={(item: any) => item.id} />
      </Main>
    </AlarmStyle>
  )
}

const AlarmStyle = styled.div`

`

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
border-radius: 1rem;
padding: 0 3rem;
overflow: hidden;
overflow-y: auto;
height: 73rem;
`

