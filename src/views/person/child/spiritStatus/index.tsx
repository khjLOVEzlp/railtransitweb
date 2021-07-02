import { Form, Input, Button, Table } from 'antd';
import styled from "@emotion/styled";
import { useInit, useProjectsSearchParams } from '../../../../utils/person/personStatus';
import { useDebounce } from '../../../../hook/useDebounce';

export const SpiritStatus = () => {
  const [param, setParam] = useProjectsSearchParams()

  const { data, isLoading } = useInit(useDebounce(param, 500))

  const search = (item: any) => {
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
          <span>异常</span>
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
                title: "体温状态",
                render: (item: any) => <>{isStatus(item.isTemNormal)}</>
              },
              {
                title: "酒精状态",
                render: (item: any) => <>{isStatus(item.isAlcNormal)}</>
              },
              {
                title: "血压状态",
                render: (item: any) => <>{isStatus(item.isBloodNormal)}</>
              },
            ]
          } pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
            onChange={handleTableChange}
            loading={isLoading}
            dataSource={data?.data}
            rowKey={(item: any) => item.id} />
        </Main>
      </Form.Provider>
    </>
  );
};

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