import { Form, TreeSelect } from "antd"
import { useInit } from 'views/system/child/department/request'
export const DepartmentTreeSelect = ({ label, name, change, rul }: any) => {
  const { data } = useInit()
  const onChange = (value: any) => {
    change(123)
    change(value)
  }
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[]}
    >
      <TreeSelect
        treeData={data?.data}
        treeDefaultExpandAll
        onChange={onChange}
      />
    </Form.Item>
  )
}