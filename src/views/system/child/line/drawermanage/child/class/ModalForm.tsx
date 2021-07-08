import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Select, Spin, TreeSelect} from "antd";
import {useHttp} from "utils/http";
import {useProjectModal} from "../../../util";
import {useAdd, useMod} from "utils/system/lineClass";
import {useWarehouse} from "utils/warehouse/toolType";
import {rules} from "utils/verification";
import {useLineClassModal} from './util'
import {useInit} from "utils/system/lineRoad";

export const ModalForm = () => {
  const [form] = Form.useForm();
  const {editingProjectId} = useProjectModal()
  const {ModalOpen, close, editingLineClass, editingLineClassId, isLoading} = useLineClassModal()
  const title = editingLineClass ? "修改" : "新增"
  const msg = editingLineClass ? () => message.success("修改成功") : () => message.success("新增成功")
  const useMutateProject = editingLineClass ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingLineClass?.data)
  }, [form, editingLineClass])

  const {data: roadList} = useInit({index: 1, size: 1000, lineId: editingProjectId})
  const {data: warehouse} = useWarehouse()

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingLineClass, ...value, id: editingLineClassId, lineId: editingProjectId}).then((res) => {
      if (res.code === 200) {
        msg()
        form.resetFields()
        close()
      } else {
        message.error(res.msg)
      }
    })
  }

  const [value, setValue] = useState([]);
  const client = useHttp()
  const onChange = (value: any) => {
    form.setFieldsValue({parentId: value})
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
              label="班别"
              name="departmentId"
              rules={rules}
            >
              <TreeSelect
                style={{width: '100%'}}
                treeData={value}
                treeDefaultExpandAll
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item
              label="区间"
              name="roadId"
              rules={rules}
            >
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {roadList?.data.map((item: any) => <Select.Option value={item.id}
                                                                  key={item.id}>{item.name}</Select.Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              label="仓库"
              name="warehouseIds"
              rules={rules}
            >
              <Select
                allowClear
                mode="multiple"
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {warehouse?.data.map((item: any, index: number) => <Select.Option value={item.roadId}
                                                                                  key={index}>{item.name}</Select.Option>)}
              </Select>
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