import styled from "@emotion/styled"
import { Select, Table } from "antd"
import { useState } from "react"
import { useDocumentTitle } from '../../hook/useDocumentTitle'
import { useInit, useWarnCount } from "../../utils/alarm"
// import {useLocation} from "react-router";

const { Option } = Select;

export const Alarm = () => {
  const [pagination, setPagination] = useState({
    index: 1,
    size: 10,
    state: "0",
    time: "1"
  })

  const [time, setTime] = useState("1")

  const { data: navList } = useWarnCount(time)
  const { data: dataList, isLoading } = useInit({ ...pagination })

  const navChange = (value: string) => {
    setTime(value)
  }

  const stateChange = (value: string) => {
    setPagination({ ...pagination, state: value })
  }

  const timeChange = (value: string) => {
    setPagination({ ...pagination, time: value })
  }

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setPagination({ ...pagination, index: p.current, size: p.pageSize })
  };

  const columns = [
    {
      title: '作业名称',
      dataIndex: 'workName',
      key: 'workName',
    },
    {
      title: '告警类型',
      key: 'type',
      render: (item: any) => <>{getType(item.type)}</>
    },
    {
      title: '工具名称',
      dataIndex: 'toolName',
      key: 'toolName',
    },
    {
      title: '小组名称',
      dataIndex: 'groupName',
      key: 'groupName',
    },
    {
      title: '创建时间',
      dataIndex: 'warnTime',
      key: 'warnTime',
    },
    {
      title: '解除时间',
      dataIndex: 'relieveTime',
      key: 'relieveTime',
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

  const stateList = [
    {
      name: "查所有",
      value: "0"
    },
    {
      name: "防遗忘",
      value: "1"
    },
    {
      name: "防漏带",
      value: "2"
    },
    {
      name: "防漏点",
      value: "3"
    },
    {
      name: "防遗漏",
      value: "4"
    },
    {
      name: "防疫请",
      value: "5"
    },
    {
      name: "防酒精",
      value: "6"
    },
    {
      name: "分离告警",
      value: "7"
    },
    {
      name: "离线告警",
      value: "8"
    },
    {
      name: "过时告警",
      value: "9"
    },
    {
      name: "低电告警",
      value: "10"
    },
    {
      name: "防血压",
      value: "11"
    },
    {
      name: "防遗留",
      value: "12"
    },
  ]

  const timeList = [
    {
      name: "一周",
      value: "1"
    },
    {
      name: "半月",
      value: "2"
    },
    {
      name: "一个月",
      value: "3"
    },
    {
      name: "三个月",
      value: "4"
    },
    {
      name: "半年",
      value: "5"
    },
    {
      name: "一年",
      value: "6"
    },
  ]

  const getType = (type: number) => {
    switch (type) {
      case 1:
        return "防遗忘"
      case 2:
        return "防漏带"

      case 3:
        return "防漏点"

      case 4:
        return "防遗漏"

      case 5:
        return "防疫情"

      case 6:
        return "防酒精"

      case 7:
        return "分离告警"

      case 8:
        return "离线告警"

      case 9:
        return "过时告警"

      case 10:
        return "低电告警"

      case 11:
        return "防血压"

      case 12:
        return "防遗留"

      default:
        break;
    }
  }

  useDocumentTitle('告警上报')

  return (
    <AlarmStyle>
      <Header>
        <Select style={{ width: 120, margin: '2rem 0' }} defaultValue={"1"} onChange={navChange}>
          {
            timeList.map((item: { name: string, value: string }) => <Option key={item.value} value={item.value}>{item.name}</Option>)
          }
        </Select>
        <Nav>
          {navList?.data.map((item: any) => (<li key={item.id}>
            <img onClick={() => { }} src={`../../icon/${getType(item.type)}.png`} alt="" />
            <div>
              <div style={{ marginBottom: '1rem' }}>{getType(item.type)}</div>
              <div style={{ fontSize: '2rem', color: '#5A7FFA' }}>{item.num}</div>
            </div>
          </li>))}
        </Nav>
      </Header>
      <Main>
        <Select style={{ width: 120, margin: '1rem 0' }} defaultValue={"0"} onChange={stateChange}>
          {
            stateList.map((item: { name: string, value: string }) => <Option key={item.value} value={item.value}>{item.name}</Option>)
          }
        </Select>
        <Select style={{ width: 120, margin: '1rem 0', marginLeft: '1rem' }} defaultValue={"1"} onChange={timeChange}>
          {
            timeList.map((item: { name: string, value: string }) => <Option key={item.value} value={item.value}>{item.name}</Option>)
          }
        </Select>
        <Table columns={columns} pagination={{ total: dataList?.count, current: pagination.index, pageSize: pagination.size, }} onChange={handleTableChange} loading={isLoading} dataSource={dataList?.data}
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
  padding: 0 2rem;
`

const Main = styled.div`
  background: #fff;
  height: 63rem;
  border-radius: 1rem;
  padding: 0 2rem;
  overflow-y: auto;
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
