import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Table, message } from 'antd';
import styled from "@emotion/styled";
import { useHttp } from "../../../../utils/http";
import qs from "qs";
import { cleanObject } from "../../../../utils";
import { ModalForm } from "./modal/ModalForm";

export const Temperature = () => {
  const [visible, setVisible] = useState(false);
  const [tabList, setTabList] = useState([])
  const [type, setType] = useState('')
  const [formData] = useState({})
  const client = useHttp()
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    name: '',
    number: ""
  })
  const [total, setTotal] = useState(0)
  const init = useCallback(() => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
      number: pagination.number
    }
    client(`record/list?${qs.stringify(cleanObject(param))}`, { method: "POST" }).then(res => {
      setTabList(res.data)
      setTotal(res.count)
    })
  }, [client, pagination])

  useEffect(() => {
    init()
  }, [init])


  const add = () => {
    showUserModal()
    setType('新增')
  }

  /*const mod = (item: any) => {
    showUserModal()
    setType('修改')
    setFormData(item)
  }*/

  /*const del = async (id: number | string) => {
    client(`user/delete/${id}`).then(() => {
      init()
    })
  }*/

  /*const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }*/

  const onChange = (page: number) => {
    setPagination({ ...pagination, page })
  }

  const search = (item: any) => {
    setPagination({ ...pagination, name: item.name, number: item.number, page: 1 })
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
        onFormFinish={(name, { values, forms }) => {
          if (name === '新增') {
            client(`record/save`, { method: "POST", body: JSON.stringify(values) }).then(() => {
              message.success('新增成功')
              setVisible(false);
              init()
            }).catch(err => {
              console.log(err.msg, 'err')
            })
          } else if (name === "修改") {
            client(`user/update`, { method: "POST", body: JSON.stringify(values) }).then(() => {
              message.success('修改成功')
              setVisible(false);
              init()
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
              label="姓名"
              name="name"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="编号"
              name="number"
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
                title: '员工卡号',
                dataIndex: 'number',
                key: 'number',
              },
              {
                title: '时间',
                dataIndex: 'measureTime',
                key: 'measureTime'
              },
              {
                title: '测量温度',
                dataIndex: 'temperature',
                key: 'temperature',
              },
              {
                title: '类型',
                key: 'type',
                render: (type: string | number) => <>{type === 1 ? "上岗" : "离岗"}</>
              },
              /*{
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
              },*/
            ]
          } pagination={{ total, onChange: onChange }} dataSource={tabList}
            rowKey={(item: any) => item.id} />
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal} />
      </Form.Provider>
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