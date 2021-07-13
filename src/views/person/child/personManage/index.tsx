import {Form, Input, Button, Table, Popconfirm, message} from 'antd';
import styled from "@emotion/styled";
import {ImportModal, ModalForm} from "./modal/ModalForm";
import {useDel, useInit, useProjectsSearchParams} from 'utils/person/personManage';
import {useDebounce} from 'hook/useDebounce';
import {usePersonModal, useImportModal} from './util'
import {useAuth} from "../../../../context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

export const PersonManage = () => {
  const {user} = useAuth()
  const [param, setParam] = useProjectsSearchParams()
  const {open, startEdit} = usePersonModal()
  const {open: openImportModal} = useImportModal()
  const {data, isLoading} = useInit(useDebounce(param, 500))
  const {mutateAsync: Del} = useDel()

  const search = (item: any) => {
    setParam({...param, name: item.name, index: 1})
  };

  const del = async (id: number) => {
    Del(id)
  }

  const confirm = (id: number) => {
    del(id).then(() => {
      message.success('删除成功')
      setParam({...param, index: 1})
    }).catch(err => {
      message.error(err.msg)
    })
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
  };

  const downTemplate = () => {
    fetch(`${apiUrl}person/downTemplate`, {
      method: 'get',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `${user?.jwtToken}`
      },
    }).then((res) => {
      return res.blob();
    }).then(blob => {
      let bl = new Blob([blob], {type: blob.type});
      let fileName = "模板" + ".xlsx";
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    })
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
            label=""
            name="name"
          >
            <Input placeholder={"姓名"} value={param.name}
                   onChange={(evt) => setParam({...param, name: evt.target.value})}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={() => downTemplate()}>
              模板下载
            </Button>
          </Form.Item>

          <Form.Item>
              <Button onClick={openImportModal}>导入人员</Button>
          </Form.Item>
        </Form>

        <Button onClick={open}>新增</Button>
      </Header>
      <Main>
        <Table columns={
          [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '性别',
              key: 'sex',
              render: (item) => <>{item.sex === 1 ? '男' : '女'}</>
            },
            {
              title: '员工卡号',
              dataIndex: 'number',
              key: 'number',
            },
            {
              title: '归属部门',
              dataIndex: 'departmentName',
              key: 'departmentName',
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
              title: '出生日期',
              dataIndex: 'birthday',
              key: 'birthday',
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
            },
            {
              title: '操作',
              key: 'id',
              render: (item: any) => <><Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
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
        } pagination={{total: data?.count, current: param.index, pageSize: param.size}}
               onChange={handleTableChange}
               loading={isLoading}
               dataSource={data?.data}
               rowKey={(item: any) => item.id}/>
      </Main>
      <ModalForm/>
      <ImportModal/>
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