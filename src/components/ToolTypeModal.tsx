import {Button, Popconfirm, Table} from "antd";

interface Props {
  mod: (item: any) => void
  confirm: (item: any) => void
  cancel: () => void
  total: number
  current: number
  pageSize: number
  loading: boolean
  handleTableChange: (item: any) => void
  data: any
  onSubmit: (item: object) => void
  onCancel: () => void
}

export const ToolTypeModal = ({
                                mod,
                                confirm,
                                cancel,
                                total,
                                current,
                                pageSize,
                                loading,
                                handleTableChange,
                                data,
                                onSubmit,
                                onCancel
                              }: Partial<Props>) => {
  return (
    <Table columns={
      [
        {
          title: '物资类型名称',
          dataIndex: 'name',
          key: 'name',
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
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        },
        {
          title: '操作',
          key: 'id',
          render: (item: any) => mod ? <>
            <Button type="link" onClick={() => mod?.(item)}>修改</Button>
            <Popconfirm
              title={`是否要删除${item.name}`}
              onConfirm={() => confirm?.(item)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </> : <Button type={"link"} onClick={() => {
            onSubmit?.(item)
            onCancel?.()
          }}>添加</Button>
        },
      ]
    } pagination={{total, current, pageSize}} onChange={handleTableChange}
           loading={loading} dataSource={data}
           rowKey={(item: any) => item.id}/>
  )
}