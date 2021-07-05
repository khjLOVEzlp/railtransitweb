import { Button, Form, Input, Modal, Select, Spin, Tree } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../../../../utils/http";
import { rules } from "../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../hook/useResetFormOnCloseModal";
import { useDetail } from "../../../../../utils/system/role";

const { Option } = Select
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
  const [menu, setMenu] = useState([])
  const client = useHttp()

  const { data: formData, isLoading } = useDetail(id)

  const [options] = useState([
    {
      name: '所有数据权限',
      value: 1
    },
    {
      name: '本部门数据权限',
      value: 2
    },
    {
      name: '本部门及以下数据权限',
      value: 3
    },
    {
      name: '仅本人数据权限',
      value: 4
    }
  ])

  const fuc = useCallback((data: any) => {
    if (data && data.length > 0) {
      data.forEach((item: any) => {
        item.title = item.name
        item.key = item.id
        item.children = fuc(item.childMenu)
      });
    } else {
      data = []
    }
    return data
  }, [])

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue({ ...formData?.data })
  }, [formData, form, visible, type])

  const getMenuList = useCallback(() => {
    client(`menu/getAll?type=1`, { method: "POST" }).then(res => {
      setMenu(fuc(res.data))
    })
  }, [client, fuc])

  useEffect(() => {
    getMenuList()
  }, [getMenuList])

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onCheck = (checkedKeys: any) => {
    form.setFieldsValue({ menuList: checkedKeys })
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title={type} width={800}
      visible={visible} onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>取消</Button>,
        <Button key="submit" type="primary" onClick={onOk}>提交</Button>
      ]}
    >
      {
        isLoading ? <Spin /> : <Form
          form={form}
          name={type}
          labelAlign="right"
          layout={"vertical"}
        >
          <Form.Item
            label="数据权限"
            name="dataScope"
            rules={rules}
          >
            <Select>
              {options.map((item: any, index: number) => <Option value={item.value} key={index}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="资源集合"
            name="menuList"
          >
            <Tree
              checkable
              defaultCheckedKeys={formData?.data.menuList}
              onCheck={onCheck}
              treeData={menu}
            />
          </Form.Item>

          <Form.Item
            label="角色名称"
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
      }

    </Modal>
  );
};