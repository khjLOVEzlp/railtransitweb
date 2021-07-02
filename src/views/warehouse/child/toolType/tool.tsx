import { Button, Drawer, Form, message, Table } from "antd"
import { useState } from "react"
import { ToolModalForm } from "./modal/ToolModalForm"
import { useMaterial, useModMaterial } from "../../../../utils/warehouse/toolType"
interface Props {
  visible: boolean
  onClose: () => void
  formData: any
}
export const Tool = ({ visible, onClose, formData }: Props) => {
  const { data, isLoading } = useMaterial({ id: formData.id })
  const [visibleDetail, setVisibleDetail] = useState(false)

  const { mutateAsync } = useModMaterial()

  const detail = (item: any) => {
    setVisibleDetail(true)
  }

  const onCancel = () => {
    setVisibleDetail(false)
  }
  return (
    <Drawer
      width={'100%'}
      title="工具"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          mutateAsync({ ...values, id: formData.id, type: formData.type }).then(() => {
            message.success("修改成功")
            onCancel()
          }).catch(error => {
            message.error(error.msg)
          })
        }}
      >
        <Table dataSource={data?.data
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
              <Button type={"link"} onClick={() => detail(item)}>详情</Button>
            </>
          }
        ]} loading={isLoading} rowKey={item => item.id} />

        <ToolModalForm visible={visibleDetail} onCancel={onCancel} formData={formData} />
      </Form.Provider>
    </Drawer>
  )
}