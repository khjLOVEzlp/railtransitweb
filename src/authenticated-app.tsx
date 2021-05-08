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
import { useMount } from "./hook";
import { Plan } from "./views/plan";
import { Alarm } from "./views/alarm";
import { Person } from "./views/person";
import { Hardware } from "./views/hardware";

export const AuthenticatedApp = () => {
  const [menu, setMenu] = useState([])
  const [menuList] = useState([
    {
      name: '首页',
      path: '/home'
    },
    {
      name: '作业计划',
      path: '/plan'
    },
    {
      name: '告警上报',
      path: '/alarm'
    },
    {
      name: '人员管理',
      path: '/person'
    },
    {
      name: '设备管理',
      path: '/hardware'
    },
    {
      name: '系统管理',
      path: '/system'
    },
  ])
  const client = useHttp()
  useMount(() => {
    client(`info?type=1`, {
      method: "POST"
    }).then(res => {
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
          <div className="title">
            <p>5G-NB智慧轨行区 数字化维养安全管控系统</p>
          </div>
          <Nav>
            {/* {
            menu.map((item: any, index) => (
              <li key={index}>
                <NavLink to={item.url}>{item.name}</NavLink>
              </li>
            ))
          } */}
            {
              menuList.map((item: any, index) => (
                <li key={index}><NavLink activeStyle={{ color: '#5A7FFA' }} to={item.path}>{item.name}</NavLink></li>
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
          <Route path={"/person"} element={<Person />} />
          <Route path={"/hardware"} element={<Hardware />} />
          <Route path={"/system/*"} element={<System />} />
          <Navigate to={"/home"} />
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
        {user?.loginName}
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
  cursor: pointer;

  > .title {
    margin-left: 1rem;
    width: 20rem;
    font-size: 2rem;
    font-weight: bold;
    color: #5A7FFA;

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