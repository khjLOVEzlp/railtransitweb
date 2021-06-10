import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../../../../../utils/http";
import qs from "qs";
import { Button, Form, Input, message, Modal, Popconfirm, Select, Table, TreeSelect } from "antd";
import styled from "@emotion/styled";
import { rules } from "../../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../../hook/useResetFormOnCloseModal";
import { useAdd, useDel, useInit, useMod } from './lineClass'

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
  const [value, setValue] = useState([]);
  const client = useHttp()
  const onChange = (value: any) => {
    console.log(value);
    form.setFieldsValue({ parentId: value })
  };

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

  useEffect(() => {
    getWarehouse()
  }, [getWarehouse])

  useEffect(() => {
    getClassList()
  }, [getClassList])

  useEffect(() => {
    if (type === "新增") return
    form.setFieldsValue(formData)
  }, [formData, form, visible, type])

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
          <TreeSelect
            style={{ width: '100%' }}
            treeData={value}
            treeDefaultExpandAll
            onChange={onChange}
          />
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
  const [visible, setVisible] = useState(false);
  const [dataForm, setDataForm] = useState<any>({})
  const [type, setType] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    name: '',
  })

  /* 
    增删改查
  */
  const { data, isLoading } = useInit({ ...pagination, index: pagination.page, lineId: formData.id })
  const { mutateAsync: Add } = useAdd()
  const { mutateAsync: Mod } = useMod()
  const { mutateAsync: Del } = useDel()

  const search = (item: any) => {
    console.log(item)
    setPagination({ ...pagination, name: item.name, page: 1 })
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

  const onChange = (page: number) => {
    setPagination({ ...pagination, page })
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

  return (
    <Contianer>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === '新增') {
            Add({ ...values, lineId: formData.id }).then(() => {
              message.success("新增成功")
              setVisible(false);
            }).catch(error => {
              message.error(error.msg)
            })
          } else if (name === "修改") {
            Mod({ ...values, id: dataForm.id, lineId: formData.id }).then(() => {
              message.success("修改成功")
              setVisible(false)
            }).catch(error => {
              message.error(error.msg)
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
          ]} pagination={{ total: data?.count, onChange: onChange }} loading={isLoading} dataSource={data?.data}
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