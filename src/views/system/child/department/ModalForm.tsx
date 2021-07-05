import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, Input, Modal, TreeSelect} from "antd";
import {useHttp} from "../../../../utils/http";
import {useResetFormOnCloseModal} from "../../../../hook/useResetFormOnCloseModal";
import {rules} from "../../../../utils/verification";

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState([]);
  const client = useHttp()

  const onChange = (value: any) => {
    form.setFieldsValue({ parentId: value })
  };

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

  useResetFormOnCloseModal({
    form,
    visible,
  });

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
          label="部门名称"
          name="name"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="部门归属"
          name="parentId"
        >
          <TreeSelect
            style={{ width: '100%' }}
            treeData={value}
            treeDefaultExpandAll
            onChange={onChange}
          />
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