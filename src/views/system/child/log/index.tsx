import styled from "@emotion/styled"
import { Button, Form, Input, Table, Space, DatePicker } from "antd";
import qs from "qs";
import React, {useCallback, useEffect, useState} from "react";
import { useHttp } from "../../../../utils/http";
import {cleanObject} from "../../../../utils";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;

export const Log = () => {
  const client = useHttp()

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    operName: '',
    startTime: '',
    endTime: ''
  })

  const [data, setData] = useState([])

  const init = useCallback(() => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.operName,
      startTime: pagination.startTime,
      endTime: pagination.endTime
    }
    client(`log/list?${qs.stringify(cleanObject(param))}`, { method: "POST" }).then(res => {
      setData(res.data)
      setPagination({ ...pagination, total: res.count })
    })
  }, [client, pagination.page, pagination.operName, pagination.startTime, pagination.endTime])

  useEffect(() => {
    init()
  }, [init])

  const search = (values: any) => {
    setPagination({ ...pagination, operName: values.name })
  };

  const timeChange = (dates: any, dateStrings: any) => {
    console.log(dates, dateStrings)
    setPagination({...pagination, startTime: dateStrings[0], endTime: dateStrings[1]})
  }

  const onChange = (page: number) => {
    setPagination({ ...pagination, page })
  }

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
              <RangePicker locale={locale} onChange={timeChange} />
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
        <Table columns={columns} pagination={{ total: pagination.total, onChange: onChange }} dataSource={data} rowKey={(item: any) => item.id} />
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