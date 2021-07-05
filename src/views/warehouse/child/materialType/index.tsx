import {useState} from 'react';
import {Form, Input, Button, Table, Popconfirm, message} from 'antd';
import styled from "@emotion/styled";
import {ModalForm} from "./modal/ModlaForm";
import {useAdd, useDel, useInit, useMod, useProjectsSearchParams} from 'utils/warehouse/materialType'
import {useDebounce} from "../../../../hook/useDebounce";
import {ToolTypeModal} from "../../../../components/ToolTypeModal";

export const MaterialType = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('')
  const [formData, setFormData] = useState<any>({})
  const [param, setParam] = useProjectsSearchParams()

  /* 
  增删改查
  */

  const {data, isLoading} = useInit(useDebounce(param, 500))
  const {mutateAsync: Add} = useAdd()
  const {mutateAsync: Mod} = useMod()
  const {mutateAsync: Del} = useDel()

  const search = (item: any) => {
    setParam({...param, name: item.name, index: 1})
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

  const handleTableChange = (p: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
  };

  return (
    <>
      <Form.Provider
        onFormFinish={(name, {values, forms}) => {
          if (name === '新增') {
            Add(values).then(() => {
              message.success("新增成功")
              setVisible(false);
            }).catch((error) => {
              message.error(error.msg)
            })

          } else if (name === "修改") {
            Mod({...values, id: formData.id}).then(() => {
              message.success("修改成功")
              setVisible(false);
            }).catch((error) => {
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
              <Input placeholder={"物资类型名称"} value={param.name}
                     onChange={(evt) => setParam({...param, name: evt.target.value})}/>
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
          <ToolTypeModal
            loading={isLoading}
            data={data?.data}
            cancel={cancel}
            confirm={confirm}
            current={param.index}
            handleTableChange={handleTableChange}
            total={data?.count}
            mod={mod}
            pageSize={param.size}
          />
        </Main>
        <ModalForm visible={visible} formData={formData} type={type} onCancel={hideUserModal}/>
      </Form.Provider>
    </>
  );
};

const Header = styled.div`
  height: 12.5rem;
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