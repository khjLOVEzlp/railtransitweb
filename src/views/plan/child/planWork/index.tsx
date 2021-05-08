
import styled from "@emotion/styled"
import { Button, Form, Input, Table, Modal } from "antd";
import React, { useState } from "react";
import { useMount } from "../../../../hook";
import { useHttp } from "../../../../utils/http";

export const PlanWork = () => {
  const [loading, setloading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const showModal = (title: string) => {
    setTitle(title)
    setVisible(true)
  }

  const handleOk = () => {
  }

  const handleCancel = () => {
    setVisible(false)
  }
  const client = useHttp()
  useMount(() => {
    client(`plan/getAll`, { method: "POST" }).then(res => {
      setData(res.data)

    })
  })
  const columns = [
    {
      title: '计划名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '计划执行时间',
      dataIndex: 'beginTime',
      key: 'name',
    },
    {
      title: '是否自动转为计划',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '提醒',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: () => <><Button type="link" onClick={() => showModal('发布计划')}>发布计划</Button><Button type="link" onClick={() => showModal('修改')}>修改</Button><Button type="link">删除</Button></>
    },
  ]

  const [data, setData] = useState([])

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <Header>
        <Form
          name="basic"
          onFinish={onFinish}
          layout={"inline"}
        >
          <Form.Item
            label="计划名称"
            name="username"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
        </Button>
          </Form.Item>
        </Form>

        <Button onClick={() => showModal('新增')}>新增</Button>
      </Header>
      <Main>
        <Table columns={columns} dataSource={data} rowKey={(item: any) => item.id} />
      </Main>

      <Modal
        visible={visible}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
            </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            提交
            </Button>,
        ]}
      >
        <Form
          labelAlign="right"
          {...layout}
        >
          <Form.Item
            label="开始时间"
            name="beginTime"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作业日期"
            name="dateTime"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作业单位"
            name="departmentId"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="文档id集合"
            name="documentList"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="结束时间"
            name="endTime"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="是否自动提醒"
            name="isWarn"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="施工负责人职责"
            name="leaderDuty"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="施工负责人"
            name="leaderPerson"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="线路id"
            name="lineId"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="物料列表id集合"
            name="materialList"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="计划名称"
            name="name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="计划令号"
            name="num"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作业人员id列"
            name="personList"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="销站点"
            name="pinStand"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="请站点"
            name="pleaseStand"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="防疫专员职责"
            name="preventionDuty"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="防疫专员"
            name="preventionPerson"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="备注"
            name="remark"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="安全员职责"
            name="safeDuty"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="安全员"
            name="safePerson"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="工具列表id集合"
            name="toolList"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作业类型"
            name="type"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="提醒时间"
            name="warnTime"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作业区间"
            name="workAddr"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作业计划工作量"
            name="workContent"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作业人数"
            name="workPerson"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
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
`