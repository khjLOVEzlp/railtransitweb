import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Table, Popconfirm, message} from 'antd';
import styled from "@emotion/styled";
import {useHttp} from "../../../../utils/http";
import qs from "qs";
import {cleanObject} from "../../../../utils";
import {ModalForm} from "./modal/ModalForm";

export const WorkManage = () => {
  const [visible, setVisible] = useState(false);
  const [tabList, setTabList] = useState([])
  const [type, setType] = useState('')
  const [formData, setFormData] = useState({})
  const client = useHttp()
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    name: ''
  })

  useEffect(() => {
    init()
  }, [pagination.page, pagination.name])

  const init = () => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
    }
    client(`planWork/list?${qs.stringify(cleanObject(param))}`, {method: "POST"}).then(res => {
      setTabList(res.data)
      setPagination({...pagination, total: res.count})
    })
  }


  const add = () => {
    showUserModal()
    setType('新增')
  }

  const mod = (item: any) => {
    showUserModal()
    setType('修改')
    setFormData(item)
  }

  const del = async (id: number | string) => {
    client(`planWork/delete/${id}`).then(() => {
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
    setPagination({...pagination, page})
  }

  const search = (item: any) => {
    setPagination({...pagination, name: item.name})
  };

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const save = (value: any) => {
    client(`planWork/save`, {method: "POST", body: JSON.stringify(value)}).then(() => {
      message.success('新增成功')
      setVisible(false);
    }).catch(err => {
      console.log(err.msg, 'err')
    })
  }

  const update = (value: any) => {
    client(`planWork/update`, {method: "POST", body: JSON.stringify(value)}).then(() => {
      message.success('修改成功')
      setVisible(false);
    }).catch(err => {
      console.log(err.msg, 'err')
    })
  }

  return (
    <>
      <Form.Provider
        onFormFinish={(name, {values, forms}) => {
          console.log(values)
          if (name === '新增') {
            save(values)
          }
          if (name === "修改") {
            update(values)
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
              label="作业名"
              name="name"
            >
              <Input/>
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
                render: (isWarn) => (<span>{isWarn == 0 ? '否' : '是'}</span>)
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
                    <Button type="link" onClick={() => mod(item)}>修改</Button>
                    <Popconfirm
                      title={`是否要删除${item.name}`}
                      onConfirm={() => confirm(item)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="#">删除</a>
                    </Popconfirm>
                  </>
                )
              },
            ]
          } pagination={{total: pagination.total, onChange: onChange}}
                 dataSource={tabList}
                 rowKey={(item: any) => item.id}
          />
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal}/>
      </Form.Provider>
    </>
  );
}

const Header = styled.div`
  height: 13rem;
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