import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Table, Popconfirm, message} from 'antd';
import styled from "@emotion/styled";
import {useHttp} from "../../../../utils/http";
import qs from "qs";
import {cleanObject} from "../../../../utils";
import {ModalForm, ShareModalForm, ShareBackModalForm} from "./modal/ModalForm";

export const PlanWork = () => {
  const [visible, setVisible] = useState(false);
  const [visibleShare, setVIsibleShare] = useState(false);
  const [visibleShareBack, setVisibleShareBack] = useState(false)
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
    client(`plan/list?${qs.stringify(cleanObject(param))}`, {method: "POST"}).then(res => {
      setTabList(res.data)
      setPagination({...pagination, total: res.count})
    })
  }


  const add = () => {
    showUserModal()
    setType('新增')
  }

  const share = (item: any) => {
    setVIsibleShare(true)
    setType('发布计划')
    setFormData(item)
  }

  const shareBack = (item: any) => {
    setVisibleShareBack(true)
    setType('查看反馈')
    setFormData(item)
  }

  const mod = (item: any) => {
    showUserModal()
    setType('修改')
    setFormData(item)
  }

  const del = async (id: number | string) => {
    client(`plan/delete/${id}`).then(() => {
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

  const hideShareModal = () => {
    setVIsibleShare(false)
  }

  const hideShareBackModal = () => {
    setVisibleShareBack(false)
  }

  const save = (value: any) => {
    client(`plan/save`, {method: "POST", body: JSON.stringify(value)}).then(() => {
      message.success('新增成功')
      setVisible(false);
    }).catch(err => {
      console.log(err.msg, 'err')
    })
  }

  const update = (value: any) => {
    client(`plan/update`, {method: "POST", body: JSON.stringify(value)}).then(() => {
      message.success('修改成功')
      setVisible(false);
    }).catch(err => {
      console.log(err.msg, 'err')
    })
  }

  const sharePlan = (value: any) => {
    client(`plan/share`, {method: "POST", body: JSON.stringify((value))}).then(() => {
      message.success("发布成功")
    }).catch(err => {
      console.log(err)
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
          if (name === "发布计划") {
            sharePlan(values)
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
                    <Button type="link" onClick={() => share(item)}>发布计划</Button>
                    <Button type="link" onClick={() => shareBack(item)}>查看反馈</Button>
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
        <ShareModalForm visible={visibleShare} formData={formData} type={type} onCancel={hideShareModal}/>
        <ShareBackModalForm visible={visibleShareBack} formData={formData} type={type} onCancel={hideShareBackModal}/>
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
