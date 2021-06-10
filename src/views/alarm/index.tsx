import styled from "@emotion/styled"
import { Button, Select, Table } from "antd"
import { useState } from "react"
import { useDocumentTitle } from '../../hook/useDocumentTitle'
import { useInit, useStatistic, useType } from "./alarm"
// import {useLocation} from "react-router";

const { Option } = Select;

export const Alarm = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    type: '',
    name: ''
  })

  const { data: navList } = useStatistic({ ...pagination, index: pagination.page })
  const { data: dataList, isLoading } = useInit({ ...pagination, index: pagination.page })
  const { data: type } = useType()

  const filter = (title: string) => {
    setPagination({ ...pagination, name: title })
  }

  // 重置
  const reset = () => {
    setPagination({ ...pagination, type: '', name: '' })
  }

  const onChange = (page: number) => {
    setPagination({ ...pagination, page })
  }

  const handleChange = (value: any) => {
    setPagination({ ...pagination, type: value })
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
  ]

  useDocumentTitle('告警上报')

  return (
    <AlarmStyle>
      <Header>
        <Title>
          告警信息
        </Title>
        <Nav>
          {navList?.data.map((item: any) => (<li key={item.id}>
            <img onClick={() => filter(item.title)} src={`../../icon/${item.title}.png`} alt="" />
            <div>
              <div>{item.title}</div>
              <div style={{ fontSize: '2rem', color: '#5A7FFA' }}>{item.num}</div>
            </div>
          </li>))}
        </Nav>
      </Header>
      <Main>
        <Select defaultValue="请选择" style={{ width: 120, margin: '1rem 0' }} onChange={handleChange}>
          {
            type?.data.map((item: any) => <Option value={item.item} key={item.id}>{item.value}</Option>)
          }
        </Select>
        <Button style={{ marginLeft: '1rem' }}
          onClick={() => reset()}>重置</Button>
        <Table columns={columns} pagination={{ total: dataList?.count, onChange: onChange }} loading={isLoading} dataSource={dataList?.data}
          rowKey={(item: any) => item.id} />
      </Main>
    </AlarmStyle>
  )
}

const AlarmStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const Header = styled.div`
  height: 22.5rem;
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

    > img {
      cursor: pointer;
    }

    > div {
      margin-left: 1rem;
      text-align: center;
    }
  }
`
