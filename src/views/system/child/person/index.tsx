import React, {useState, useEffect, useRef} from 'react';
import {Form, Input, Modal, Button, Table, Popconfirm, message, Select, Checkbox} from 'antd';
import styled from "@emotion/styled";
import {useHttp} from "../../../../utils/http";
import qs from "qs";
import {cleanObject} from "../../../../utils";
import {rules} from "../../../../utils/verification";
import {useResetFormOnCloseModal} from "../../../../hook";

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  type: string,
  formData: object
}

const ModalForm: React.FC<ModalFormProps> = ({visible, onCancel, type, formData}) => {
  const [form] = Form.useForm();

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
        initialValues={type === '修改' ? formData : {}}
        labelAlign="right"
        {...layout}
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="性别"
          name="sex"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="身份证号"
          name="identityCard"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系方式"
          name="phone"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="卡号"
          name="number"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="部门id"
          name="departmentId"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="出生日期"
          name="birthday"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="家庭住址"
          name="address"
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

export const Person = () => {
  const [visible, setVisible] = useState(false);
  const [tabList, setTabList] = useState([])
  const [type, setType] = useState('')
  const [formData, setFormData] = useState({})
  const client = useHttp()
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    name: ''
  })

  useEffect(() => {
    init()
  }, [pagination.page, pagination.name])

  const init = () => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
    }
    client(`person/list?${qs.stringify(cleanObject(param))}`, {method: "POST"}).then(res => {
      setTabList(res.data)
      setPagination({...pagination, total: res.count})
    })
  }

  const search = (item: any) => {
    setPagination({...pagination, name: item.name})
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

  const del = async (id: number | string) => {
    client(`person/delete/${id}`).then(() => {
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
    setPagination({...pagination, page})
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
        onFormFinish={(name, {values, forms}) => {
          if (name === '新增') {
            client(`person/save`, {method: "POST", body: JSON.stringify(values)}).then(() => {
              message.success('新增成功')
              setVisible(false);
            }).catch(err => {
              console.log(err.msg, 'err')
            })
          } else if (name === "修改") {
            client(`person/update`, {method: "POST", body: JSON.stringify(values)}).then(() => {
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
              label="人员名称"
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
                title: '人员名称',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
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
                    <a href="#">删除</a>
                  </Popconfirm></>
              },
            ]
          } pagination={{total: pagination.total, onChange: onChange}} dataSource={tabList}
                 rowKey={(item: any) => item.id}/>
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal}/>
      </Form.Provider>
    </>
  );
};

const Header = styled.div`
  height: 13rem;
  background: #fff;
  margin-bottom: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`

const Main = styled.div`
  background: #fff;
  height: 73rem;
  border-radius: 1rem;
  padding: 0 1.5rem;
  overflow-y: auto;
`