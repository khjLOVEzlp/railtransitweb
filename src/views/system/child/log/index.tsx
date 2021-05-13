import styled from "@emotion/styled"
import { Button, Form, Input, Table, message, Popconfirm, Space, DatePicker } from "antd";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useDocumentTitle, useMount } from "../../../../hook";
import { useHttp } from "../../../../utils/http";
import { LogModal } from "./dialog/modal";
import {cleanObject} from "../../../../utils";
const { RangePicker } = DatePicker;

export const Log = () => {
  const client = useHttp()
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    operName: '',
    startTime: '',
    endTime: ''
  })
  const [isShow, setIsShow] = useState(false)
  const [formType, setFormType] = useState('')
  const [formData, setFormData] = useState({})
  const getMenuList = () => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.operName,
      startTime: pagination.startTime,
      endTime: pagination.endTime
    }
    client(`log/list?${qs.stringify(cleanObject(param))}`, { method: "POST" }).then(res => {
      setData(res.data)
      setPagination({ ...pagination, totla: res.count })
    })
  }

  const search = (values: any) => {
    setPagination({ ...pagination, operName: values.name })
  };

  const timeChange = (dates: any, dateStrings: any) => {
    console.log(dates, dateStrings)
    setPagination({...pagination, startTime: dateStrings[0], endTime: dateStrings[1]})
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
  }, [pagination.operName, pagination.page, pagination.startTime, pagination.endTime])
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
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ]

  const [data, setData] = useState([])
  useDocumentTitle('日志管理')

  return (
    <div>
      <Header>
        <Form
          name="basic"
          onFinish={search}
          layout={"inline"}
        >
          <Form.Item
            label="操作者"
            name="name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="时间"
            name="time"
          >
            <Space direction="vertical" size={12}>
              <RangePicker onChange={timeChange} />
            </Space>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
        </Button>
          </Form.Item>
        </Form>
      </Header>
      <Main>
        <Table columns={columns} pagination={{ total: pagination.totla, onChange: onChange }} dataSource={data} rowKey={(item: any) => item.id} />
        {isShow ? <LogModal formData={formData} formType={formType} isShow={isShow} setIsShow={setIsShow} getMenuList={getMenuList} /> : ''}
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