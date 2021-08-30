import { Form, Input, Button, Table, Popconfirm, message, Modal } from 'antd';
import { Drawermanage } from "./drawermanage/Drawermanage";
import { ModalForm } from "./modal/ModalForm";
import { useDel, useInit } from './request'
import { useDebounce } from 'hook/useDebounce';
import { useProjectModal, useLineModal } from './util'
import { createContext, useState, useContext } from "react";
import { noData } from 'utils/verification';
import { Footer, Header, Main } from 'components/Styled';

const LineContext = createContext<| {
  openClassVisible: boolean,
  setOpenClassVisible: (openVisible: boolean) => void
  openPlatVisible: boolean,
  setOpenPlatVisible: (openVisible: boolean) => void
  openRoadVisible: boolean,
  setOpenRoadVisible: (openVisible: boolean) => void
  classId: number | undefined
  setClassId: (openId: number | undefined) => void
  platId: number | undefined
  setPlatId: (openId: number | undefined) => void
  roadId: number | undefined
  setRoadId: (openId: number | undefined) => void
}
  | undefined>(undefined)

export const Line = () => {
  const [openClassVisible, setOpenClassVisible] = useState<boolean>(false)
  const [openPlatVisible, setOpenPlatVisible] = useState<boolean>(false)
  const [openRoadVisible, setOpenRoadVisible] = useState<boolean>(false)
  const [classId, setClassId] = useState<number | undefined>(undefined)
  const [platId, setPlatId] = useState<number | undefined>(undefined)
  const [roadId, setRoadId] = useState<number | undefined>(undefined)
  const [param, setParam] = useState({ index: 1, size: 10, name: '' })
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { open, startEdit: startEditLine } = useLineModal()
  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel()

  const search = (item: any) => {
    setParam({ ...param, name: item.name, index: 1 })
  }

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

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])

  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (keys: any, value: any) => {
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: record.state == 1
    })
  }

  const start = () => {
    const ids = selectedRowKeys.join(",")
    Modal.confirm({
      title: `是否要删除${selectedRowKeys.length}条数据`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        confirm(ids);
        setSelectedRowKeys([])
      },
    });
  }

  return (
    <LineContext.Provider value={{ openClassVisible, openPlatVisible, openRoadVisible, setOpenClassVisible, setOpenPlatVisible, setOpenRoadVisible, classId, setClassId, platId, setPlatId, roadId, setRoadId }}>
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
            <Input placeholder={"地铁线路名称"} value={param.name}
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
              title: '地铁线路名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '创建者',
              dataIndex: 'createBy',
              key: 'id',
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              key: 'createTime',
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
            },
            {
              title: '操作',
              key: 'id',
              render: (item) => <><Button type="link" onClick={editProject(item.id)}>管理</Button><Button
                type="link"
                onClick={() => startEditLine(item.id)}>修改</Button>
                <Popconfirm
                  title={`是否要删除${item.name}`}
                  onConfirm={() => confirm(item.id)}
                  onCancel={cancel}
                  okText="是"
                  cancelText="否"
                >
                  <Button type="link">删除</Button>
                </Popconfirm></>
            },
          ]
        } pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
          onChange={handleTableChange}
          dataSource={data?.data}
          loading={isLoading}
          rowKey={(item) => item.id}
          locale={noData}
          rowSelection={rowSelection}
        />
      </Main>
      {
        hasSelected ? <Footer>
          <div>{hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}</div>
          <Button type="primary" onClick={start} loading={mutaLoading}>
            {hasSelected ? `批量删除` : ''}
          </Button>
        </Footer> : undefined
      }
      <ModalForm param={param} setParam={setParam} />
      <Drawermanage />
    </LineContext.Provider>
  );
}

export const useLineContext = () => {
  const context = useContext(LineContext)
  if (!context) {
    throw new Error('useLineContext必须在Line组件中使用')
  }
  return context
}