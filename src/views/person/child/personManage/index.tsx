import { Form, Input, Button, Table, Popconfirm, message, Modal } from 'antd';
import { ModalForm } from "./modal/ModalForm";
import { useDel, useInit } from './request';
import { useDebounce } from 'hook/useDebounce';
import { usePersonModal, useImportModal } from './util'
import { useAuth } from "context/auth-context";
import { Search } from 'utils/typings';
import { useEffect, useState } from 'react';
import { noData } from 'utils/verification';
import { Footer, Header, Main } from 'components/Styled';
import { useParam } from 'hook/useParam';
import { ImportModal } from 'components/ImportModal';
import { isButton } from 'utils';

const apiUrl = process.env.REACT_APP_API_URL;

export const PersonManage = () => {
  const { user } = useAuth()
  const [detail, setDetail] = useState<any>(undefined)
  const { param, setParam } = useParam()
  const { menu } = useAuth()
  const menuList = menu.find((item: { [item: string]: unknown }) => item.name === "人员管理").childMenu.find((item: { [item: string]: unknown }) => item.name === "人员管理").childMenu
  const { open, startEdit } = usePersonModal()
  const { open: openImportModal, ModalOpen } = useImportModal()
  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel()

  useEffect(() => {
    setParam({
      index: 1,
      size: 10,
      name: ""
    })
  }, [ModalOpen])

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
        setSelectedRowKeys([])
      }
    })
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
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
      // let bl = new Blob([blob], { type: blob.type });
      let fileName = "模板" + ".xlsx";
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    })
  }

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
            label=""
            name="name"
          >
            <Input placeholder={"姓名"} value={param.name}
              onChange={(evt) => setParam({ ...param, name: evt.target.value })} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>

          {
            isButton(menuList, "新增") && <Form.Item>
              <Button onClick={() => downTemplate()}>
                模板下载
              </Button>
            </Form.Item>
          }

          {
            isButton(menuList, "新增") && <Form.Item>
              <Button onClick={openImportModal}>导入人员</Button>
            </Form.Item>
          }
        </Form>

        {
          isButton(menuList, "新增") && <Button onClick={open}>新增</Button>
        }
      </Header>
      <Main>
        <Table columns={
          [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              ellipsis: true
            },
            {
              title: '性别',
              key: 'sex',
              render: (item) => <>{item.sex === 0 ? '男' : '女'}</>,
              ellipsis: true
            },
            {
              title: '员工卡号',
              dataIndex: 'number',
              key: 'number',
              ellipsis: true
            },
            {
              title: '防分离器',
              dataIndex: 'codeNumber',
              key: 'codeNumber',
              ellipsis: true
            },
            {
              title: '归属部门',
              dataIndex: 'departmentName',
              key: 'departmentName',
              ellipsis: true
            },
            {
              title: '创建者',
              dataIndex: 'createBy',
              key: 'id',
              ellipsis: true
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              key: 'createTime',
              ellipsis: true
            },
            {
              title: '出生日期',
              dataIndex: 'birthday',
              key: 'birthday',
              ellipsis: true
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
              ellipsis: true
            },
            {
              title: '操作',
              key: 'id',
              ellipsis: true,
              render: (item) => <>
                {
                  isButton(menuList, "修改") && <Button type="link" onClick={() => {
                    setDetail(item)
                    startEdit(item.id)
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
      <ModalForm param={param} setParam={setParam} detail={detail} />
      <ImportModal title={"导入人员"} url={"person/import"} query={"person"} />
    </>
  );
};