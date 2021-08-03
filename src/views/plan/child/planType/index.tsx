import { Form, Input, Button, Table, Popconfirm, message } from 'antd';
import styled from "@emotion/styled";
import { ModalForm } from "./modal/ModalForm";
import { useDel, useInit, useProjectsSearchParams } from './request';
import { useDebounce } from "hook/useDebounce";
import { usePlanTypeModal } from './util'
import { Search } from 'utils/typings';
import { useState } from 'react';

export const PlanType = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    type: ""
  })

  const { open, startEdit } = usePlanTypeModal()
  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Del } = useDel()

  const confirm = (id: number) => {
    Del(id).then((res) => {
      if (res.code !== 200) {
        message.error(res.msg)
      } else {
        message.success('删除成功')
        setParam({ ...param, index: 1 })
      }
    })
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const search = (item: Search) => {
    setParam({ ...param, type: item.type, index: 1 })
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
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
            label=""
            name="type"
          >
            <Input placeholder={"作业类型"} value={param.type}
              onChange={(evt) => setParam({ ...param, type: evt.target.value })} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>

        <Button onClick={open}>新增</Button>
      </Header>
      <Main>
        <Table columns={
          [
            {
              title: '作业类型',
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: '时间',
              dataIndex: 'createTime',
              key: 'createTime',
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
              render: (item) => (
                <>
                  <Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                  <Popconfirm
                    title={`是否要删除${item.type}`}
                    onConfirm={() => confirm(item.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link">删除</Button>
                  </Popconfirm>
                </>
              )
            },
          ]
        } pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
          onChange={handleTableChange}
          dataSource={data?.data}
          loading={isLoading}
          rowKey={(item) => item.id}
        />
      </Main>
      <ModalForm />
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
