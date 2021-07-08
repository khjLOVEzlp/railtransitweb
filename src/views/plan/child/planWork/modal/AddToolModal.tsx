import {ToolTypeModal} from "components/ToolTypeModal";
import {Form, Input, Modal} from "antd";
import {useInit, useProjectsSearchParams} from 'utils/warehouse/materialType'
import {useDebounce} from "hook/useDebounce";
import {useAddToolModal} from '../util'

export const AddToolModal = () => {
  const [param, setParam] = useProjectsSearchParams()
  const {data, isLoading} = useInit(useDebounce(param, 500))
  const {ModalOpen, close} = useAddToolModal()
  const handleTableChange = (p: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
  };
  return (
    <Modal
      width={800}
      title={"添加工具"}
      visible={ModalOpen}
      onCancel={close}
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
        onCancel={close}
      />
    </Modal>
  )
}