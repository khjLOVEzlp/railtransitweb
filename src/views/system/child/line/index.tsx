import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Table, Popconfirm, message } from 'antd';
import styled from "@emotion/styled";
import { useHttp } from "../../../../utils/http";
import qs from "qs";
import { cleanObject } from "../../../../utils";
import { Drawermanage } from "./drawermanage/Drawermanage";
import { ModalForm } from "./modal/ModalForm";

export const Line = () => {
  const [visible, setVisible] = useState(false);
  const [isShowDrawer, setIsShowDrawer] = useState(false)
  const [tabList, setTabList] = useState([])
  const [type, setType] = useState('')
  const [formData, setFormData] = useState({})
  const client = useHttp()
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    name: ''
  })

  const [total, setTotal] = useState(0)

  const init = useCallback(() => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
    }
    client(`line/list?${qs.stringify(cleanObject(param))}`, { method: "POST" }).then(res => {
      setTabList(res.data)
      setTotal(res.count)
    })
  }, [client, pagination])

  useEffect(() => {
    init()
  }, [init])

  const search = (item: any) => {
    setPagination({ ...pagination, name: item.name })
  };

  const add = () => {
    showUserModal()
    setType('新增')
  }

  const manage = (item: any) => {
    setFormData(item)
    setIsShowDrawer(true)
  }

  const mod = (item: any) => {
    showUserModal()
    setType('修改')
    setFormData(item)
  }

  const del = async (id: number | string) => {
    client(`line/delete/${id}`).then(() => {
      init()
    })
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const onChange = (page: number) => {
    setPagination({ ...pagination, page })
  }

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
            client(`line/save`, { method: "POST", body: JSON.stringify(values) }).then(() => {
              message.success('新增成功')
              init()
              setVisible(false);
            }).catch(err => {
              console.log(err.msg, 'err')
            })
          } else if (name === "修改") {
            client(`line/update`, { method: "POST", body: JSON.stringify(values) }).then(() => {
              message.success('修改成功')
              setVisible(false);
            }).catch(err => {
              console.log(err.msg, 'err')
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
              label="地铁线路名称"
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
          <Table columns={
            [
              {
                title: '地铁线路名称',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
              },
              {
                title: '操作',
                key: 'id',
                render: (item: any) => <><Button type="link" onClick={() => manage(item)}>管理</Button><Button type="link"
                  onClick={() => mod(item)}>修改</Button>
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
          } pagination={{ total, onChange: onChange }} dataSource={tabList}
            rowKey={(item: any) => item.id} />
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal} />
        {isShowDrawer ? <Drawermanage formData={formData} isShowDrawer={isShowDrawer} setIsShowDrawer={setIsShowDrawer} /> : ''}
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