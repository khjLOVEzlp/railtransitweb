import styled from "@emotion/styled"
import { Button, Form, Input, Table, message, Popconfirm } from "antd";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useDocumentTitle, useMount } from "../../../../hook";
import { useHttp } from "../../../../utils/http";
import { MenuModal } from "./dialog/modal";

export const Menu = () => {
  const client = useHttp()
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    name: ''
  })
  const [isShow, setIsShow] = useState(false)
  const [formType, setFormType] = useState('')
  const [formData, setFormData] = useState({})
  const getMenuList = () => {
    client(`menu/getAll?type=1`, { method: "POST" }).then(res => {
      setData(res.data)
      setPagination({ ...pagination, totla: res.count })
    })
  }

  const search = (values: any) => {
    setPagination({ ...pagination, name: values.username })
  };

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
    client(`menu/delete/${id}`).then(() => {
      getMenuList()
    })
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

  useEffect(() => {
    getMenuList()
  }, [pagination.name, pagination.page])
  const columns = [
    {
      title: '菜单名',
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
      render: (item: any) => <><Button type="link" onClick={() => mod(item)}>修改</Button>
        <Popconfirm
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

  const [data, setData] = useState([])
  useDocumentTitle('菜单管理')

  return (
    <div>
      <Header>
        <Form
          name="basic"
          onFinish={search}
          layout={"inline"}
        >
          <Form.Item
            label="菜单名称"
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
        {isShow ? <MenuModal formData={formData} formType={formType} isShow={isShow} setIsShow={setIsShow} getMenuList={getMenuList} /> : ''}
      </Main>
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