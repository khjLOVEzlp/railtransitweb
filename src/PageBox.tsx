import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useHttp } from "./utils/http";
import logo from './icon/logo.png'
import { Navigate, Route, Routes } from "react-router";
import { Home } from './views/home';
import { System } from "./views/system";
import { NavLink } from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { resetRoute, useMount } from "./hook";
import { Plan } from "./views/plan";
import { Alarm } from "./views/alarm";
import { Hardware } from "./views/hardware";

export const PageBox = () => {
  const [menu, setMenu] = useState([])
  const client = useHttp()
  useMount(() => {
    client(`info?type=1`, {
      method: "POST"
    }).then(res => {
      res.data.push({ name: '首页', url: '/home' })
      res.data.reverse()
      res.data[1].url = '/hardware'
      res.data[2].url = '/statistics'
      res.data[3].url = '/alarm'
      res.data[4].url = '/plan'
      res.data[5].url = '/system'
      res.data.forEach((item: any) => {
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
  })
  return (
    <Container>
      <HeaderStyle>
        <Logo>
          <div className="img">
            <img src={logo} alt="" />
          </div>
          <div className="title" onClick={resetRoute}>
            <p>5G-NB智慧轨行区 数字化维养安全管控系统</p>
          </div>
          <Nav>
            {
              menu.map((item: any, index) => (
                <li key={index}><NavLink activeStyle={{ color: '#5A7FFA' }} to={item.url}>{item.name}</NavLink></li>
              ))
            }
          </Nav>
        </Logo>
        <User />
      </HeaderStyle>
      <ContentStyle>
        <Routes>
          <Route path={"/home"} element={<Home />} />
          <Route path={"/plan/*"} element={<Plan />} />
          <Route path={"/alarm"} element={<Alarm />} />
          <Route path={"/statistics"} element={<Alarm />} />
          <Route path={"/hardware"} element={<Hardware />} />
          <Route path={"/system/*"} element={<System />} />
          <Navigate to={window.location.pathname + "/home"} />
        </Routes>
      </ContentStyle>
    </Container>
  )
}

const User = () => {
  const { logout, user } = useAuth();

  useMount(() => {
    console.log(user?.loginName)
  })
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
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
  );
};

const Container = styled.div`
  min-height: 100vh;
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
    width: 20rem;
    font-size: 2rem;
    font-weight: bold;
    color: #5A7FFA;
    cursor: pointer;
    > p {
      margin: 0;
    }
  }
`

const Nav = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-left: 18rem;

  > li {
    margin-right: 5rem;

    > a {
      color: #3A3D44;

    }
  }
`

const ContentStyle = styled.main`
  height: calc(100vh - 8.3vh);
  padding: 1rem 1.6rem;
`