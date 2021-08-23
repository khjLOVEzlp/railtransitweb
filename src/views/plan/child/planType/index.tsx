import { Form, Input, Button, Table, Popconfirm, message } from 'antd';
import { ModalForm } from "./modal/ModalForm";
import { useDel, useInit } from './request';
import { useDebounce } from "hook/useDebounce";
import { usePlanTypeModal } from './util'
import { Search } from 'utils/typings';
import { useState } from 'react';
import { noData } from 'utils/verification';
import { Header, Main } from 'components/Styled';

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
                    okText="是"
                    cancelText="否"
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
          locale={noData}
        />
      </Main>
      <ModalForm param={param} setParam={setParam} />
    </>
  );
}