import { useState } from 'react';
import { Form, Input, Button, Table, Popconfirm, message } from 'antd';
import styled from "@emotion/styled";
import { Drawermanage } from "./drawermanage/Drawermanage";
import { ModalForm } from "./modal/ModalForm";
import { useMod, useAdd, useDel, useInit, useProjectsSearchParams } from '../../../../utils/system/line'
import { useDebounce } from '../../../../hook/useDebounce';
export const Line = () => {
  const [visible, setVisible] = useState(false);
  const [isShowDrawer, setIsShowDrawer] = useState(false)
  const [type, setType] = useState('')
  const [id, setId] = useState<number>()

  const [param, setParam] = useProjectsSearchParams()

  /* 
    增删改查
    */

  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Add } = useAdd()
  const { mutateAsync: Mod } = useMod()
  const { mutateAsync: Del } = useDel()

  const search = (item: any) => {
    setParam({ ...param, name: item.name, index: 1 })
  };

  const add = () => {
    showUserModal()
    setType('新增')
    setId(undefined)
  }

  const manage = (id: number | undefined) => {
    setParam({ name: "" })
    setId(id)
    setIsShowDrawer(true)
  }

  const mod = (id: number) => {
    setType('修改')
    setId(id)
    showUserModal()
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

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  return (
    <>
      <Form.Provider
        onFormFinish={(name, { values }) => {
          if (name === '新增') {
            Add(values).then(() => {
              message.success("新增成功")
              setVisible(false);
            }).catch((error) => {
              message.error(error.msg)
            })
          } else if (name === "修改") {
            Mod({ ...values, id }).then(() => {
              message.success("修改成功")
              setVisible(false);
            }).catch((error) => {
              message.error(error.msg)
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
              label=""
              name="name"
            >
              <Input placeholder={"地铁线路名称"} value={param.name} onChange={(evt) => setParam({ ...param, name: evt.target.value })} />
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
          <Table columns={
            [
              {
                title: '地铁线路名称',
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
                sorter: (a, b) => a.createTime - b.createTime,
              },
              {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
              },
              {
                title: '操作',
                key: 'id',
                render: (item: any) => <><Button type="link" onClick={() => manage(item.id)}>管理</Button><Button type="link"
                  onClick={() => mod(item.id)}>修改</Button>
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
          } pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
            onChange={handleTableChange}
            dataSource={data?.data}
            loading={isLoading}
            rowKey={(item: any) => item.id} />
        </Main>
        <ModalForm visible={visible} id={id} type={type} onCancel={hideUserModal} />
        {isShowDrawer ? <Drawermanage id={id} isShowDrawer={isShowDrawer} setIsShowDrawer={setIsShowDrawer} /> : ''}
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