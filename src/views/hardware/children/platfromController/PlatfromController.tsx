import React, {useState, useEffect, useCallback} from 'react';
import {Form, Input, Modal, Button, Table, Popconfirm, message, Radio} from 'antd';
import styled from "@emotion/styled";
import {useResetFormOnCloseModal} from "../../../../hook";
import {useHttp} from "../../../../utils/http";
import {cleanObject} from "../../../../utils";
import {rules} from "../../../../utils/verification";

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
  const [value, setValue] = useState(0);
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
        initialValues={type === '修改' ? formData : {}}
        labelAlign="right"
        {...layout}
      >
        <Form.Item
          label="删除理由"
          name="deleteReason"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="电量"
          name="electric"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="是否使用"
          name="isUse"
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={0}>是</Radio>
            <Radio value={1}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="电量状态"
          name="electricState"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="电量更新时间"
          name="electricTime"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="设备名称"
          name="name"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="厂商"
          name="operator"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="电话号码"
          name="phone"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="状态"
          name="status"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const PlatfromController = () => {
  const [visible, setVisible] = useState(false);
  const [tabList, setTabList] = useState([])
  const [type, setType] = useState('')
  const [formData, setFormData] = useState({})
  const client = useHttp()
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    name: '',
    type: ''
  })

  const init = useCallback(() => {
    const param = {
      index: pagination.page,
      size: pagination.size,
      name: pagination.name,
    }
    client(`hardware/platform/list`, {method: "POST", body: JSON.stringify(cleanObject(param))}).then(res => {
      setTabList(res.data)
      setPagination({...pagination, total: res.count})
    })
  }, [client, pagination.page, pagination.name, pagination.type])

  useEffect(() => {
    init()
  }, [init])

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
    client(`hardware/platform/delete/${id}`).then(() => {
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
            client(`hardware/platform/save`, {method: "POST", body: JSON.stringify(values)}).then(() => {
              message.success('新增成功')
              setVisible(false);
            }).catch(err => {
              console.log(err.msg, 'err')
            })
          } else if (name === "修改") {
            client(`hardware/platform/update`, {method: "POST", body: JSON.stringify(values)}).then(() => {
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
              <Input/>
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
                title: '设备名称',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '在线状态',
                key: 'status',
                render: (status: number | string) => status === 0 ? '离线' : '在线'
              },
              {
                title: '厂商',
                dataIndex: 'operator',
                key: 'operator',
              },
              {
                title: '是否可使用',
                key: 'isUse',
                render: (isUse: number | string) => isUse === 0 ? '不可用' : '可用'
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
          } pagination={{total: pagination.total, onChange: onChange}} dataSource={tabList}
                 rowKey={(item: any) => item.id}/>
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal}/>
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