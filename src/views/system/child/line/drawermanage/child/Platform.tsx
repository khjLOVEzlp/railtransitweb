import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../../../../../utils/http";
import qs from "qs";
import { Button, Form, Input, message, Modal, Popconfirm, Select, Table } from "antd";
import styled from "@emotion/styled";
import { rules } from "../../../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../../../hook/useResetFormOnCloseModal";
import { useDel, useAdd, useInit, useMod, useProjectsSearchParams } from "../../../../../../utils/system/linePlatform";
import {useDebounce} from "hook/useDebounce";
import {useProjectModal} from '../../util'
const { Option } = Select

/*const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};*/

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: any,
  roadList: any
}

export const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel, type, formData, roadList }) => {
  const [form] = Form.useForm();
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
          label="路段"
          name="roadId"
          rules={rules}
        >
          <Select
            showSearch
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {roadList.map((item: any, index: number) => <Option value={item.id} key={index}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="站台名称"
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

export const Platform = () => {
  const [visible, setVisible] = useState(false);
  const [roadList, setRoadList] = useState([])
  const [dataForm, setDataForm] = useState<any>({})
  const [type, setType] = useState('')
  const [param, setParam] = useProjectsSearchParams()
  const {editingProjectId} = useProjectModal()
  /* const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: '',
  }) */

  /* 
      增删改查
    */
  const { data, isLoading } = useInit(useDebounce({ ...param, lineId: editingProjectId }, 500))
  const { mutateAsync: Add } = useAdd()
  const { mutateAsync: Mod } = useMod()
  const { mutateAsync: Del } = useDel()

  const client = useHttp()

  const getRoadList = useCallback(() => {
    client(`lineRoad/list?${qs.stringify({ index: 1, size: 1000, lineId: editingProjectId })}`, { method: "POST" }).then(res => {
      setRoadList(res.data)
    })
  }, [client, editingProjectId])

  useEffect(() => {
    getRoadList()
  }, [getRoadList])

  const search = (item: any) => {
    setParam({ ...param, name: item.name, index: 1 })
  };

  const add = () => {
    showUserModal()
    setType('新增')
  }

  const mod = (item: any) => {
    showUserModal()
    setType('修改')
    setDataForm(item)
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
            Add({ ...values, lineId: editingProjectId }).then(() => {
              message.success("新增成功")
              setVisible(false);
            }).catch(error => {
              message.error(error.msg)
            })
          } else if (name === "修改") {
            Mod({ ...values, lineId: editingProjectId, id: dataForm.id }).then(() => {
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
              label=""
              name="name"
            >
              <Input placeholder={"站台名称"} value={param.name} onChange={(evt) => setParam({ ...param, name: evt.target.value })}/>
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
              title: '站台名称',
              dataIndex: 'name',
              key: 'name',
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
              render: (item: any) => (<><Button type="link" onClick={() => mod(item)}>修改</Button><Popconfirm
                title={`是否要删除${item.name}`}
                onConfirm={() => confirm(item)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link">删除</Button>
              </Popconfirm></>)
            },
          ]} pagination={{ total: data?.count, current: param.index, pageSize: param.size }}
            onChange={handleTableChange}
            loading={isLoading}
            dataSource={data?.data}
            rowKey={(item: any) => item.id} />
          <ModalForm visible={visible} formData={dataForm} type={type} onCancel={hideUserModal} roadList={roadList} />
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