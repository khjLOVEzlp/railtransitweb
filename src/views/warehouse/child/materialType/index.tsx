import {Form, Input, Button, message, Popconfirm, Table} from 'antd';
import styled from "@emotion/styled";
import {ModalForm} from "./modal/ModlaForm";
import {useDel, useInit} from 'utils/warehouse/materialType'
import {useDebounce} from "hook/useDebounce";
import {useMaterialModal} from './util'
import {useProjectsSearchParams} from 'hook/useProjectsSearchParams'

export const MaterialType = () => {
  const [param, setParam] = useProjectsSearchParams()
  const {open, startEdit} = useMaterialModal()
  const {data, isLoading} = useInit(useDebounce(param, 500))
  const {mutateAsync: Del} = useDel()

  const search = (item: any) => {
    setParam({...param, name: item.name, index: 1})
  };

  const del = async (id: number) => {
    Del(id)
  }

  const confirm = (item: any) => {
    del(item.id).then(() => {
      message.success('删除成功')
      setParam({...param, index: 1})
    }).catch(err => {
      message.error(err.msg)
    })
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const handleTableChange = (p: any) => {
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
            <Input placeholder={"物资类型名称"} value={param.name}
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
        {/*<ToolTypeModal
          loading={isLoading}
          data={data?.data}
          cancel={cancel}
          confirm={confirm}
          current={param.index}
          handleTableChange={handleTableChange}
          total={data?.count}
          mod={startEdit}
          pageSize={param.size}
        />*/}
        <Table columns={
          [
            {
              title: '物资类型名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '创建者',
              dataIndex: 'createBy',
              key: 'id',
            },
            {
              title: '创建时间',
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
              render: (item: any) =><>
                <Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                <Popconfirm
                  title={`是否要删除${item.name}`}
                  onConfirm={() => confirm?.(item)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link">删除</Button>
                </Popconfirm>
              </>
            },
          ]
        } pagination={{total: data?.count, current: param.index, pageSize: param.size}} onChange={handleTableChange}
               loading={isLoading} dataSource={data?.data}
               rowKey={(item: any) => item.id}/>
      </Main>
      <ModalForm/>
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