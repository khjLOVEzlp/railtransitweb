import { Form, Input, Button, Table, message, Tag, Dropdown, Menu, Modal } from 'antd';
/*
* 新增修改弹框
* */
import { ModalForm } from "./modal/ModalForm";
/*
* 接口请求
* */
import { useDel, useInit } from './request';
/*计划发布弹框*/
import { ShareModalForm } from './modal/ShareModalForm';
import { useDebounce } from "hook/useDebounce";
import { usePlanWorkModal, useShareModal } from './util'
import { Search } from 'utils/typings';
import { useState } from 'react';
import { noData } from 'utils/verification';
import { Footer, Header, Main } from 'components/Styled';
import { useParam } from 'hook/useParam';
import { useAuth } from 'context/auth-context';
import { isButton } from 'utils';

/*作业计划*/
export const PlanWork = () => {
  const { param, setParam } = useParam()
  const { menu } = useAuth()
  const menuList = menu.find((item: { [item: string]: unknown }) => item.name === "作业计划").childMenu.find((item: { [item: string]: unknown }) => item.name === "作业计划").childMenu
  const { open, startEdit } = usePlanWorkModal()
  const { startEdit: startShareEdit } = useShareModal()
  const { data, isLoading } = useInit(useDebounce(param, 500))
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel()
  const [status, setStatus] = useState<number | undefined>(undefined)
  // const { mutateAsync: SharePlan } = useSharePlan()

  /*删除*/
  const confirm = (id: number) => {
    Del(id).then((res) => {
      if (res.code !== 200) {
        message.error(res.msg)
      } else {
        message.success('删除成功')
        setParam({ ...param, index: 1 })
        selectedRowKeys([])
      }
    })
  }

  /*搜索*/
  const search = (item: Search) => {
    setParam({ ...param, name: item.name, index: 1 })
  };

  /*分页*/
  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  /*计划执行状态*/
  const isStatus = (type: number) => {
    switch (type) {
      case 0:
        return <Tag color="default">未开始</Tag>
      case 1:
        return <Tag color="processing" >已发布</Tag>

      case 2:
        return <Tag color="success">已执行</Tag>
      case 3:
        return <Tag color="error">已取消发布</Tag>

      default:
        break;
    }
  }

  /*是否自动执行*/
  const isWarn = (type: number) => {
    switch (type) {
      case 0:
        return <Tag color="error">否</Tag>
      case 1:
        return <Tag color="success" >是</Tag>

      default:
        break;
    }
  }

  const confirmDeleteProject = (item: any) => {
    Modal.confirm({
      title: `是否要删除${item.name}`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        confirm(item.id);
      },
    });
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
      disabled: record.status === 2
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
            <Input placeholder={"计划名称"} value={param.name}
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
              title: '计划名称',
              dataIndex: 'name',
              key: 'name',
              ellipsis: true
            },
            {
              title: "负责人",
              dataIndex: 'leaderName',
              key: 'leaderName',
              ellipsis: true
            },
            {
              title: '开始时间',
              dataIndex: 'beginTime',
              key: 'beginTime',
              ellipsis: true
            },
            {
              title: '结束时间',
              dataIndex: 'endTime',
              key: 'endTime',
              ellipsis: true
            },
            {
              title: '线路',
              dataIndex: 'lineName',
              key: 'lineName',
              ellipsis: true
            },
            {
              title: '请站点',
              dataIndex: 'pinName',
              key: 'pinName',
              ellipsis: true
            },
            {
              title: '销站点',
              dataIndex: 'pleaseName',
              key: 'pleaseName',
              ellipsis: true
            },
            {
              title: '状态',
              render: (item) => (<span>{isStatus(item.status)}</span>),
              key: 'status',
              ellipsis: true
            },
            {
              title: '是否自动提醒',
              key: 'isWarn',
              render: (item) => (<span>{isWarn(item.isWarn)}</span>),
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
              align: "center",
              ellipsis: true,
              render: (item) => (
                <>
                  <Dropdown
                    overlay={
                      <Menu>
                        {
                          item.status === 2 && isButton(menuList, "发布") ? (
                            <Menu.Item disabled key={"shareEdit"}>
                              发布计划
                            </Menu.Item>
                          ) : isButton(menuList, "发布") && (
                            <Menu.Item onClick={() => {
                              startShareEdit(item.id)
                              setStatus(item.status)
                            }} key={"shareEdit"}>
                              发布计划
                            </Menu.Item>
                          )
                        }
                        {
                          item.status === 2 && isButton(menuList, "修改") ? (
                            <Menu.Item
                              disabled
                              key={"edit"}
                            >
                              修改
                            </Menu.Item>
                          ) : isButton(menuList, "修改") && (
                            <Menu.Item
                              onClick={() => startEdit(item.id)}
                              key={"edit"}
                            >
                              修改
                            </Menu.Item>
                          )
                        }
                        {
                          item.status === 2 && isButton(menuList, "删除") ? (<Menu.Item
                            disabled
                            key={"delete"}
                          >
                            删除
                          </Menu.Item>) : isButton(menuList, "删除") && (<Menu.Item
                            onClick={() => confirmDeleteProject(item)}
                            key={"delete"}
                          >
                            删除
                          </Menu.Item>)
                        }
                      </Menu>
                    }
                  >
                    {
                      item.status === 2 ? (
                        <Button style={{ padding: 0 }} type={"link"} disabled>
                          ...
                        </Button>
                      ) : (
                        <Button style={{ padding: 0 }} type={"link"}>
                          ...
                        </Button>
                      )
                    }
                  </Dropdown>
                </>
              )
            },
          ]
        } pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
          onChange={handleTableChange}
          dataSource={data?.data}
          loading={isLoading}
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
      <ShareModalForm status={status} />
    </ >
  );
}

