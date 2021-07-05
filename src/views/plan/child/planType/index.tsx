import {useState} from 'react';
import {Form, Input, Button, Table, Popconfirm, message} from 'antd';
import styled from "@emotion/styled";
import {ModalForm} from "./modal/ModalForm";
import {useAdd, useDel, useInit, useMod, useProjectsSearchParams} from '../../../../utils/plan/planType';
import {useDebounce} from "../../../../hook/useDebounce";

export const PlanType = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('')
  const [formData, setFormData] = useState<any>({})
  const [param, setParam] = useProjectsSearchParams()

  /* 增删改查 */

  const {data, isLoading} = useInit(useDebounce(param, 500))
  const {mutateAsync: Add} = useAdd()
  const {mutateAsync: Mod} = useMod()
  const {mutateAsync: Del} = useDel()


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

  const search = (item: any) => {
    setParam({...param, type: item.type, index: 1})
  };

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
  };

  return (
    <>
      <Form.Provider
        onFormFinish={(name, {values, forms}) => {
          if (name === '新增') {
            Add(values).then(() => {
              message.success('新增成功')
              setVisible(false);
            }).catch(error => {
              message.error(error.msg)
            })
          }
          if (name === "修改") {
            Mod({...values, id: formData.id}).then(() => {
              message.success('修改成功')
              setVisible(false);
            }).catch(error => {
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
              name="type"
            >
              <Input placeholder={"作业类型"} value={param.type}
                     onChange={(evt) => setParam({...param, type: evt.target.value})}/>
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
                title: '作业类型',
                dataIndex: 'type',
                key: 'type',
              },
              {
                title: '时间',
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
                align: "center",
                render: (item: any) => (
                  <>
                    <Button type="link" onClick={() => mod(item)}>修改</Button>
                    <Popconfirm
                      title={`是否要删除${item.type}`}
                      onConfirm={() => confirm(item)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link">删除</Button>
                    </Popconfirm>
                  </>
                )
              },
            ]
          } pagination={{total: data?.count, current: param.index, pageSize: param.size}}
                 onChange={handleTableChange}
                 dataSource={data?.data}
                 loading={isLoading}
                 rowKey={(item: any) => item.id}
          />
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal}/>
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
