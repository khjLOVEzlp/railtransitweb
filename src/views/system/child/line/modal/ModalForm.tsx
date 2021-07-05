import { Button, Form, Input, Modal, Spin, TreeSelect } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../../../../utils/http";
import { rules } from "../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";
import { useDetail } from "../../../../../utils/system/line";
/*const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};*/

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  id: number | undefined
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, id }) => {
  const [form] = Form.useForm();
  const [departmentList, setDepartmentList] = useState([])
  const client = useHttp()

  const { data: formData, isLoading } = useDetail(id)

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue(formData?.data)
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

  const onOk = () => {
    form.submit();
  };

  const cancel = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <Modal title={type} width={800} visible={visible} onOk={onOk} onCancel={cancel}
      footer={[<Button key="back" onClick={onCancel}>取消</Button>,
      <Button key="submit" type="primary" onClick={onOk}>提交</Button>]}
    >
      {
        isLoading ? (
          <Spin />
        ) : (
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
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                allowClear
                multiple
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
        )
      }
    </Modal>
  );
};