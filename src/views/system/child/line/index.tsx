import styled from "@emotion/styled"
import { Button, Form, Input, Table, Popconfirm, message } from "antd";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useDocumentTitle } from "../../../../hook";
import { useHttp } from "../../../../utils/http";
import { LineDialog } from './dialog/LineDialog'
import { Drawermanage } from "./drawermanage/Drawermanage";

export const Line = () => {
  const [visible, setVisible] = useState(false)
  const [isShowDrawer, setIsShowDrawer] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [formType, setFormType] = useState('')
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    name: '',
  })

  const getLine = () => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
    }
    client(`line/list?${qs.stringify(param)}`, { method: "POST" }).then(res => {
      setData(res.data)
      setPagination({ ...pagination, totla: res.count })
    })
  }

  const add = () => {
    setIsShow(true)
    setFormType('新增')
  }

  const manage = (item: any) => {
    setFormData(item)
    setIsShowDrawer(true)
  }

  const mod = (item: any) => {
    setIsShow(true)
    setFormType('修改')
    setFormData(item)
  }

  const del = async (id: number | string) => {
    client(`line/delete/${id}`)
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const client = useHttp()

  useEffect(() => {
    getLine()
  }, [pagination.page, pagination.name])

  useEffect(() => {
    console.log(isShowDrawer);

  }, [isShowDrawer])
  const columns = [
    {
      title: '路线',
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

  useDocumentTitle('地铁管理')

  return (
    <div>
      <Header>
        <Form
          name="basic"
          onFinish={onFinish}
          layout={"inline"}
        >
          <Form.Item
            label="线路名称"
            name="name"
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

      {isShowDrawer ? <Drawermanage formData={formData} isShowDrawer={isShowDrawer} setIsShowDrawer={setIsShowDrawer} /> : ''}

      {isShow ? <LineDialog /> : ''}
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