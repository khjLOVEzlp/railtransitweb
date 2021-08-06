import { Button, Drawer, Table } from "antd"
import { noData } from "utils/verification"
import { ToolModalForm } from "./modal/ToolModalForm"
import { useViewTool, useToolModal } from './util'

export const Tool = () => {
  const { ModalOpen, close, viewTool, isLoading, editId } = useViewTool()
  const { startEdit } = useToolModal()
  return (
    <Drawer
      width={800}
      title="工具"
      placement="right"
      onClose={close}
      visible={ModalOpen}
    >
      <Table dataSource={viewTool?.data
      } columns={[
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '数量',
          dataIndex: 'count',
          key: 'count',
        },
        {
          title: '性能指标',
          dataIndex: 'perfIndex',
          key: 'perfIndex',
        },
        {
          title: '规格型号',
          dataIndex: 'specsModel',
          key: 'specsModel',
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        },
        {
          title: "操作",
          render: (item: any) => <>
            <Button type={"link"} onClick={() => startEdit(item.id, Number(editId))}>详情</Button>
          </>
        }
      ]} loading={isLoading} rowKey={item => item.id}
        locale={noData}
      />

      <ToolModalForm />
    </Drawer>
  )
}