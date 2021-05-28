import styled from "@emotion/styled"
import {Button, message, Popconfirm, Select, Table} from "antd"
import React, {useCallback, useEffect, useState} from "react"
import {useDocumentTitle} from '../../hook/useDocumentTitle'
import {useHttp} from "../../utils/http"
import {useLocation} from "react-router";

const {Option} = Select;

export const Alarm = () => {
  const {state} = useLocation()
  const [navList, setNavList] = useState([])
  const [data, setData] = useState([])
  const [type, setType] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    type: '',
    name: ""
  })

  // useEffect(() => {
  //   setPagination({...pagination, name: String(state)})
  // }, [])

  const client = useHttp()

  const init = useCallback(() => {
    const param = {...pagination, index: pagination.page}
    client(`alarm/list`, {
      method: "POST", body: JSON.stringify(param)
    }).then(res => {
      setData(res.data)
      setPagination({...pagination, total: res.count})
    })
  }, [pagination.page, pagination.type, pagination.name])

  const getNavList = useCallback(() => {
    client(`alarm/statistic/list`, {
      method: "POST", body: JSON.stringify(pagination)
    }).then(res => {
      setNavList(res.data)
    })
  }, [client])

  const getType = useCallback(() => {
    client(`dictItem/list?index=1&size=100&typeId=002`, {method: "POST"})
      .then(res => {
        setType(res.data)
      })
  }, [client])

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    getNavList()
  }, [getNavList])

  useEffect(() => {
    getType()
  }, [getType])

  const filter = (title: string) => {
    setPagination({...pagination, name: title})
  }

  // 重置
  const reset = () => {
    setPagination({...pagination, type: '', name: ''})
  }

  const del = async (id: number | string) => {
    client(`hardware/alcohol/delete/${id}`)
      .then(() => {
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
      key: 'address',
      render: (item: any) => <Popconfirm
        title={`是否要删除${item.title}`}
        onConfirm={() => confirm(item)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button type={"link"}>删除</Button>
      </Popconfirm>
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
            <img onClick={() => filter(item.title)} src={`../../icon/${item.title}.png`} alt=""/>
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
        <Button style={{marginLeft: '1rem'}}
                onClick={() => reset()}>重置</Button>
        <Table columns={columns} pagination={{total: pagination.total, onChange: onChange}} dataSource={data}
               rowKey={(item: any) => item.id}/>
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
