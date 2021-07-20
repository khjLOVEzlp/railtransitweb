import React, {useState} from 'react';
import {Button, Table, Popconfirm, message} from 'antd';
import styled from "@emotion/styled";
import {useDel, useInit} from 'utils/system/department';
import {ModalForm} from "./ModalForm";
import {useDepartmentModal} from './util'

export const Department = () => {
  const [pagination, setPagination] = useState({
    index: 1,
    size: 10,
    name: ''
  })

  const {open, startEdit} = useDepartmentModal()

  const {data, isLoading} = useInit({...pagination})
  const {mutateAsync: Del} = useDel()

  const confirm = (id: number) => {
    Del(id).then((res) => {
      if (res.code !== 200) {
        message.error(res.msg)
      } else {
        message.success('删除成功')
        setPagination({...pagination, index: 1})
      }
    })
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setPagination({...pagination, index: p.current, size: p.pageSize})
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
        } pagination={{total: data?.count, current: pagination.index, pageSize: pagination.size}}
               onChange={handleTableChange}
               loading={isLoading}
               dataSource={data?.data}
               childrenColumnName="departmentList"
               rowKey={(item) => item.id}
        />
      </Main>
      <ModalForm/>
    </>
  );
};

const Header = styled.div`
  height: 12.5rem;
  background: #fff;
  margin-bottom: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`

const Main = styled.div`
  background: #fff;
  height: 73rem;
  border-radius: 1rem;
  padding: 0 1.5rem;
  overflow-y: auto;
`