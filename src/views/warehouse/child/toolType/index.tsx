import { useState } from 'react';
import { Form, Input, Button, Table, Popconfirm, message, Select, Drawer } from 'antd';
import styled from "@emotion/styled";
import { useAdd, useDel, useInit, useMod } from './warehouse';
import { ModalForm } from './modal/ModalForm';
import { Tool } from './tool';
const { Option } = Select;

export const ToolType = () => {
  const [visible, setVisible] = useState(false);
  const [toolVisible, setToolVisible] = useState(false);
  const [type, setType] = useState('')
  const [formData, setFormData] = useState<any>({})
  const [pagination, setPagination] = useState({
    index: 1,
    size: 10,
    type: '',
    name: '',
  })

  /* 
    增删改查
  */
  const { data, isLoading } = useInit({ ...pagination })
  const { mutateAsync: Add } = useAdd()
  const { mutateAsync: Mod } = useMod()
  const { mutateAsync: Del } = useDel()

  const search = (item: any) => {
    setPagination({ ...pagination, name: item.name, type: item.type, index: 1 })
  };

  const add = () => {
    showUserModal()
    setType('新增')
  }

  const mod = (item: any) => {
    showUserModal()
    setType('修改')
    setFormData(item)
  }

  const viewTool = (item: any) => {
    setToolVisible(true)
    setType('工具')
    setFormData(item)
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
    setPagination({ ...pagination, type: value })
  }

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const onClose = () => {
    setToolVisible(false)
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setPagination({ ...pagination, index: p.current, size: p.pageSize })
  };

  return (
    <>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === '新增') {
            Add(values).then(() => {
              message.success("新增成功")
              setVisible(false);
            }).catch((error) => {
              message.error(error.msg)
            })
          } else if (name === "修改") {
            Mod({ ...values, id: formData.id }).then(() => {
              message.success("修改成功")
              setVisible(false)
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
              label="仓库名称"
              name="name"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="类型"
              name="type"
              initialValue={1}
            >
              <Select style={{ width: 120 }} onChange={handleChange}>
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

          <Button onClick={() => add()}>新增</Button>
        </Header>
        <Main>
          <Table columns={
            [
              {
                title: '仓库名',
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
                  <Button type="link" onClick={() => mod(item)}>修改</Button>
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
          } pagination={{ total: data?.count, current: pagination.index, pageSize: pagination.size }} onChange={handleTableChange} loading={isLoading} dataSource={data?.data}
            rowKey={(item: any) => item.id} />
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal} />
        <Tool visible={toolVisible} onClose={onClose} formData={formData} />
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