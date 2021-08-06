import { Form, Input, Button, Table } from 'antd';
import { useInit } from './request';
import { useDebounce } from 'hook/useDebounce';
import { Search } from 'utils/typings';
import { useState } from 'react';
import { noData } from 'utils/verification';
import { Header, Main } from 'components/Styled';

export const SpiritStatus = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: ""
  })

  const { data, isLoading } = useInit(useDebounce(param, 500))

  const search = (item: Search) => {
    setParam({ ...param, name: item.name, index: 1 })
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  const isStatus = (status: number) => {
    switch (status) {
      case 0:
        return (
          <span>无状态</span>
        )

      case 1:
        return (
          <span>正常</span>
        )

      case 2:
        return (
          <span style={{ color: "red" }}>异常</span>
        )

      default:
        break;
    }
  }

  return (
    <>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
        }}
      >
        <Header>
          <Form
            name="basic"
            onFinish={search}
            layout={"inline"}
          >
            <Form.Item
              label=""
              name="name"
            >
              <Input placeholder={"姓名"} value={param.name} onChange={(evt) => setParam({ ...param, name: evt.target.value })} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>

          {/* <Button onClick={() => add()}>新增</Button> */}
        </Header>
        <Main>
          <Table columns={
            [
              {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '归属部门',
                dataIndex: 'departmentName',
                key: 'departmentName',
              },
              {
                title: '作业名称',
                dataIndex: 'workName',
                key: 'workName',
              },
              {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
              },
              {
                title: "体温状态",
                render: (item) => <>{isStatus(item.isTemNormal)}</>
              },
              {
                title: "酒精状态",
                render: (item) => <>{isStatus(item.isAlcNormal)}</>
              },
              {
                title: "血压状态",
                render: (item) => <>{isStatus(item.isBloodNormal)}</>
              },
            ]
          } pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
            onChange={handleTableChange}
            loading={isLoading}
            dataSource={data?.data}
            rowKey={(item) => item.id}
            locale={noData}
          />
        </Main>
      </Form.Provider>
    </>
  );
};