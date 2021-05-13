import styled from "@emotion/styled";
import {Button, Drawer, Form, Input, message, Popconfirm, Table, Tabs} from "antd";
import qs from "qs";
import React, {useEffect, useState} from "react";
import {useMount} from "../../../../../hook";
import {useHttp} from "../../../../../utils/http";

interface Props {
  isShowDrawer: boolean,
  setIsShowDrawer: (isShowDrawer: boolean) => void,
  formData: {
    id: number,
    name: string,
    remark: string
  }
}

const {TabPane} = Tabs;

function callback() {
}

export const Drawermanage = ({formData, setIsShowDrawer}: Props) => {
  const [visible, setVisible] = useState(true);
  const [navList] = useState([
    {
      name: "地铁路段",
      id: 1,
      tem: <Road formData={formData}/>,
    },
    {
      name: "地铁站台",
      id: 2,
      tem: <Platform formData={formData}/>,
    },
    {
      name: "地铁班别",
      id: 3,
      tem: <Class formData={formData}/>,
    }
  ])

  const onClose = () => {
    setVisible(false);
    setIsShowDrawer(false)
  };

  return (
    <>
      <Drawer
        title="线路管理"
        placement="right"
        closable={true}
        width={800}
        onClose={onClose}
        visible={visible}
        keyboard={false}
        maskClosable={false}
      >
        <div>
          <LineTitle>{formData.name}</LineTitle>
          <div>备注：{formData.remark}</div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            {
              navList.map((item: any) => <TabPane tab={item.name} key={item.id}>
                {item.tem}
              </TabPane>)
            }
          </Tabs>
        </div>
      </Drawer>
    </>
  );
}

const LineTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #48b4ff;
`

export const Road = ({formData}: { formData: any }) => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    name: '',
  })

  const client = useHttp()

  const getLineRoad = () => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
      lineId: formData.id,
    }
    client(`lineRoad/list?${qs.stringify(param)}`, {method: "POST"}).then(res => {
      setData(res.data)
      setPagination({...pagination, totla: res.count})
    })
  }

  useEffect(() => {
    getLineRoad()
  }, [pagination.page, pagination.name])

  const add = () => {

  }

  const mod = (item: any) => {
  }

  const onFinish = () => {
  }

  const onChange = () => {

  }

  const del = async (id: number | string) => {
    client(`lineRoad/delete/${id}`)
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const columns = [
    {
      title: '路线',
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
      key: 'id',
      render: (item: any) => (<><Button type="link" onClick={() => mod(item)}>修改</Button><Popconfirm
        title={`是否要删除${item.name}`}
        onConfirm={() => confirm(item)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">删除</a>
      </Popconfirm></>)
    },
  ]

  return (
    <Contianer>
      <Header>
        <Form
          name="basic"
          onFinish={onFinish}
          layout={"inline"}
        >
          <Form.Item
            label="路段名称"
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
        <Table columns={columns} pagination={{total: pagination.totla, onChange: onChange}} dataSource={data}
               rowKey={(item: any) => item.id}/>
      </Main>
    </Contianer>
  )
}

const Contianer = styled.div`
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
`

const Main = styled.div`

`

export const Platform = ({formData}: { formData: any }) => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    name: '',
  })

  const client = useHttp()

  const getLineRoad = () => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
      lineId: formData.id,
    }
    client(`linePlatform/list?${qs.stringify(param)}`, {method: "POST"}).then(res => {
      setData(res.data)
      setPagination({...pagination, totla: res.count})
    })
  }

  useEffect(() => {
    getLineRoad()
  }, [pagination.page, pagination.name])

  const add = () => {

  }

  const mod = (item: any) => {
  }

  const onFinish = () => {
  }

  const onChange = () => {

  }

  const del = async (id: number | string) => {
    client(`linePlatform/delete/${id}`)
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const columns = [
    {
      title: '站台名称',
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
      key: 'id',
      render: (item: any) => (<><Button type="link" onClick={() => mod(item)}>修改</Button><Popconfirm
        title={`是否要删除${item.name}`}
        onConfirm={() => confirm(item)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">删除</a>
      </Popconfirm></>)
    },
  ]

  return (
    <Contianer>
      <Header>
        <Form
          name="basic"
          onFinish={onFinish}
          layout={"inline"}
        >
          <Form.Item
            label="路段名称"
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
        <Table columns={columns} pagination={{total: pagination.totla, onChange: onChange}} dataSource={data}
               rowKey={(item: any) => item.id}/>
      </Main>
    </Contianer>
  )
}

export const Class = ({formData}: { formData: any }) => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totla: 0,
    name: '',
  })

  const client = useHttp()

  const getLineRoad = () => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
      lineId: formData.id,
    }
    client(`lineClass/list?${qs.stringify(param)}`, {method: "POST"}).then(res => {
      setData(res.data)
      setPagination({...pagination, totla: res.count})
    })
  }

  useEffect(() => {
    getLineRoad()
  }, [pagination.page, pagination.name])

  const add = () => {

  }

  const mod = (item: any) => {
  }

  const onFinish = () => {
  }

  const onChange = () => {

  }

  const del = async (id: number | string) => {
    client(`lineClass/delete/${id}`)
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const columns = [
    {
      title: '班别',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'id',
      render: (item: any) => (<><Button type="link" onClick={() => mod(item)}>修改</Button><Popconfirm
        title={`是否要删除${item.name}`}
        onConfirm={() => confirm(item)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">删除</a>
      </Popconfirm></>)
    },
  ]

  return (
    <Contianer>
      <Header>
        <Form
          name="basic"
          onFinish={onFinish}
          layout={"inline"}
        >
          <Form.Item
            label="路段名称"
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
        <Table columns={columns} pagination={{total: pagination.totla, onChange: onChange}} dataSource={data}
               rowKey={(item: any) => item.id}/>
      </Main>
    </Contianer>
  )
}