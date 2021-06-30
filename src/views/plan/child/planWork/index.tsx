import { useState } from 'react';
import { Form, Input, Button, Table, Popconfirm, message } from 'antd';
import styled from "@emotion/styled";
import { ModalForm, ShareModalForm, ViewModalForm } from "./modal/ModalForm";
import { useAdd, useDel, useFeedBack, useInit, useMod, useSharePlan } from './planWork';

export const PlanWork = () => {
  const [visible, setVisible] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleView, setVisibleView] = useState(false);
  const [visibleShareBack, setVisibleShareBack] = useState(false)
  const [type, setType] = useState('')
  const [formData, setFormData] = useState<any>({})
  const [pagination, setPagination] = useState({
    index: 1,
    size: 10,
    name: ''
  })

  /* 增删改查 */

  const { data, isLoading } = useInit({ ...pagination })
  const { mutateAsync: Add } = useAdd()
  const { mutateAsync: Mod } = useMod()
  const { mutateAsync: Del } = useDel()
  const { mutateAsync: SharePlan } = useSharePlan()
  const { mutateAsync: FeedBack } = useFeedBack()


  const add = () => {
    showUserModal()
    setType('新增')
  }

  const share = (item: any) => {
    setVisibleShare(true)
    setType('发布计划')
    setFormData(item)
  }

  const shareBack = (item: any) => {
    setVisibleShareBack(true)
    setType('反馈')
    setFormData(item)
  }

  const view = (item: any) => {
    setVisibleView(true)
    setType('查看')
    setFormData(item)
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
    setPagination({ ...pagination, name: item.name, index: 1 })
  };

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const hideShareModal = () => {
    setVisibleShare(false)
  }

  const hideShareBackModal = () => {
    setVisibleShareBack(false)
  }

  const hideViewModal = () => {
    setVisibleView(false)
  }

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
              setVisible(false)
            }).catch(error => {
              message.error(error.msg)
            })
          }
          if (name === "修改") {
            Mod({ ...values, id: formData.id }).then(() => {
              message.success("修改成功")
              setVisible(false)
            }).catch(error => {
              message.error(error.msg)
            })
          }
          if (name === "发布计划") {
            SharePlan({ ...values, planId: formData.id }).then(() => {
              message.success("发布成功")
              hideShareModal()
            }).catch(error => {
              message.error(error.msg)
            })
          }
          if (name === "反馈") {
            FeedBack({ ...values, planId: formData.id }).then(() => {
              message.success("反馈成功")
              hideShareBackModal()
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
              label="计划名称"
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
                title: '计划名称',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '计划执行时间',
                dataIndex: 'beginTime',
                key: 'beginTime',
              },
              {
                title: '是否自动提醒',
                key: 'isWarn',
                render: (isWarn) => (<span>{isWarn === 0 ? '否' : '是'}</span>)
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
                    <Button type="link" onClick={() => share(item)}>发布计划</Button>
                    {/* <Button type="link" onClick={() => shareBack(item)}>反馈</Button> */}
                    <Button type="link" onClick={() => view(item)}>查看</Button>
                    <Button type="link" onClick={() => mod(item)}>修改</Button>
                    <Popconfirm
                      title={`是否要删除${item.name}`}
                      onConfirm={() => confirm(item)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type={"link"}>删除</Button>
                    </Popconfirm>
                  </>
                )
              },
            ]
          } pagination={{ total: data?.count, current: pagination.index, pageSize: pagination.size }}
            onChange={handleTableChange}
            dataSource={data?.data}
            loading={isLoading}
            rowKey={(item: any) => item.id}
          />
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal} />
        <ShareModalForm visible={visibleShare} formData={formData} type={type} onCancel={hideShareModal} />
        <ViewModalForm visible={visibleView} formData={formData} type={type} onCancel={hideViewModal} />
      </Form.Provider>
    </>
  );
}

const Header = styled.div`
  width: 100%;
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
