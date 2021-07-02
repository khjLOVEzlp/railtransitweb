import React, { useCallback, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Radio, Select, Space, TreeSelect } from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from "dayjs";
import { useHttp } from "../../../../../utils/http";
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";
import { rules } from "../../../../../utils/verification";
import { useAllRfi } from "../../../../../utils/hardware/rfi";
const { Option } = Select

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState()
  const client = useHttp()

  const { data } = useAllRfi()

  useEffect(() => {
    if (type === "新增") return
    console.log(formData);
    form.setFieldsValue(formData)
  }, [formData, form, visible, type])

  const getDepartmentList = useCallback(() => {
    client(`department/getAll`).then(res => {
      const fuc = (data: any) => {
        if (data && data.length > 0) {
          data.forEach((item: any) => {
            item.title = item.name
            item.value = item.id
            item.children = fuc(item.departmentList)
          });
        } else {
          data = []
        }
        return data
      }
      setValue(fuc(res.data))
    })


  }, [client])

  useEffect(() => {
    getDepartmentList()
  }, [getDepartmentList])

  const birthday = (obj: any | null, time: string) => {
    form.setFieldsValue({ birthday: time })
  }

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onChange = (value: any) => {
    form.setFieldsValue({ departmentId: value })
  };

  const disabledDate = (current: any) => {
    return current && current > dayjs().endOf('day');
  }

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={type} width={800} visible={visible} onOk={onOk} onCancel={onCancel}
      footer={[<Button key="back" onClick={onCancel}>取消</Button>,
      <Button key="submit" type="primary" onClick={onOk}>提交</Button>]}
    >
      <Form
        form={form}
        name={type}
        labelAlign="right"
        layout={"vertical"}
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="性别"
          name="sex"
          rules={rules}
        >
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="身份证号"
          name="identityCard"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系方式"
          name="phone"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="员工卡号"
          name="number"
          rules={rules}
        >
          <Select
            showSearch
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {data?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.rfid}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="归属部门"
          name="departmentId"
          rules={rules}
        >
          <TreeSelect
            style={{ width: '100%' }}
            treeData={value}
            treeDefaultExpandAll
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          label="出生日期"
          name="birthday"
        >
          <Space direction="vertical" style={{ width: "30rem" }}>
            <DatePicker disabledDate={disabledDate} locale={locale} onChange={birthday} />
          </Space>
        </Form.Item>

        <Form.Item
          label="家庭住址"
          name="address"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};