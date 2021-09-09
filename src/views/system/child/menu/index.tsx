import { Form, Input, Button, Table, Popconfirm, message } from 'antd';
import { ModalForm } from "./modal/ModalForm";
import { useDel, useInit } from './request';
import { useDebounce } from 'hook/useDebounce';
import { useMenuModal } from './util'
import { Search } from 'utils/typings';
import { noData } from 'utils/verification';
import { Header, Main } from 'components/Styled';
import { useParam } from 'hook/useParam';
import { useAuth } from 'context/auth-context';
import { useState } from 'react';
import { isButton } from 'utils';

export const MenuRender = () => {
  const { menu } = useAuth()
  const menuList = menu.find((item: { [item: string]: unknown }) => item.name === "系统管理").childMenu.find((item: { [item: string]: unknown }) => item.name === "菜单管理").childMenu
  const { param, setParam } = useParam()
  const { open, startEdit } = useMenuModal()
  const [parentId, setParentId] = useState<any>()
  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Del } = useDel()

  const search = (item: Search) => {
    setParam({ ...param, name: item.name, index: 1 })
  };

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
        <Form
          name="basic"
          onFinish={search}
          layout={"inline"}
        >
          <Form.Item
            label=""
            name="name"
          >
            <Input placeholder={"菜单名称"} value={param.name}
              onChange={(evt) => setParam({ ...param, name: evt.target.value })} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>

        {
          isButton(menuList, "新增") && <Button onClick={() => {
            open()
            setParentId(0)
          }}>新增</Button>
        }
      </Header>
      <Main>
        <Table columns={
          [
            {
              title: '菜单名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: "创建时间",
              dataIndex: 'createTime',
              key: 'id',
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
                  isButton(menuList, "新增") && <Button type={"link"} onClick={() => {
                    open()
                    setParentId(item.id)
                  }}>新增</Button>
                }
                {
                  isButton(menuList, "修改") && <Button type={"link"} onClick={() => {
                    startEdit(item.id)
                    setParentId(item.id)
                  }}>修改</Button>
                }
                <Popconfirm
                  title={`是否要删除${item.name}`}
                  onConfirm={() => confirm(item.id)}
                  onCancel={cancel}
                  okText="是"
                  cancelText="否"
                >
                  {
                    isButton(menuList, "删除") && <Button type="link">删除</Button>
                  }
                </Popconfirm></>
            },
          ]
        } pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
          onChange={handleTableChange}
          loading={isLoading}
          dataSource={data?.data}
          childrenColumnName="childMenu"
          rowKey={(item) => item.id}
          locale={noData}
        />
      </Main>
      <ModalForm param={param} setParam={setParam} parentId={parentId} />
    </>
  );
};