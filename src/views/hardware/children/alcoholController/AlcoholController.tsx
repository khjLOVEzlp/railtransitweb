import { Form, Input, Button, Table, Popconfirm, message } from 'antd';
import { useDel, useInit } from './request';
import { ModalForm } from './ModalForm';
import { useDebounce } from 'hook/useDebounce';
import { useAlcModal } from './util'
import { Search } from 'utils/typings';
import { Header, Main } from 'components/Styled';
import { noData } from 'utils/verification';
import { useProject } from 'utils';

export const AlcoholController = () => {
  const { param, setParam } = useProject()
  const { open, startEdit } = useAlcModal()
  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Del } = useDel()

  const search = (item: Search) => {
    setParam({ ...param, name: item.name, index: 1 })
  };

  const del = async (id: number) => {
    Del(id)
  }

  const confirm = (id: number) => {
    del(id).then(() => {
      message.success('删除成功')
      setParam({ ...param, index: 1 })
    })
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
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
            name="name"
          >
            <Input placeholder={"设备编号"} value={param.name}
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
              title: '设备编号',
              dataIndex: 'code',
              key: 'code',
            },
            {
              title: "厂商",
              dataIndex: "operator",
              key: "operator"
            },
            {
              title: '是否使用',
              key: 'isUse',
              render: (item) => item.status === "0" ? '使用' : '未使用'
            },
            {
              title: '操作',
              key: 'id',
              render: (item) => <><Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                <Popconfirm
                  title={`是否要删除${item.code}`}
                  onConfirm={() => confirm(item.id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type={"link"}>删除</Button>
                </Popconfirm></>
            },
          ]
        } pagination={{ total: data?.count, current: param.index, pageSize: param.size, }} onChange={handleTableChange}
          loading={isLoading} dataSource={data?.data}
          rowKey={(item) => item.id}
          locale={noData}
        />
      </Main>
      <ModalForm />
    </>
  );
};