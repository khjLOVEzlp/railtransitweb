import { useState } from 'react';
import { Button, Table, Popconfirm, message, Modal } from 'antd';
import { useDel, useInit } from './request';
import { ModalForm } from "./ModalForm";
import { useDepartmentModal } from './util'
import { noData } from 'utils/verification';
import { Footer, Header, Main } from 'components/Styled';
import { useParam } from 'hook/useParam';
import { useAuth } from 'context/auth-context';

export const Department = () => {
  const { param, setParam } = useParam()
  const { menu } = useAuth()
  const menuList = menu.find((item: { [item: string]: unknown }) => item.name === "系统管理").childMenu.find((item: { [item: string]: unknown }) => item.name === "部门管理").childMenu
  const { open, startEdit } = useDepartmentModal()

  const { data, isLoading } = useInit({ ...param })
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel()

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
    setSelectedRowKeys([])
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])

  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (keys: any, value: any) => {
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
        <div>部门管理</div>
        {
          menuList.find((key: { [key: string]: unknown }) => key.name === '新增') && <Button onClick={open}>新增</Button>
        }
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
                {
                  menuList.find((key: { [key: string]: unknown }) => key.name === '修改') && <Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                }
                <Popconfirm
                  title={`是否要删除${item.name}`}
                  onConfirm={() => confirm(item.id)}
                  onCancel={cancel}
                  okText="是"
                  cancelText="否"
                >
                  {
                    menuList.find((key: { [key: string]: unknown }) => key.name === '删除') && <Button type="link">删除</Button>
                  }
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
    </>
  );
};