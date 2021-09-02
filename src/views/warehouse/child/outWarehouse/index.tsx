import { Form, Table, DatePicker } from 'antd';
import { useInit } from './request'
import { useDebounce } from "hook/useDebounce";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useState } from 'react';
import { noData } from 'utils/verification';
import { Header, Main } from 'components/Styled';

export const OutWarehouse = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    date: ""
  })

  const { data, isLoading } = useInit(useDebounce(param, 500))

  const search = (item: any) => {
    setParam({ ...param, date: item.date, index: 1 })
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  const birthday = (obj: any, time: string) => {

    setParam({ ...param, index: 1, date: time })
  }

  return (
    <>
      <Form.Provider
      >
        <Header>
          <Form
            name="basic"
            onFinish={search}
            layout={"inline"}
          >
            <Form.Item
              label=""
              name="date"
            >
              <DatePicker format="YYYY-MM-DD" locale={locale} onChange={birthday} />
            </Form.Item>

            {/*<Form.Item>
              <Button types="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>*/}
          </Form>

          {/*<Button onClick={() => add()}>新增</Button>*/}
        </Header>
        <Main>
          <Table columns={
            [
              {
                title: '物资类型名称',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '出库者',
                dataIndex: 'groupName',
                key: 'groupName',
              },
              {
                title: '标签',
                dataIndex: 'labelNum',
                key: 'labelNum',
              },
              {
                title: '出库时间',
                dataIndex: 'createTime',
                key: 'createTime',
              },
            ]
          } pagination={{ total: data?.count, current: param.index, pageSize: param.size }} onChange={handleTableChange}
            loading={isLoading} dataSource={data?.data}
            rowKey={(item) => item.key}
            locale={noData}
          />
        </Main>
      </Form.Provider>
    </>
  );
}
