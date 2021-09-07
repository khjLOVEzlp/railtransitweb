import { Form, Input, Button, Table, Popconfirm, message, Tag, Modal } from 'antd';
import { useDel, useImportModal, useInit } from './request';
import { ImportModal, ModalForm } from './ModalForm';
import { useDebounce } from 'hook/useDebounce';
import { useLabModal } from './util'
import { Search } from 'utils/typings';
import { Footer, Header, Main } from 'components/Styled';
import { noData } from 'utils/verification';
import { useState } from 'react';
import { useParam } from 'hook/useParam';
import { useAuth } from 'context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;

export const LabelController = () => {
  const { user } = useAuth()
  const { param, setParam } = useParam()
  const { open, startEdit } = useLabModal()
  const { open: openImportModal } = useImportModal()
  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel()

  const search = (item: Search) => {
    setParam({ ...param, name: item.name, index: 1 })
  }

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

  const downTemplate = () => {
    fetch(`${apiUrl}hardware/label/downTemplate`, {
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
            <Input placeholder={"编号"} value={param.name}
              onChange={(evt) => setParam({ ...param, name: evt.target.value })} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={downTemplate}>
              模板下载
            </Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={openImportModal}>
              导入
            </Button>
          </Form.Item>
        </Form>

        <Button onClick={open}>新增</Button>
      </Header>
      <Main>
        <Table columns={
          [
            {
              title: '2.4G编码',
              dataIndex: 'codeHex10',
              key: 'codeHex10',
            },
            {
              title: '915编码',
              dataIndex: 'codeHex915',
              key: 'codeHex915',
            },
            {
              title: '归属仓库',
              dataIndex: 'warehouseName',
              key: 'warehouseName',
            },
            {
              title: '是否使用',
              key: 'isUse',
              render: (item) => item.isUse === "0" ? <Tag color="success" >使用</Tag> : <Tag color="processing" >未使用</Tag>
            },
            {
              title: '操作',
              key: 'id',
              render: (item) => <><Button type="link" onClick={() => startEdit(item.id)}>修改</Button>
                <Popconfirm
                  title={`是否要删除${item.codeHex10}`}
                  onConfirm={() => confirm(item.id)}
                  onCancel={cancel}
                  okText="是"
                  cancelText="否"
                >
                  <Button type={"link"}>删除</Button>
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
        hasSelected ? <Footer>
          <div>{hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}</div>
          <Button type="primary" onClick={start} loading={mutaLoading}>
            {hasSelected ? `批量删除` : ''}
          </Button>
        </Footer> : undefined
      }
      <ModalForm param={param} setParam={setParam} />
      <ImportModal />
    </>
  );
};
