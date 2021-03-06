import { Form, Select } from "antd";
import { rules } from "utils/verification";
import { usePerson } from "views/person/child/personManage/request";

type Props = {
  label: string;
  name: string;
  rul?: boolean;
  width?: number;
  disabled?: boolean;
};

export const PersonSelect = ({ label, name, rul, width, disabled }: Props) => {
  const { data } = usePerson();
  return (
    <Form.Item label={label} name={name} rules={rul ? rules : []}>
      {
        <Select
          disabled={disabled}
          style={{ width }}
          showSearch
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
        >
          {data?.data.map((item: any) => (
            <Select.Option value={item.id} key={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      }
    </Form.Item>
  );
};
