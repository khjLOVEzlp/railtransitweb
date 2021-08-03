import { Form, Input, Button, Table, Popconfirm, message } from 'antd';
import styled from "@emotion/styled";
/*
* 新增修改弹框
* */
import { ModalForm } from "./modal/ModalForm";
/*
* 接口请求
* */
import { useDel, useInit } from './request';
/*计划发布弹框*/
import { ShareModalForm } from './modal/ShareModalForm';
import { useDebounce } from "hook/useDebounce";
import { usePlanWorkModal, useShareModal } from './util'
import { useProjectsSearchParams } from 'hook/useProjectsSearchParams'
import { Search } from 'utils/typings';
import { useState } from 'react';

/*作业计划*/
export const PlanWork = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: ""
  })
  
  const { open, startEdit } = usePlanWorkModal()
  const { startEdit: startShareEdit } = useShareModal()
  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Del } = useDel()
  // const { mutateAsync: SharePlan } = useSharePlan()

  /*删除*/
  const confirm = (id: number) => {
    Del(id).then((res) => {
      if (res.code !== 200) {
        message.error(res.msg)
      } else {
        message.success('删除成功')
        setParam({ ...param, index: 1 })
      }
    })
  }

  const cancel = () => {
    message.error('取消删除');
  }

  /*搜索*/
  const search = (item: Search) => {
    setParam({ ...param, name: item.name, index: 1 })
  };

  /*分页*/
  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  /*计划执行状态*/
  const isStatus = (type: number) => {
    switch (type) {
      case 0:
        return "未执行"
      case 1:
        return "执行中"

      case 2:
        return "已完成"

      default:
        break;
    }
  }

  return (
    <>
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
            <Input placeholder={"计划名称"} value={param.name}
              onChange={(evt) => setParam({ ...param, name: evt.target.value })} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>

        <Button onClick={open}>新增</Button>
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
              title: "负责人",
              dataIndex: 'leaderName',
              key: 'leaderName',
            },
            {
              title: '开始时间',
              dataIndex: 'beginTime',
              key: 'beginTime',
            },
            {
              title: '结束时间',
              dataIndex: 'endTime',
              key: 'endTime',
            },
            {
              title: '线路',
              dataIndex: 'lineName',
              key: 'lineName',
            },
            {
              title: '请站点',
              dataIndex: 'pinName',
              key: 'pinName',
            },
            {
              title: '销站点',
              dataIndex: 'pleaseName',
              key: 'pleaseName',
            },
            {
              title: '状态',
              render: (item) => (<span>{isStatus(item.status)}</span>),
              key: 'status',
            },
            {
              title: '是否自动提醒',
              key: 'isWarn',
              render: (item) => (<span>{item.isWarn === 0 ? '否' : '是'}</span>)
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
              render: (item) => (
                <>
                  <Button type="link" onClick={() => startShareEdit(item.id)}>发布计划</Button>
                  {/*<Button type="link" onClick={() => view(item)}>查看</Button>*/}
                  <Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                  <Popconfirm
                    title={`是否要删除${item.name}`}
                    onConfirm={() => confirm(item.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    {
                      item.status === 2 ? <Button disabled type={"link"}>删除</Button> : <Button type={"link"}>删除</Button>
                    }
                  </Popconfirm>
                </>
              )
            },
          ]
        } pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
          onChange={handleTableChange}
          dataSource={data?.data}
          loading={isLoading}
          rowKey={(item) => item.id}
        />
      </Main>
      <ModalForm />
      <ShareModalForm />
      {/*<ViewModalForm visible={visibleView} formData={formData} types={types} onCancel={hideViewModal} />*/}
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
