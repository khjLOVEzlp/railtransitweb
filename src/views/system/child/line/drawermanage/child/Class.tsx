import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../../../../../utils/http";
import { Button, Form, Input, message, Modal, Popconfirm, Select, Spin, Table, TreeSelect } from "antd";
import styled from "@emotion/styled";
import { rules } from "../../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../../hook/useResetFormOnCloseModal";
import { useAdd, useDel, useDetail, useInit, useMod, useRoad, useProjectsSearchParams } from '../../../../../../utils/system/lineClass'
import { useWarehouse } from "../../../../../../utils/warehouse/toolType";
const { Option } = Select

interface ModalFormProps {
  visible: boolean
  onCancel: () => void
  type: string
  id: number | undefined
  classId: number | undefined
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, id, classId }) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState([]);
  const client = useHttp()
  const onChange = (value: any) => {
    form.setFieldsValue({ parentId: value })
  };

  const { data: formData, isLoading } = useDetail(classId)
  const { data: roadList } = useRoad({ index: 1, size: 1000, lineId: id })
  const { data: warehouse } = useWarehouse()

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
                {roadList?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.name}</Option>)}
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
                {warehouse?.data.map((item: any, index: number) => <Option value={item.roadId} key={index}>{item.name}</Option>)}
              </Select>
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

export const Class = ({ id }: { id: number | undefined }) => {
  const [visible, setVisible] = useState(false);
  const [classId, setClassId] = useState<number>()
  const [type, setType] = useState('')
  const [param, setParam] = useProjectsSearchParams()

  /* 
    增删改查
  */
  const { data, isLoading } = useInit({ ...param, lineId: id })
  const { mutateAsync: Add } = useAdd()
  const { mutateAsync: Mod } = useMod()
  const { mutateAsync: Del } = useDel()

  const search = (item: any) => {
    setParam({ ...param, departmentName: item.departmentName, index: 1, size: 10 })
  };

  const add = () => {
    showUserModal()
    setType('新增')
  }

  const mod = (id: number) => {
    showUserModal()
    setType('修改')
    setClassId(id)
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
    setParam({ ...param, index: p.current, size: p.pageSize })
  };
  return (
    <Contianer>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === '新增') {
            Add({ ...values, lineId: id }).then(() => {
              message.success("新增成功")
              setVisible(false);
            }).catch(error => {
              message.error(error.msg)
            })
          } else if (name === "修改") {
            Mod({ ...values, id, lineId: id }).then(() => {
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
              label="班别名称"
              name="departmentName"
            >
              <Input />
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
          <Table columns={[
            {
              title: "班别名称",
              dataIndex: "departmentName",
              key: "departmentName"
            },
            {
              title: '创建者',
              dataIndex: 'createBy',
              key: 'id',
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              key: 'createTime',
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
            },
            {
              title: '操作',
              key: 'id',
              render: (item: any) => (<><Button type="link" onClick={() => mod(item.id)}>修改</Button><Popconfirm
                title={`是否要删除${item.departmentName}`}
                onConfirm={() => confirm(item)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link">删除</Button>
              </Popconfirm></>)
            },
          ]} pagination={{ total: data?.count, current: param.index, pageSize: param.size }} onChange={handleTableChange} loading={isLoading} dataSource={data?.data}
            rowKey={(item: any) => item.id} />
          <ModalForm visible={visible} classId={classId} type={type} id={id} onCancel={hideUserModal} />
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