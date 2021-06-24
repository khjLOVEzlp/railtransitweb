import styled from "@emotion/styled"
import { Button, Form, Input, Table, Space, DatePicker } from "antd";
import { useState } from "react";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useInit } from "./log";
const { RangePicker } = DatePicker;

export const Log = () => {

  const [pagination, setPagination] = useState({
    index: 1,
    size: 10,
    operName: '',
    startTime: '',
    endTime: ''
  })

  const { data, isLoading } = useInit({ ...pagination })

  const search = (values: any) => {
    setPagination({ ...pagination, operName: values.name, index: 1 })
  };

  const timeChange = (dates: any, dateStrings: any) => {
    setPagination({ ...pagination, index: 1, startTime: dateStrings[0], endTime: dateStrings[1] })
  }

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setPagination({ ...pagination, index: p.current, size: p.pageSize })
  };

  const columns = [
    {
      title: '操作者',
      dataIndex: 'operName',
      key: 'operName',
    },
    {
      title: "操作时间",
      dataIndex: 'operTime',
      key: 'id',
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
            <Space direction="vertical" size={50}>
              <RangePicker style={{ width: "100%" }} locale={locale} onChange={timeChange} />
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
        <Table columns={columns} pagination={{ total: data?.count }} onChange={handleTableChange} loading={isLoading} dataSource={data?.data} rowKey={(item: any) => item.id} />
      </Main>
    </div>
  )
}

const Header = styled.div`
  height: 12.5rem;
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