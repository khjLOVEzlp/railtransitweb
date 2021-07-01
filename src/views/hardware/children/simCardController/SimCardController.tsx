import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Button, Table, Popconfirm, message, Radio, Select } from 'antd';
import styled from "@emotion/styled";
import { rules } from "../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../hook/useResetFormOnCloseModal";
import { useAdd, useDel, useInit, useMod } from './sim';
import { useWarehouse } from '../../../system/child/warehouse/warehouse';
const { Option } = Select
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

const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue(formData)
  }, [formData, form, visible, type])

  const { data: warehouse } = useWarehouse()

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
          label="设备编号"
          name="cardNo"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="流量卡号码"
          name="phone"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="类型"
          name="supplier"
          rules={rules}
        >
          <Radio.Group>
            <Radio value={"移动"}>移动</Radio>
            <Radio value={"联通"}>联通</Radio>
            <Radio value={"电信"}>电信</Radio>
            <Radio value={"其他"}>其他</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="归属仓库"
          name="warehouseId"
          rules={rules}
        >
          <Select
            showSearch
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {warehouse?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="是否使用"
          name="isUse"
        >
          <Radio.Group>
            <Radio value={"0"}>是</Radio>
            <Radio value={"1"}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="备注"
          name="operator"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const SimCardController = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('')
  const [formData, setFormData] = useState<any>({})
  const [pagination, setPagination] = useState({
    index: 1,
    size: 10,
    name: '',
    type: ''
  })

  /* 
      增删改查
    */
  const { data, isLoading } = useInit({ ...pagination })
  const { mutateAsync: Add } = useAdd()
  const { mutateAsync: Mod } = useMod()
  const { mutateAsync: Del } = useDel()

  const search = (item: any) => {
    setPagination({ ...pagination, name: item.name, index: 1 })
  };

  const add = () => {
    showUserModal()
    setType('新增')
  }

  const mod = (item: any) => {
    showUserModal()
    setType('修改')
    setFormData(item)
  }

  const del = async (id: number) => {
    Del(id)
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setPagination({ ...pagination, index: p.current, size: p.pageSize })
  };

  return (
    <>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          console.log(values);
          if (name === '新增') {
            Add(values).then(() => {
              message.success('新增成功')
              setVisible(false);
            }).catch(err => {
              message.error(err.msg)
            })
          } else if (name === "修改") {
            Mod({ ...values, id: formData.id }).then(() => {
              message.success('修改成功')
              setVisible(false);
            }).catch(err => {
              message.error(err.msg)
            })
          }
        }}
      >
        <Header>
          <Form
            name="basic"
            onFinish={search}
            layout={"inline"}
          >
            <Form.Item
              name="name"
            >
              <Input placeholder={"设备编号"} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>

          <Button onClick={() => add()}>新增</Button>
        </Header>
        <Main>
          <Table columns={
            [
              {
                title: '设备编号',
                dataIndex: 'cardNo',
                key: 'cardNo',
              },
              {
                title: '电话号码',
                dataIndex: 'phone',
                key: 'phone',
              },
              {
                title: '操作',
                key: 'id',
                render: (item: any) => <><Button type="link" onClick={() => mod(item)}>修改</Button>
                  <Popconfirm
                    title={`是否要删除${item.cardNo}`}
                    onConfirm={() => confirm(item)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type={"link"}>删除</Button>
                  </Popconfirm></>
              },
            ]
          } pagination={{ total: data?.count, current: pagination.index, pageSize: pagination.size, }} onChange={handleTableChange} loading={isLoading} dataSource={data?.data}
            rowKey={(item: any) => item.id} />
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal} />
      </Form.Provider>
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
`

const Main = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 0 1.5rem;
`