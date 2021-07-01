import { Button, Form, message, Modal, Popconfirm, Radio, Table, Input } from "antd"
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { rules } from "../../utils/verification";
import { useInit, useMod, useFeedBack } from "./notice";
const { TextArea } = Input

interface Props {
  visible: boolean
  onCancel: () => void
}

export const OperModal = ({ visible, onCancel }: Props) => {
  const [shareVisible, setShareVisible] = useState(false)
  const [id, setId] = useState<number | undefined>(undefined)
  const [form] = useForm()
  const [pagination, setPagination] = useState({
    index: 1,
    size: 10
  })

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

  const columns = [
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
      render: (item: any) => (
        <>
          {
            item.state === 1 ?
              (<Button type={"link"} disabled>
                已读
              </Button>) :
              (<Popconfirm
                title={`是否已经读取：${item.title}`}
                onConfirm={() => confirm(item)}
                onCancel={cancel}
                okText="是"
                cancelText="否"
              >
                <Button type={"link"}>未读</Button>
              </Popconfirm>)
          }
          {
            item.type === 10 && item.state !== 1 ? <Button type={"link"} onClick={() => {
              setId(item.foreignId)
              setShareVisible(true)
            }}>反馈</Button> : <Button type={"link"} disabled>已反馈</Button>
          }
        </>
      )
    },
  ];

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setPagination({ ...pagination, index: p.current, size: p.pageSize })
  };

  const handleOk = (value: any) => {
    sharePlan({ ...value, planId: id }).then(() => {
      message.success("反馈成功")
      handleCancel()
    }).catch((err) => {
      message.error(err.msg)
    })
  }

  const handleCancel = () => {
    setShareVisible(false)
  }

  return (
    <Modal
      keyboard={false}
      maskClosable={false}
      width={1200}
      visible={visible}
      onCancel={onCancel}
      footer={false}
      title={"事务通知"}>
      <Table
        loading={isLoading}
        dataSource={data?.data}
        pagination={{ total: data?.count, current: pagination.index, pageSize: pagination.size }}
        onChange={handleTableChange}
        columns={columns}
        rowKey={(item: any) => item.id}
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
                <Radio value={0}>是</Radio>
                <Radio value={1}>否</Radio>
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