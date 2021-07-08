import {Button, Form, Input, message, Modal, Spin, TreeSelect} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "utils/http";
import {rules} from "utils/verification";
import {useLineModal} from '../util'
import {useAdd, useMod} from "utils/system/line";

export const ModalForm = () => {
  const [form] = Form.useForm();
  const [departmentList, setDepartmentList] = useState([])
  const client = useHttp()
  const {ModalOpen, isLoading, close, editingLine, editingLineId, startAdd} = useLineModal()
  const title = editingLine ? "修改" : "新增"
  const msg = editingLine ? () => message.success("修改成功") : () => message.success("新增成功")
  const useMutateProject = editingLine ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingLine?.data)
  }, [form, editingLine])

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

  const onOk = () => {
    form.submit();
  };

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingLine, ...value, id: editingLineId}).then((res) => {
      if (res.code === 200) {
        msg()
        form.resetFields()
        close()
        startAdd()
      } else {
        message.error(res.msg)
      }
    })
  }

  return (
    <Modal
      title={title}
      width={800}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>取消</Button>,
        <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>
      ]}
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
              label="管辖部门"
              name="departmentIds"
              rules={rules}
            >
              <TreeSelect
                showSearch
                style={{width: '100%'}}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                allowClear
                multiple
                treeData={departmentList}
              />
            </Form.Item>

            <Form.Item
              label="地铁线路名称"
              name="name"
              rules={rules}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="备注"
              name="remark"
            >
              <Input/>
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};