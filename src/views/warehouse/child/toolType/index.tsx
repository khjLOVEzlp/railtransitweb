import {useState} from 'react';
import {Form, Input, Button, Table, Popconfirm, message, Select} from 'antd';
import styled from "@emotion/styled";
import {useDel, useInit, useProjectsSearchParams} from 'utils/warehouse/toolType';
import {ModalForm} from './modal/ModalForm';
import {Tool} from './tool';
import {useDebounce} from "hook/useDebounce";
import {useToolTypeModal} from './util'

const {Option} = Select;

export const ToolType = () => {
  const [toolVisible, setToolVisible] = useState(false);
  const [param, setParam] = useProjectsSearchParams()
  const {open, startEdit} = useToolTypeModal()

  const {data, isLoading} = useInit(useDebounce(param, 500))
  const {mutateAsync: Del} = useDel()

  const search = (item: any) => {
    setParam({...param, name: item.name, type: item.type, index: 1})
  };

  const viewTool = (item: any) => {
    setToolVisible(true)
  }

  const del = async (id: number) => {
    Del(id)
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const handleChange = (value: any) => {
    setParam({...param, type: value})
  }

  const onClose = () => {
    setToolVisible(false)
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
            <Input placeholder={"仓库名称"} value={param.name}
                   onChange={(evt) => setParam({...param, name: evt.target.value})}/>
          </Form.Item>

          <Form.Item
            label="类型"
            name="type"
            initialValue={1}
          >
            <Select style={{width: 120}} onChange={handleChange}>
              <Option value={1}>轨行区内</Option>
              <Option value={2}>轨行区外</Option>
            </Select>
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
              title: '仓库名称',
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
              title: "负责人",
              dataIndex: "personName",
              key: "id"
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
            },
            {
              title: '操作',
              key: 'id',
              render: (item: any) => <>
                <Button type="link" onClick={() => viewTool(item)}>查看工具</Button>
                <Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                <Popconfirm
                  title={`是否要删除${item.name}`}
                  onConfirm={() => confirm(item)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link">删除</Button>
                </Popconfirm></>
            },
          ]
        } pagination={{total: data?.count, current: param.index, pageSize: param.size}}
               onChange={handleTableChange}
               loading={isLoading} dataSource={data?.data}
               rowKey={(item: any) => item.id}
        />
      </Main>
      <ModalForm/>
      {/*<Tool visible={toolVisible} onClose={onClose}/>*/}
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