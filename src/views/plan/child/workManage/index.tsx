import { useState } from 'react';
import { Form, Input, Button, Table } from 'antd';
import styled from "@emotion/styled";
import { ViewModalForm } from "./modal/ModalForm";
import { useInit } from './workManage';

export const WorkManage = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({})
  const [type, setType] = useState('')
  const [pagination, setPagination] = useState({
    index: 1,
    size: 10,
    name: ''
  })

  const { data, isLoading } = useInit({ ...pagination, })

  const mod = (item: any) => {
    setVisible(true)
    setType('查看')
    setFormData(item)
  }

  const search = (item: any) => {
    setPagination({ ...pagination, name: item.name })
  };

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setPagination({ ...pagination, index: p.current, size: p.pageSize })
  };

  return (
    <>
      <Header>
        <Form
          name="basic"
          onFinish={search}
          layout={"inline"}
        >
          <Form.Item
            label="作业名"
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
      </Header>
      <Main>
        <Table columns={
          [
            {
              title: '作业名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '计划执行时间',
              dataIndex: 'beginTime',
              key: 'beginTime',
            },
            {
              title: '负责人',
              dataIndex: 'leaderName',
              key: 'leaderName',
            },
            {
              title: '是否自动提醒',
              key: 'isWarn',
              render: (isWarn) => (<span>{isWarn === 0 ? '否' : '是'}</span>)
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
            },
            {
              title: '操作',
              key: 'id',
              align: "center",
              render: (item: any) => (
                <>
                  <Button type={"link"} onClick={() => mod(item)}>查看</Button>
                </>
              )
            },
          ]
        } pagination={{ total: data?.count, current: pagination.index, pageSize: pagination.size }}
          onChange={handleTableChange}
          dataSource={data?.data}
          loading={isLoading}
          rowKey={(item: any) => item.id}
        />
      </Main>
      <ViewModalForm visible={visible} type={type} formData={formData} onCancel={hideUserModal} />
    </>
  );
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
