import { Button, Form, Input, message, Popconfirm, Table } from "antd";
import styled from "@emotion/styled";
import { useDel, useInit, useProjectsSearchParams } from "utils/system/lineRoad";
import { useDebounce } from "hook/useDebounce";
import { useProjectModal } from '../../../util'
import { ModalForm } from "./ModalForm";
import { useLineRoadModal } from './util'

export const Road = () => {
  const [param, setParam] = useProjectsSearchParams()
  const { editId } = useProjectModal()
  const { open, startEdit } = useLineRoadModal()

  const { data, isLoading } = useInit(useDebounce({ ...param, lineId: editId }, 500))
  const { mutateAsync: Del } = useDel()

  const search = (item: any) => {
    setParam({ ...param, name: item.name, index: 1 })
  };

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

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  return (
    <Contianer>
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
            <Input placeholder={"区间"} value={param.name}
              onChange={(evt) => setParam({ ...param, name: evt.target.value })} />
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
        <Table columns={[
          {
            title: '区间',
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
            render: (item: any) => (<><Button type="link" onClick={() => startEdit(item.id)}>修改</Button><Popconfirm
              title={`是否要删除${item.name}`}
              onConfirm={() => confirm(item.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">删除</Button>
            </Popconfirm></>)
          },
        ]} pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
          onChange={handleTableChange}
          loading={isLoading}
          dataSource={data?.data}
          rowKey={(item: any) => item.id}
        />
        <ModalForm />
      </Main>
    </Contianer>
  )
}

const Contianer = styled.div`
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
`

const Main = styled.div`

`