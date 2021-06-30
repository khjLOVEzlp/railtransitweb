import { useState } from 'react';
import { Form, Input, Button, Table, Popconfirm, message } from 'antd';
import styled from "@emotion/styled";
import { ModalForm } from "./modal/ModalForm";
import { useAdd, useDel, useInit, useMod } from './user';

export const User = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('')
  const [id, setId] = useState<any>()
  const [pagination, setPagination] = useState({
    index: 1,
    size: 10,
    name: ''
  })

  /* 
      增删改查
    */
  const { data, isLoading } = useInit({ ...pagination })
  const { mutateAsync: Add } = useAdd()
  const { mutateAsync: Mod } = useMod()
  const { mutateAsync: Del } = useDel()

  const add = () => {
    showUserModal()
    setType('新增')
    setId(undefined)
  }

  const mod = (item: any) => {
    showUserModal()
    setType('修改')
    setId(item.id)
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

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setPagination({ ...pagination, index: p.current, size: p.pageSize })
  };

  const search = (item: any) => {
    setPagination({ ...pagination, name: item.name, index: 1 })
  };

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  return (
    <>
      <Form.Provider
        onFormFinish={(name, { values }) => {
          if (name === '新增') {
            Add(values).then(() => {
              message.success('新增成功')
              setVisible(false);
            }).catch(err => {
              message.error(err.msg)
            })
          } else if (name === "修改") {
            Mod({ ...values, id }).then(() => {
              message.success('修改成功')
              setVisible(false);
            }).catch(err => {
              message.error(err.msg)
            })
          }
        }}
      >
        <Header>
          <Form
            name="basic"
            onFinish={search}
            layout={"inline"}
          >
            <Form.Item
              label="用户名"
              name="name"
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>

          <Button onClick={() => add()}>新增</Button>
        </Header>
        <Main>
          <Table
            columns={
              [
                {
                  title: '用户名',
                  dataIndex: 'name',
                  key: 'id',
                },
                {
                  title: '账号',
                  dataIndex: 'loginName',
                  key: 'id',
                },
                {
                  title: "归属部门",
                  dataIndex: 'departmentName',
                  key: 'id',
                },
                {
                  title: "登陆日期",
                  dataIndex: 'loginDate',
                  key: 'id',
                },
                {
                  title: "创建时间",
                  dataIndex: 'createTime',
                  key: 'id',
                },
                {
                  title: '备注',
                  dataIndex: 'remark',
                  key: 'remark',
                },
                {
                  title: '操作',
                  key: 'id',
                  render: (item: any) => <><Button type="link" onClick={() => mod(item)}>修改</Button>
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
            }
            pagination={{ total: data?.count, current: pagination.index, pageSize: pagination.size }}
            onChange={handleTableChange}
            dataSource={data?.data}
            loading={isLoading}
            rowKey={(item: any) => item.id}
          />
        </Main>
        <ModalForm visible={visible} id={id} type={type} onCancel={hideUserModal} />
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
