import {Form, Input, Button, Table} from 'antd';
import styled from "@emotion/styled";
import {ModalForm} from "./modal/ModalForm";
import {useInit} from 'utils/plan/planHistory';
import {useDebounce} from "hook/useDebounce";
import {useHistoryModal} from './util'
import {useProjectsSearchParams} from 'hook/useProjectsSearchParams'
export const WorkManage = () => {
  const [param, setParam] = useProjectsSearchParams()
  const {startEdit} = useHistoryModal()
  const {data, isLoading} = useInit(useDebounce(param, 500))

  const search = (item: any) => {
    setParam({...param, name: item.name})
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
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
            name="name"
          >
            <Input placeholder={"作业名称"} value={param.name}
                   onChange={(evt) => setParam({...param, name: evt.target.value})}/>
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
                  <Button type={"link"} onClick={() => startEdit(item.id)}>查看</Button>
                </>
              )
            },
          ]
        } pagination={{total: data?.count, current: param.index, pageSize: param.size}}
               onChange={handleTableChange}
               dataSource={data?.data}
               loading={isLoading}
               rowKey={(item: any) => item.id}
        />
      </Main>
      <ModalForm/>
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
