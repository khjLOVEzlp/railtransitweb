import { Form, Input, Button, Table, message, Tag, Dropdown, Menu, Modal } from 'antd';
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
import { Search } from 'utils/typings';
import { useState } from 'react';
import { noData } from 'utils/verification';
import { Header, Main } from 'components/Styled';

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
        return <Tag color="default">未执行</Tag>
      case 1:
        return <Tag color="processing" >执行中</Tag>

      case 2:
        return <Tag color="success">已完成</Tag>

      default:
        break;
    }
  }

  /*是否自动执行*/
  const isWarn = (type: number) => {
    switch (type) {
      case 0:
        return <Tag color="error">否</Tag>
      case 1:
        return <Tag color="success" >是</Tag>

      default:
        break;
    }
  }

  const confirmDeleteProject = (item: any) => {
    Modal.confirm({
      title: `是否要删除${item.name}`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        confirm(item.id);
      },
    });
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
              ellipsis: true
            },
            {
              title: "负责人",
              dataIndex: 'leaderName',
              key: 'leaderName',
              ellipsis: true
            },
            {
              title: '开始时间',
              dataIndex: 'beginTime',
              key: 'beginTime',
              ellipsis: true
            },
            {
              title: '结束时间',
              dataIndex: 'endTime',
              key: 'endTime',
              ellipsis: true
            },
            {
              title: '线路',
              dataIndex: 'lineName',
              key: 'lineName',
              ellipsis: true
            },
            {
              title: '请站点',
              dataIndex: 'pinName',
              key: 'pinName',
              ellipsis: true
            },
            {
              title: '销站点',
              dataIndex: 'pleaseName',
              key: 'pleaseName',
              ellipsis: true
            },
            {
              title: '状态',
              render: (item) => (<span>{isStatus(item.status)}</span>),
              key: 'status',
              ellipsis: true
            },
            {
              title: '是否自动提醒',
              key: 'isWarn',
              render: (item) => (<span>{isWarn(item.isWarn)}</span>),
              ellipsis: true
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
              ellipsis: true
            },
            {
              title: '操作',
              key: 'id',
              align: "center",
              ellipsis: true,
              render: (item) => (
                <>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item onClick={() => startShareEdit(item.id)} key={"shareEdit"}>
                          发布计划
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => startEdit(item.id)}
                          key={"edit"}
                        >
                          修改
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => confirmDeleteProject(item)}
                          key={"delete"}
                        >
                          删除
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button style={{ padding: 0 }} type={"link"}>...</Button>
                  </Dropdown>
                </>
              )
            },
          ]
        } pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
          onChange={handleTableChange}
          dataSource={data?.data}
          loading={isLoading}
          rowKey={(item) => item.id}
          locale={noData}
        />
      </Main>
      <ModalForm param={param} setParam={setParam} />
      <ShareModalForm />
    </ >
  );
}

