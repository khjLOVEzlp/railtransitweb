import { Button, Form, Input, Modal, Tree } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../../../../utils/http";
import { rules } from "../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";
/*const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};*/

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: object
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();
  const [departmentList, setDepartmentList] = useState([])
  const client = useHttp()

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue(formData)
  }, [formData, form, visible, type])

  const getDepartmentList = useCallback(() => {
    client(`department/getAll`).then(res => {
      const fuc = (data: any) => {
        if (data && data.length > 0) {
          data.forEach((item: any) => {
            item.title = item.name
            item.key = item.id
            item.children = fuc(item.departmentList)
          });
        } else {
          data = []
        }

        return data

      }

      setDepartmentList(fuc(res.data))

    })


  }, [client])

  useEffect(() => {
    getDepartmentList()
  }, [getDepartmentList])

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onCheck = (checkedKeys: any) => {
    form.setFieldsValue({ departmentIds: checkedKeys })
  };

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
          label="管辖部门"
          name="departmentIds"
          rules={rules}
        >
          {/* <Select>
            {departmentList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select> */}

          <Tree
            checkable
            defaultCheckedKeys={[]}
            onCheck={onCheck}
            treeData={departmentList}
          />
        </Form.Item>

        <Form.Item
          label="线路名称"
          name="name"
          rules={rules}
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