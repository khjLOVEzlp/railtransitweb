import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useHttp } from "./utils/http";
import logo from './icon/logo.png'
import notice from './icon/通知.png'
import { NavLink } from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { Button, Dropdown, Form, Input, Menu, message, Modal, Popover } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { RouterElement } from "./router";
import { useQuery } from 'react-query'
import qs from "qs";
import { rules } from "./utils/verification";
import { OperModal } from "./views/notice/OperModal";

export const PageBox = () => {
  const [menu, setMenu] = useState([])
  const client = useHttp()
  useEffect(() => {
    client(`info?type=1`, {
      method: "POST"
    }).then(res => {
      res.data.push({ name: '首页', url: '/home' })
      res.data.reverse()
      res.data.forEach((item: { [key: string]: unknown }) => {
        let { name } = item
        switch (name) {
          case '设备管理':
            item.url = '/hardware'
            break;
          case '统计分析':
            item.url = '/statistics'
            break;
          case '告警上报':
            item.url = '/alarm'
            break;
          case '作业计划':
            item.url = '/plan'
            break;
          case '人员管理':
            item.url = '/person'
            break;
          case '系统管理':
            item.url = '/system'
            break;
          default:
            break;
        }
      })
      setMenu(res.data)
      sessionStorage.setItem('menu', JSON.stringify(res.data))
    })
  }, [client])

  return (
    <Container>
      <HeaderStyle>
        <Logo>
          <div className="img">
            <img src={logo} alt="" />
          </div>
          <div className="title" onClick={() => window.location.href = window.location.origin}>
            <p>5G-NB智慧轨行区</p>
            <p>数字化维养安全管控系统</p>
          </div>
        </Logo>
        <Nav className={"NavList"}>
          {
            menu.map((item: any, index) => (
              <li key={index}><NavLink activeStyle={{ color: '#5A7FFA' }} to={item.url}>{item.name}</NavLink></li>
            ))
          }
        </Nav>
        <User />
      </HeaderStyle>
      <ContentStyle>
        <RouterElement></RouterElement>
        {/*<Routes>
          <Route path={"/home"} element={<Home/>}/>
          <Route path={"/plan/*"} element={<Plan/>}/>
          <Route path={"/alarm"} element={<Alarm/>}/>
          <Route path={"/statistics"} element={<Statistics/>}/>
          <Route path={"/hardware"} element={<Hardware/>}/>
          <Route path={"/person"} element={<Person/>}/>
          <Route path={"/system/*"} element={<System/>}/>
          <Route path={"*"} element={<Not/>}/>
          <Navigate to={window.location.pathname + "home"} replace={true}/>
        </Routes>*/}
      </ContentStyle>
    </Container>
  )
}

const User = () => {
  const { logout, user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const client = useHttp()
  const onCreate = (values: any) => {
    client(`user/editpassword?${qs.stringify(values)}`, { method: "POST" }).then(() => {
      message.success("修改成功，请重新登陆")
      setVisible(false);
      logout()
    }).catch(error => {
      message.error(error.msg)
    })
  };

  const showModal = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false)
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button type={"link"} onClick={() => {
        setModalVisible(true)
      }}>
        <img src={notice} alt="" />
      </Button>
      <OperModal visible={modalVisible} onCancel={onCancel} />
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key={"logout"}>
              <Button onClick={logout} type={"link"}>
                登出
              </Button>
            </Menu.Item>
            <Menu.Item key={"mod"}>
              <Button onClick={showModal} type={"link"}>
                修改密码
              </Button>
            </Menu.Item>
          </Menu>
        }
      >
        <Button style={{ color: '#3A3D44', fontSize: '2rem', fontWeight: 'bold' }} type={"link"}
          onClick={(e) => e.preventDefault()}>
          {user?.loginName}<DownOutlined />
        </Button>
      </Dropdown>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    }
  }, [visible])
  return (
    <Modal
      visible={visible}
      title="修改密码"
      okText="提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form}>
        <Form.Item name={"newpassword"} rules={rules}>
          <Input placeholder={"请输入新密码"} />
        </Form.Item>

        <Form.Item name={"oldpassword"} rules={rules}>
          <Input placeholder={"请输入旧密码"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Container = styled.div`
  height: 100vh;
  background: #eee;
`

const HeaderStyle = styled.header`
  height: 8.3vh;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 3rem;
  justify-content: space-between;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  > .title {
    margin-left: 1rem;
    font-size: 1.8rem;
    font-weight: bold;
    color: #5A7FFA;
    cursor: pointer;

    > p {
      width: 20rem;
      margin: 0;
    }
  }
`

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  width: 100%;
  padding: 0 10rem;
  box-sizing: border-box;
  > li {
    flex: 1;
    text-align: center;
    > a {
      display: block;
      width: 100%;
      color: #3A3D44;

    }
  }
`

const ContentStyle = styled.main`
  height: calc(100vh - 8.3vh);
  padding: 1rem 1.6rem;
  box-sizing: border-box;
`