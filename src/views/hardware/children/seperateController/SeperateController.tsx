import {Form, Input, Button, Table, Popconfirm, message} from 'antd';
import styled from "@emotion/styled";
import {useDel, useInit} from 'utils/hardware/sep';
import {ModalForm} from './ModalForm'
import {useDebounce} from 'hook/useDebounce';
import {useSepModal} from './util'
import {useProjectsSearchParams} from 'hook/useProjectsSearchParams'

export const SeperateController = () => {
  const [param, setParam] = useProjectsSearchParams()
  const {open, startEdit} = useSepModal()
  const {data, isLoading} = useInit(useDebounce(param, 500))
  const {mutateAsync: Del} = useDel()

  const search = (item: any) => {
    setParam({...param, name: item.name, index: 1})
  };

  const del = async (id: number) => {
    Del(id)
  }

  const confirm = (id: number) => {
    del(id).then(() => {
      message.success('删除成功')
      setParam({...param, index: 1})
    }).catch(err => {
      message.error(err.msg)
    })
  }

  const cancel = () => {
    message.error('取消删除');
  }

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
            name="name"
          >
            <Input placeholder={"设备编号"} value={param.name}
                   onChange={(evt) => setParam({...param, name: evt.target.value})}/>
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
              title: '设备编号',
              dataIndex: 'codeNumber',
              key: 'codeNumber',
            },
            {
              title: '使用人',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '在线状态',
              key: 'status',
              render: (item: any) => item.status === "0" ? '离线' : '在线'
            },
            {
              title: 'imei号',
              dataIndex: 'imei',
              key: 'imei',
            },
            {
              title: '是否使用',
              key: 'isUse',
              render: (item: any) => item.isUse === "0" ? '使用' : '未使用'
            },
            {
              title: '操作',
              key: 'id',
              render: (item: any) => <><Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                <Popconfirm
                  title={`是否要删除${item.codeNumber}`}
                  onConfirm={() => confirm(item.id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type={"link"}>删除</Button>
                </Popconfirm></>
            },
          ]
        } pagination={{total: data?.count, current: param.index, pageSize: param.size,}} onChange={handleTableChange}
               loading={isLoading} dataSource={data?.data}
               rowKey={(item: any) => item.id}/>
      </Main>
      <ModalForm/>
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
`

const Main = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 0 1.5rem;
`