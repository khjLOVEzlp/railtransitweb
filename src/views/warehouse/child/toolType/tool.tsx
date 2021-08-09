import { Button, Drawer, Table } from "antd"
import { useAuth } from "context/auth-context"
import { noData } from "utils/verification"
import { useWareHouseContext } from "views/warehouse"
import { ToolModalForm } from "./modal/ToolModalForm"
import { useViewTool, useToolModal } from './util'

export const Tool = ({ name }: { name: string }) => {
  const { ModalOpen, close, viewTool, isLoading } = useViewTool()
  const { startEdit } = useToolModal()
  const { editId } = useWareHouseContext()
  const { editId: type } = useAuth()

  console.log(editId, type);

  return (
    <Drawer
      width={800}
      title={name}
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
            <Button type={"link"} onClick={() => startEdit(type, item.id)}>详情</Button>
          </>
        }
      ]} loading={isLoading} rowKey={item => item.id}
        locale={noData}
      />

      <ToolModalForm />
    </Drawer>
  )
}