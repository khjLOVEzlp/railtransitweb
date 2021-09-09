import { Button, Form, message, Modal, Popconfirm, Radio, Table, Input } from "antd"
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { noData, rules } from "utils/verification";
import { useInit, useMod, useFeedBack, useAllMod } from "./request";
import { useNoticeModal } from './util'

const { TextArea } = Input

export const OperModal = () => {
  const { ModalOpen, close } = useNoticeModal()
  const { mutateAsync, isLoading: mutaLoading } = useAllMod()
  const [shareVisible, setShareVisible] = useState(false)
  const [id, setId] = useState<number | undefined>(undefined)
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [form] = useForm()

  const start = () => {
    const ids = selectedRowKeys.join(",")
    mutateAsync(ids).then((res => {
      if (res.code === 200) {
        setSelectedRowKeys([])
      } else {
        message.error(res.msg)
      }
    })).catch(err => {
      message.error(err.msg)
    })
  }

  const onSelectChange = (keys: any, value: any) => {
    console.log(keys.join(','));

    setSelectedRowKeys(keys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: record.state === 1
    })
  }

  const [pagination, setPagination] = useState({
    index: 1,
    size: 10
  })

  useEffect(() => {
    setPagination({
      index: 1,
      size: 10
    })
  }, [ModalOpen])

  const { data, isLoading } = useInit(pagination)
  const { mutateAsync: Mod } = useMod()
  const { mutateAsync: sharePlan } = useFeedBack()

  const mod = async (id: number) => {
    Mod(id)
  }

  const confirm = (item: any) => {
    mod(item.id).then(() => message.success('已读'))
  }

  const cancel = () => {
    message.error('取消');
  }

  const isStatus = (item: any) => {
    switch (item.state) {
      case 0:
        return (
          <span>
            <Popconfirm
              title={`是否已经读取：${item.title}`}
              onConfirm={() => confirm(item)}
              onCancel={cancel}
              okText="是"
              cancelText="否"
            >
              <Button type={"link"}>已读</Button>
            </Popconfirm>
          </span>
        )

      case 1:
        return (
          <span>
            <Button disabled type={"link"}>已读</Button>
          </span>
        )

      case 2:
        return (
          <span>
            <Button disabled type={"link"}>已读</Button>
          </span>
        )
      default:
        break;
    }
  }

  const isFankui = (status: number, item: any) => {
    if (status === 2 && item.type === 10) {
      return <Button type={"link"} disabled>已反馈</Button>
    }
    else if (status === 3 && item.type === 10) {
      return <Button style={{ color: "red" }} type={"link"} disabled>已取消</Button>
    }
    else if (status !== 2 && item.type === 10) {
      return <Button type={"link"} onClick={() => {
        setId(item.shareId)
        setShareVisible(true)
      }}>反馈</Button>
    }
  }

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setPagination({ ...pagination, index: p.current, size: p.pageSize })
  };

  const handleOk = (value: any) => {
    sharePlan({ ...value, shareId: id }).then(() => {
      message.success("反馈成功")
      handleCancel()
    }).catch((err) => {
      message.error(err.msg)
    })
  }

  const handleCancel = () => {
    form.resetFields()
    setShareVisible(false)
  }

  return (
    <Modal
      keyboard={false}
      maskClosable={false}
      width={1200}
      visible={ModalOpen}
      onCancel={close}
      footer={false}
      title={"事务通知"}>
      <div>
        <Form.Item>
          <Button type="primary" onClick={start} disabled={!hasSelected} loading={mutaLoading}>
            批量已读
          </Button>
        </Form.Item>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
        </span>
      </div>
      <Table
        columns={
          [
            {
              title: '标题',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: '时间',
              dataIndex: 'createTime',
              key: 'createTime',
            },
            {
              title: '通知内容',
              dataIndex: 'content',
              key: 'content',
              ellipsis: true,
            },
            {
              title: '操作',
              render: (item) => (
                <>
                  <span>{
                    isStatus(item)
                  }</span>
                  <span>
                    {
                      isFankui(item.state, item)
                    }
                  </span>
                </>
              )
            },
          ]
        }
        size="small"
        loading={isLoading}
        dataSource={data?.data}
        pagination={{
          total: data?.count,
          current: pagination.index,
          pageSize: pagination.size
        }}
        onChange={handleTableChange}
        rowSelection={rowSelection}
        rowKey={(item) => item.id}
        locale={noData}
      />

      <Modal
        keyboard={false}
        maskClosable={false}
        title={"反馈"}
        width={800}
        visible={shareVisible}
        cancelText={"取消"}
        okText={"确定"}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              handleOk(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            })
        }}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout={"vertical"}>
          <Form.Item>
            <Form.Item
              label="是否通过"
              name="isPass"
              rules={rules}
            >
              <Radio.Group>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="备注"
              name="remark"
            >
              <TextArea rows={1} />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  )
}
