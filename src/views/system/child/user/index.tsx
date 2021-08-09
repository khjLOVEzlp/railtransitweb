import { useState } from 'react';
import { Form, Input, Button, Table, Popconfirm, message } from 'antd';
import { ModalForm } from "./modal/ModalForm";
import { useDel, useInit } from './request';
import { useHttp } from 'utils/http';
import qs from 'qs';
import { useDebounce } from 'hook/useDebounce';
import { PassModal } from "components/PassModal";
import { useUserModal } from './util'
import { Search } from "utils/typings";
import { noData } from 'utils/verification';
import { Header, Main } from 'components/Styled';

export const User = () => {
  const [passwdVisible, setPasswdVisible] = useState(false)
  const [passId, setPassId] = useState<number>()
  const client = useHttp()
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: ""
  })
  const { open, startEdit } = useUserModal()
  const { data, isLoading } = useInit(useDebounce(param, 500))
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

  const search = (item: Search) => {
    setParam({ ...param, name: item.name, index: 1 })
  };

  const modPass = (passId: number) => {
    setPassId(passId)
    setPasswdVisible(true)
  }

  const onCreate = (values: any) => {
    client(`user/resetPassWord?${qs.stringify({ ...values, id: passId })}`, { method: "POST" }).then(() => {
      message.success("修改成功")
      setPasswdVisible(false);
    }).catch(error => {
      message.error(error.msg)
    })
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
            <Input placeholder={"用户名"} value={param.name}
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
        <Table
          columns={
            [
              {
                title: '用户名',
                dataIndex: 'name',
                key: 'id',
              },
              {
                title: '账号',
                dataIndex: 'loginName',
                key: 'id',
              },
              {
                title: "归属部门",
                dataIndex: 'departmentName',
                key: 'id',
              },
              {
                title: "登陆日期",
                dataIndex: 'loginDate',
                key: 'id',
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
                  <Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                  <Button type="link" onClick={() => modPass(item.id)}>重置密码</Button>
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
          }
          pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
          onChange={handleTableChange}
          dataSource={data?.data}
          loading={isLoading}
          rowKey={(item) => item.id}
          locale={noData}
        />
      </Main>
      <ModalForm param={param} setParam={setParam} />
      <PassModal
        passwd={"reset"}
        visible={passwdVisible}
        onCreate={onCreate}
        onCancel={() => {
          setPasswdVisible(false);
        }}
      />
    </>
  );
};
