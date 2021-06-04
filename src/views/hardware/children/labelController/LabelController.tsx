import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Modal, Button, Table, Popconfirm, message, Radio } from 'antd';
import styled from "@emotion/styled";
import { useHttp } from "../../../../utils/http";
import { cleanObject } from "../../../../utils";
import { rules } from "../../../../utils/verification";
import { useResetFormOnCloseModal } from "../../../../hook/useResetFormOnCloseModal";

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
  const [value, setValue] = useState(0);
  const data = type === "修改" ? formData : ""

  useEffect(() => {
    form.setFieldsValue(data)
  }, [data, form])

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

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
          label="十进制编码"
          name="codeHex10"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="915编码"
          name="codeHex915"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="是否使用"
          name="isUse"
          rules={rules}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={0}>是</Radio>
            <Radio value={1}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="状态"
          name="status"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="仓库主键"
          name="warehouseId"
          rules={rules}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const LabelController = () => {
  const [visible, setVisible] = useState(false)
  const [tabList, setTabList] = useState([])
  const [type, setType] = useState('')
  const [formData, setFormData] = useState({})
  const client = useHttp()
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    name: '',
    type: ''
  })

  const [total, setTotal] = useState(0)

  const init = useCallback(() => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
    }
    client(`hardware/label/list`, { method: "POST", body: JSON.stringify(cleanObject(param)) }).then(res => {
      setTabList(res.data)
      setTotal(res.count)
    })
  }, [client, pagination])

  useEffect(() => {
    init()
  }, [init])

  const search = (item: any) => {
    setPagination({ ...pagination, name: item.name })
  }

  const add = () => {
    showUserModal()
    setType('新增')
  }

  const mod = (item: any) => {
    showUserModal()
    setType('修改')
    setFormData(item)
  }

  const del = async (id: number | string) => {
    client(`hardware/label/delete/${id}`).then(() => {
      init()
    })
  }

  const confirm = (item: any) => {
    del(item.id).then(() => message.success('删除成功'))
  }

  const cancel = () => {
    message.error('取消删除');
  }

  const onChange = (page: number) => {
    setPagination({ ...pagination, page })
  }

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  return (
    <>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === '新增') {
            client(`hardware/label/save`, { method: "POST", body: JSON.stringify(values) }).then(() => {
              message.success('新增成功')
              setVisible(false);
            }).catch(err => {
              console.log(err.msg, 'err')
            })
          } else if (name === "修改") {
            client(`hardware/label/update`, { method: "POST", body: JSON.stringify(values) }).then(() => {
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

          <Button onClick={() => add()}>新增</Button>
        </Header>
        <Main>
          <Table columns={
            [
              {
                title: '十进制编码',
                dataIndex: 'codeHex10',
                key: 'codeHex10',
              },
              {
                title: '915编码',
                dataIndex: 'codeHex915',
                key: 'codeHex915',
              },
              {
                title: '操作',
                key: 'id',
                render: (item: any) => <><Button type="link" onClick={() => mod(item)}>修改</Button>
                  <Popconfirm
                    title={`是否要删除${item.name}`}
                    onConfirm={() => confirm(item)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type={"link"}>删除</Button>
                  </Popconfirm></>
              },
            ]
          } pagination={{ total, onChange: onChange }} dataSource={tabList}
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
  height: 73rem;
  border-radius: 1rem;
  padding: 0 1.5rem;
  overflow-y: auto;
`