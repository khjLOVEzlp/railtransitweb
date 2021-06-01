import React, {useState, useEffect, useCallback} from 'react';
import {Form, Input, Button, Table} from 'antd';
import styled from "@emotion/styled";
import {useHttp} from "../../../../utils/http";
import qs from "qs";
import {cleanObject} from "../../../../utils";
import {ModalForm} from "./modal/ModalForm";

export const WorkManage = () => {
  const [visible, setVisible] = useState(false);
  const [tabList, setTabList] = useState([])
  const [formData, setFormData] = useState({})
  const client = useHttp()
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    name: ''
  })

  // 分页查询
  const init = useCallback(() => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
    }
    client(`planWork/historyList?${qs.stringify(cleanObject(param))}`, {method: "POST"}).then(res => {
      setTabList(res.data)
      setPagination({...pagination, total: res.count})
    })
  }, [client, pagination.page, pagination.name])

  useEffect(() => {
    init()
  }, [init])

  const mod = (item: any) => {
    showUserModal()
    setFormData(item)
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

  return (
    <>
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

          <Button onClick={() => mod("123")}>新增</Button>
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
                    <Button type={"link"} onClick={() => mod(item)}>查看</Button>
                  </>
                )
              },
            ]
          } pagination={{total: pagination.total, onChange: onChange}}
                 dataSource={tabList}
                 rowKey={(item: any) => item.id}
          />
        </Main>
        <ModalForm visible={visible} formData={formData} onCancel={hideUserModal}/>
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
