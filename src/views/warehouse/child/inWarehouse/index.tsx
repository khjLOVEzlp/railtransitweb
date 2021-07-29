import { Form, Table, DatePicker } from 'antd';
import styled from "@emotion/styled";
import { useInit, useProjectsSearchParams } from '../../../../utils/warehouse/inWarehouse'
import { useDebounce } from "../../../../hook/useDebounce";
import locale from "antd/es/date-picker/locale/zh_CN";

export const InWarehouse = () => {
  const [param, setParam] = useProjectsSearchParams()
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
              <DatePicker locale={locale} onChange={birthday} />
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
                title: '入库者',
                dataIndex: 'groupName',
                key: 'groupName',
              },
              {
                title: '标签',
                dataIndex: 'labelNum',
                key: 'labelNum',
              },
              {
                title: '入库时间',
                dataIndex: 'createTime',
                key: 'createTime',
              },

            ]
          } pagination={{ total: data?.count, current: param.index, pageSize: param.size }} onChange={handleTableChange}
            loading={isLoading} dataSource={data?.data}
            rowKey={(item, index: any) => index} />
        </Main>
      </Form.Provider>
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