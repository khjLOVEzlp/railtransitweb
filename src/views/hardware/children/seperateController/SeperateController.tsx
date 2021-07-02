import { useState } from 'react';
import { Form, Input, Button, Table, Popconfirm, message, Select } from 'antd';
import styled from "@emotion/styled";
import { useAdd, useDel, useInit, useMod, useProjectsSearchParams } from '../../../../utils/hardware/sep';
import { ModalForm } from './ModalForm'
import { useDebounce } from '../../../../hook/useDebounce';

/*const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};*/

export const SeperateController = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('')
  const [formData, setFormData] = useState<any>({})
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
  }

  const mod = (item: any) => {
    showUserModal()
    setType('修改')
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
        onFormFinish={(name, { values, forms }) => {
          if (name === '新增') {
            Add(values).then(() => {
              message.success('新增成功')
              setVisible(false);
            }).catch(err => {
              message.error(err.msg)
            })
          } else if (name === "修改") {
            Mod({ ...values, id: formData.id }).then(() => {
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
              name="name"
            >
              <Input placeholder={"设备编号"} value={param.name} onChange={(evt) => setParam({ ...param, name: evt.target.value })} />
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
                title: '设备编号',
                dataIndex: 'codeNumber',
                key: 'codeNumber',
              },
              {
                title: '使用人',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '在线状态',
                key: 'status',
                render: (item: any) => item.status === "0" ? '离线' : '在线'
              },
              {
                title: 'imei号',
                dataIndex: 'imei',
                key: 'imei',
              },
              {
                title: '是否使用',
                key: 'isUse',
                render: (item: any) => item.isUse === "0" ? '未使用' : '已使用'
              },
              {
                title: '操作',
                key: 'id',
                render: (item: any) => <><Button type="link" onClick={() => mod(item)}>修改</Button>
                  <Popconfirm
                    title={`是否要删除${item.codeNumber}`}
                    onConfirm={() => confirm(item)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type={"link"}>删除</Button>
                  </Popconfirm></>
              },
            ]
          } pagination={{ total: data?.count, current: param.index, pageSize: param.size, }} onChange={handleTableChange} loading={isLoading} dataSource={data?.data}
            rowKey={(item: any) => item.id} />
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal} />
      </Form.Provider>
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
`

const Main = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 0 1.5rem;
`