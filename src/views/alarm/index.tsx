import styled from "@emotion/styled"
import {Button, Select, Table} from "antd"
import React, {useEffect, useState} from "react"
import {useDocumentTitle, useMount} from "../../hook"
import {useHttp} from "../../utils/http"

const {Option} = Select;
export const Alarm = () => {
  const [navList, setNavList] = useState([])
  const [data, setData] = useState([])
  const [type, setType] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    type: ''
  })
  const client = useHttp()

  useEffect(() => {
    client(`alarm/list`, {
      method: "POST", body: JSON.stringify(pagination)
    }).then(res => {
      setData(res.data)
      setPagination({...pagination, totla: res.count})
    })
  }, [pagination.type, pagination.totla, pagination.page])
  useMount(() => {
    client(`alarm/statistic/list`, {
      method: "POST", body: JSON.stringify(pagination)
    }).then(res => {
      setNavList(res.data)
    })

    client(`dictItem/list?index=1&size=100&typeId=002`, {method: "POST"}).then(res => {
      setType(res.data)
    })
  })

  const onChange = (page: number) => {
    setPagination({...pagination, page})
  }

  const handleChange = (value: any) => {
    setPagination({...pagination, type: value})
  }

  const columns = [
    {
      title: '告警类型',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '设备编号',
      dataIndex: 'groupId',
      key: 'groupId'
    },
    {
      title: '绑定人',
      dataIndex: 'createBy',
      key: 'createBy',
    },
    {
      title: '告警时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '告警内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: () => <><Button type="link">删除</Button></>
    },
  ]

  useDocumentTitle('告警上报')

  return (
    <AlarmStyle>
      <Header>
        <Title>
          告警信息
        </Title>
        <Nav>
          {navList.map((item: any, index) => (<li key={index}>
            <img src={`../../icon/${item.title}.png`} alt=""/>
            <div>
              <div>{item.title}</div>
              <div style={{fontSize: '2rem', color: '#5A7FFA'}}>{item.num}</div>
            </div>
          </li>))}
        </Nav>
      </Header>
      <Main>
        <Select defaultValue="请选择" style={{width: 120, margin: '1rem 0'}} onChange={handleChange}>
          {
            type.map((item: any, index) => <Option value={item.item} key={index}>{item.value}</Option>)
          }
        </Select>
        <Button style={{marginLeft: '1rem'}} onClick={() => setPagination({...pagination, type: ''})}>重置</Button>
        <Table columns={columns} pagination={{total: pagination.totla, onChange: onChange}} dataSource={data}
               rowKey={(item: any) => item.id}/>
      </Main>
    </AlarmStyle>
  )
}

const AlarmStyle = styled.div`

`

const Header = styled.div`
  height: 23rem;
  background: #fff;
  border-radius: 1rem;
  margin-bottom: 1rem;
  padding: 0 3rem;
`

const Main = styled.div`
  background: #fff;
  height: 63rem;
  border-radius: 1rem;
  padding: 0 3rem;
  overflow: hidden;
  overflow-y: auto;
`

const Title = styled.div`
  padding-top: 2rem;
  font-size: 2rem;
  color: #3A3D44;
  margin-bottom: 4rem;
`

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  color: #989EAC;

  > li {
    display: flex;
    align-items: center;

    > div {
      margin-left: 1rem;
      text-align: center;
    }
  }
`
