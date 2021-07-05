import {ToolTypeModal} from "../../../../../components/ToolTypeModal";
import {Form, Input, Modal} from "antd";
import {useInit, useProjectsSearchParams} from 'utils/warehouse/materialType'
import {useDebounce} from "../../../../../hook/useDebounce";

interface Props {
  visible: boolean
  onCancel: () => void
  title: string
  onSubmit: (item: object) => void
}

export const AddToolModal = ({visible, onCancel, title, onSubmit}: Props) => {
  const [param, setParam] = useProjectsSearchParams()
  const {data, isLoading} = useInit(useDebounce(param, 500))

  const handleTableChange = (p: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
  };
  return (
    <Modal
      width={800}
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={false}
    >
      <Form>
        <Form.Item
          label={""}
          name={"name"}
        >
          <Input
            placeholder={"物资类型名称"}
            value={param.name}
            onChange={(evt) =>
              setParam({...param, name: evt.target.value})}
          />
        </Form.Item>
      </Form>
      <ToolTypeModal
        pageSize={param.size}
        total={data?.count}
        handleTableChange={handleTableChange}
        current={param.index}
        loading={isLoading}
        data={data?.data}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}