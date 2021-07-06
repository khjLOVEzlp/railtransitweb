import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Spin, TreeSelect} from "antd";
import {useHttp} from "utils/http";
import {rules} from "utils/verification";
import {useAdd, useMod} from 'utils/system/department'
import {useDepartmentModal} from './util'

export const ModalForm = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState([]);
  const client = useHttp()
  const {ModalOpen, isLoading, close, editingDepartment, editingDepartmentId} = useDepartmentModal()
  const title = editingDepartment ? "修改" : "新增"
  const msg = editingDepartment ? () => message.success("修改成功") : () => message.success("新增成功")
  const useMutateProject = editingDepartment ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingDepartment?.data)
  }, [form, editingDepartment])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingDepartment, ...value, id: editingDepartmentId}).then(() => {
      msg()
      form.resetFields()
      close()
    })
  }

  const onChange = (value: any) => {
    form.setFieldsValue({ parentId: value })
  };

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

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={title} width={800} visible={ModalOpen} onOk={onOk} onCancel={closeModal}
           footer={[<Button key="back" onClick={closeModal}>取消</Button>,
             <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>]}
    >
      {
        isLoading ? (
          <Spin/>
        ) : (
          <Form
            form={form}
            onFinish={onFinish}
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
        )
      }
    </Modal>
  );
};