import { Form, Input, Button, Table, Popconfirm, message, Tag, Modal } from 'antd';
import { useDel, useInit } from './request';
import { ModalForm } from './ModalForm';
import { useDebounce } from 'hook/useDebounce';
import { useRfiModal } from './util'
import { Search } from 'utils/typings';
import { Footer, Header, Main } from 'components/Styled';
import { noData } from 'utils/verification';
import { useState } from 'react';
import { useParam } from 'hook/useParam';
import { useAuth } from 'context/auth-context';
import { isButton } from 'utils';

export const RfidCardController = () => {
  const { param, setParam } = useParam()
  const { open, startEdit } = useRfiModal()
  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel()
  const { menu } = useAuth()
  const menuList = menu.find((item: { [item: string]: unknown }) => item.name === "设备管理").childMenu.find((item: { [item: string]: unknown }) => item.name === "工卡").childMenu

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
      setSelectedRowKeys([])
    }).catch((err) => {
      message.error(err.msg)
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
            <Input placeholder={"卡号"} value={param.name}
              onChange={(evt) => setParam({ ...param, name: evt.target.value })} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>

        {
          isButton(menuList, "新增") && <Button onClick={open}>新增</Button>
        }
      </Header>
      <Main>
        <Table columns={
          [
            {
              title: '卡号',
              dataIndex: 'rfid',
              key: 'rfid',
            },
            {
              title: '是否使用',
              key: 'isUse',
              render: (item) => item.isUse === "0" ? <Tag color="success" >使用</Tag> : <Tag color="processing" >未使用</Tag>
            },
            {
              title: '操作',
              key: 'id',
              render: (item) => <>
                {
                  isButton(menuList, "修改") && <Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                }

                <Popconfirm
                  title={`是否要删除${item.rfid}`}
                  onConfirm={() => confirm(item.id)}
                  onCancel={cancel}
                  okText="是"
                  cancelText="否"
                >

                  {
                    isButton(menuList, "删除") && <Button type={"link"}>删除</Button>
                  }
                </Popconfirm></>
            },
          ]
        } pagination={{ total: data?.count, current: param.index, pageSize: param.size, }} onChange={handleTableChange}
          loading={isLoading} dataSource={data?.data}
          rowKey={(item) => item.id}
          locale={noData}
          rowSelection={rowSelection}
        />
      </Main>

      {
        hasSelected && isButton(menuList, "删除") && <Footer>
          <div>{hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}</div>
          <Button type="primary" onClick={start} loading={mutaLoading}>
            {hasSelected ? `批量删除` : ''}
          </Button>
        </Footer>
      }
      <ModalForm param={param} setParam={setParam} />
    </>
  );
};