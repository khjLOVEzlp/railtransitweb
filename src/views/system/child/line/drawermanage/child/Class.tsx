import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../../../../../utils/http";
import qs from "qs";
import { Button, Form, Input, message, Modal, Popconfirm, Select, Table } from "antd";
import styled from "@emotion/styled";
import { rules } from "../../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../../hook/useResetFormOnCloseModal";
const { Option } = Select
/*const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};*/

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: any
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData }) => {
  const [form] = Form.useForm();
  const [classList, setClassList] = useState([])
  const [warehouse, setWarehouse] = useState([])
  const client = useHttp()

  const getWarehouse = useCallback(() => {
    client(`warehouse/listAll`, { method: "POST" }).then(res => {
      setWarehouse(res.data)
    })
  }, [client])

  const getClassList = useCallback(() => {
    client(`lineClass/list?${qs.stringify({ index: 1, size: 1000, lineId: formData.id })}`, { method: "POST" }).then(res => {
      setClassList(res.data)
    })
  }, [client, formData.id])

  useEffect(() => {
    getWarehouse()
  }, [getWarehouse])

  useEffect(() => {
    getClassList()
  }, [getClassList])

  useEffect(() => {
    form.setFieldsValue(formData)
    return () => {
      form.setFieldsValue(null)
    }
  }, [formData, form])

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
          label="班别"
          name="departmentId"
          rules={rules}
        >
          <Select>
            {classList.map((item: any, index: number) => <Option value={item.departmentId} key={index}>{item.departmentName}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="仓库"
          name="warehouseId"
          rules={rules}
        >
          <Select>
            {warehouse.map((item: any, index: number) => <Option value={item.roadId} key={index}>{item.name}</Option>)}
          </Select>
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

export const Class = ({ formData }: { formData: any }) => {
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false);
  const [dataForm, setDataForm] = useState({})
  const [type, setType] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    name: '',
  })
  const [total, setTotal] = useState(0)
  const client = useHttp()

  const init = useCallback(() => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
      lineId: formData.id,
    }
    client(`lineClass/list?${qs.stringify(param)}`, { method: "POST" }).then(res => {
      setData(res.data)
      setTotal(res.count)
    })
  }, [client, pagination, formData.id])

  useEffect(() => {
    init()
  }, [init])

  const search = (item: any) => {
    console.log(item)
    setPagination({ ...pagination, name: item.name })
  };

  const add = (item: any) => {
    showUserModal()
    setType('新增')
    setDataForm(item)
    console.log(item);

  }

  const mod = (item: any) => {
    showUserModal()
    setType('修改')
    setDataForm(item)
  }

  const onChange = () => {

  }

  const del = async (id: number | string) => {
    client(`lineClass/delete/${id}`)
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功')).then(() => {
      init()
    })
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

  return (
    <Contianer>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          const value = { ...values, lineId: formData.id }
          if (name === '新增') {
            client(`lineClass/save`, { method: "POST", body: JSON.stringify(value) }).then(() => {
              message.success('新增成功')
              setVisible(false);
            }).catch(err => {
              console.log(err.msg, 'err')
            })
          } else if (name === "修改") {
            client(`lineClass/update`, { method: "POST", body: JSON.stringify(value) }).then(() => {
              message.success('修改成功')
              setVisible(false);
            }).catch(err => {
              console.log(err.msg, 'err')
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
              label="路段名称"
              name="name"
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>

          <Button onClick={() => add(formData)}>新增</Button>
        </Header>
        <Main>
          <Table columns={[
            {
              title: '班别',
              dataIndex: 'departmentName',
              key: 'departmentName',
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
            },
            {
              title: '操作',
              key: 'id',
              render: (item: any) => (<><Button type="link" onClick={() => mod(item)}>修改</Button><Popconfirm
                title={`是否要删除${item.departmentName}`}
                onConfirm={() => confirm(item)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link">删除</Button>
              </Popconfirm></>)
            },
          ]} pagination={{ total, onChange: onChange }} dataSource={data}
            rowKey={(item: any) => item.id} />
          <ModalForm visible={visible} formData={dataForm} type={type} onCancel={hideUserModal} />
        </Main>
      </Form.Provider>
    </Contianer>
  )
}

const Contianer = styled.div`
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
`

const Main = styled.div`

`