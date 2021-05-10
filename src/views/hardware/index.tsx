import styled from "@emotion/styled"
import { Button, Form, Input, Modal, Select, Table } from "antd"
import React, { useEffect, useState } from "react"
import { useMount } from "../../hook"
import { useHttp } from "../../utils/http"
import { Dialog } from './dialog/dialog'
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
export const Hardware = () => {
  const [isShow, setIsShow] = useState(false)
  const [title, setTitle] = useState('')
  const [data, setData] = useState([])
  const [loading, setloading] = useState(false)
  const [navList, setNavList] = useState([
    {
      name: "防分离设备",
      id: 1,
      tem: "SeperateController",
    },
    {
      name: "酒精测试仪设备",
      id: 2,
      tem: "AlcoholController",
    },
    {
      name: "流量卡设备",
      id: 3,
      tem: "SimCardController",
    },
    {
      name: "标签",
      id: 4,
      tem: "LabelController",
    },
    {
      name: "手持机设备",
      id: 5,
      tem: "PlatfromController",
    },
    {
      name: "工卡",
      id: 6,
      tem: "RfidCardController",
    },
    {
      name: "体温设备",
      id: 7,
      tem: "TemperaterController",
    },
  ])
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    type: ''
  })
  const client = useHttp()

  useEffect(() => {
    setloading(true)
    client(`person/list`, { method: "POST" }).then(res => {
      setData(res.data)
      setloading(false)
    })
  }, [pagination.type, pagination.totla, pagination.page])
  useMount(() => {
  })

  const onChange = (page: number) => {
    setPagination({ ...pagination, page })
  }

  const handleChange = (value: any) => {
    setPagination({ ...pagination, type: value })
  }

  const showModal = (title: string) => {
    setTitle(title)
  }

  const liEvent = (item: any, index: number) => {

  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (item: any) => {
        return item == '0' ? '男' : '女'
      }
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '身份证',
      dataIndex: 'identityCard',
      key: 'identityCard',
    },
    {
      title: '部门id',
      dataIndex: 'departmentId',
      key: 'departmentId',
    },
    {
      title: '出身日期',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: '卡号',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '体温状态',
      dataIndex: 'number',
      key: 'number',
      render: () => <><Button type="link" onClick={() => setIsShow(true)}>查看</Button></>
    },
    {
      title: '酒精状态',
      dataIndex: 'number',
      key: 'number',
      render: () => <><Button type="link">查看</Button></>
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
      render: () => <><Button type="link" onClick={() => showModal('修改')}>修改</Button><Button type="link">删除</Button></>
    },
  ]
  return (
    <AlarmStyle>
      <Header>
        {
          navList.map((item, index) => (<li key={index} onClick={() => liEvent(item, index)}>
            {item.name}
          </li>))
        }
      </Header>
      <Main>
        <Table columns={columns} pagination={{ total: pagination.totla, onChange: onChange }} dataSource={data} rowKey={(item: any) => item.id} />
      </Main>
      {isShow ? <Dialog isWidth="500" setIsShow={setIsShow} /> : ''}
    </AlarmStyle>
  )
}

const AlarmStyle = styled.div`

`

const Header = styled.div`
height: 13rem;
background: #fff;
margin-bottom: 1rem;
border-radius: 1rem;
display: flex;
align-items: center;
padding: 0 2rem;
> li {
  margin-right: 3rem;
  font-size: 2rem;
  cursor: pointer;
}
`

const Main = styled.div`
background: #fff;
border-radius: 1rem;
padding: 0 3rem;
overflow: hidden;
overflow-y: auto;
height: 73rem;
`

