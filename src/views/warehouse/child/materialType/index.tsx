import { Form, Input, Button, message, Popconfirm, Table, Radio } from 'antd';
import { ModalForm } from "./modal/ModlaForm";
import { useDel, useInit } from './request'
import { useDebounce } from "hook/useDebounce";
import { useMaterialModal } from './util'
import { useState } from 'react';
import { noData } from 'utils/verification';
import { Header, Main } from 'components/Styled';

export const MaterialType = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: "",
    type: "1"
  })

  const { open, startEdit } = useMaterialModal()
  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Del } = useDel()

  const onChange = (e: any) => {
    setParam({
      ...param,
      type: e.target.value
    })
  };

  const search = (item: any) => {
    setParam({ ...param, name: item.name, index: 1 })
  };

  const del = async (id: number) => {
    Del(id)
  }

  const confirm = (item: any) => {
    del(item.id).then(() => {
      message.success('删除成功')
      setParam({ ...param, index: 1 })
    }).catch(err => {
      message.error(err.msg)
    })
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const handleTableChange = (p: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  const title = param.type === "1" ? "工具名称" : "物料名称"

  return (
    <>
      <Header>
        <Form
          name="basic"
          onFinish={search}
          layout={"inline"}
        >
          <Radio.Group defaultValue={"1"} onChange={onChange}>
            <Radio value={"1"}>工具</Radio>
            <Radio value={"2"}>物料</Radio>
          </Radio.Group>
          <Form.Item
            label=""
            name="name"
          >
            <Input placeholder={title} value={param.name}
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
        {/*<ToolTypeModal
          loading={isLoading}
          data={data?.data}
          cancel={cancel}
          confirm={confirm}
          current={param.index}
          handleTableChange={handleTableChange}
          total={data?.count}
          mod={startEdit}
          pageSize={param.size}
        />*/}
        <Table columns={
          [
            {
              title: title,
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
              render: (item: any) => <>
                <Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                <Popconfirm
                  title={`是否要删除${item.name}`}
                  onConfirm={() => confirm?.(item)}
                  onCancel={cancel}
                  okText="是"
                  cancelText="否"
                >
                  <Button type="link">删除</Button>
                </Popconfirm>
              </>
            },
          ]
        } pagination={{ total: data?.count, current: param.index, pageSize: param.size }} onChange={handleTableChange}
          loading={isLoading} dataSource={data?.data}
          rowKey={(item: any) => item.id}
          locale={noData}
        />
      </Main>
      <ModalForm param={param} setParam={setParam} />
    </>
  );
};