import { useState } from 'react';
import { Button, Table, Popconfirm, message } from 'antd';
import { useDel, useInit } from './request';
import { ModalForm } from "./ModalForm";
import { useDepartmentModal } from './util'
import { noData } from 'utils/verification';
import { Header, Main } from 'components/Styled';

export const Department = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: ''
  })

  const { open, startEdit } = useDepartmentModal()

  const { data, isLoading } = useInit({ ...param })
  const { mutateAsync: Del } = useDel()

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

  return (
    <>
      <Header>
        <div>部门管理</div>
        <Button onClick={open}>新增</Button>
      </Header>
      <Main>
        <Table columns={
          [
            {
              title: '部门名称',
              dataIndex: 'name',
              key: 'id',
            },
            {
              title: '创建者',
              dataIndex: 'createBy',
              key: 'id',
            },
            {
              title: "创建时间",
              dataIndex: "createTime",
              key: "id"
            },
            {
              title: "更新时间",
              dataIndex: "updateTime",
              key: "id"
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
            },
            {
              title: '操作',
              key: 'id',
              render: (item) => <>
                <Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                <Popconfirm
                  title={`是否要删除${item.name}`}
                  onConfirm={() => confirm(item.id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link">删除</Button>
                </Popconfirm></>
            },
          ]
        } pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
          onChange={handleTableChange}
          loading={isLoading}
          dataSource={data?.data}
          childrenColumnName="departmentList"
          rowKey={(item) => item.id}
          locale={noData}
        />
      </Main>
      <ModalForm param={param} setParam={setParam} />
    </>
  );
};