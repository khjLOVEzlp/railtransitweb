import { Button, Form, Input, message, Modal, Popconfirm, Table } from "antd";
import styled from "@emotion/styled";
import { useDel, useInit } from './request'
import { useProjectModal } from "../../../util";
import { ModalForm } from "./ModalForm";
import { useDebounce } from "hook/useDebounce";
import { useLineClassModal } from './util'
import { useState } from "react";
import { noData } from "utils/verification";
import { Footer } from "components/Styled";

export const Class = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    departmentName: ""
  })

  const { editId } = useProjectModal();
  const { open, startEdit } = useLineClassModal()

  const { data, isLoading } = useInit(useDebounce({ ...param, lineId: editId }, 500))
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel()

  const search = (item: any) => {
    setParam({ ...param, departmentName: item.departmentName, index: 1, size: 10 })
  };

  const confirm = (id: number) => {
    Del(id).then((res) => {
      if (res.code !== 200) {
        message.error(res.msg)
      } else {
        message.success('删除成功')
        setParam({ ...param, index: 1 })
        selectedRowKeys([])
      }
    })
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])

  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (keys: any, value: any) => {
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const start = () => {
    const ids = selectedRowKeys.join(",")
    Modal.confirm({
      title: `是否要删除${selectedRowKeys.length}条数据`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        confirm(ids);
        setSelectedRowKeys([])
      },
    });
  }

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
            name="departmentName"
          >
            <Input placeholder={"班别名称"} value={param.departmentName}
              onChange={(evt) => setParam({ ...param, departmentName: evt.target.value })} />
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
            title: "班别名称",
            dataIndex: "departmentName",
            key: "departmentName"
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
              title={`是否要删除${item.departmentName}`}
              onConfirm={() => confirm(item.id)}
              onCancel={cancel}
              okText="是"
              cancelText="否"
            >
              <Button type="link">删除</Button>
            </Popconfirm></>)
          },
        ]} pagination={{ total: data?.count, current: param.index, pageSize: param.size }} onChange={handleTableChange}
          loading={isLoading} dataSource={data?.data}
          rowKey={(item: any) => item.id}
          locale={noData}
          rowSelection={rowSelection}
        />
        <ModalForm param={param} setParam={setParam} />
      </Main>
      {
        hasSelected ? <Footer>
          <div>{hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}</div>
          <Button type="primary" onClick={start} loading={mutaLoading}>
            {hasSelected ? `批量删除` : ''}
          </Button>
        </Footer> : undefined
      }
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
margin-bottom: 5rem;
`