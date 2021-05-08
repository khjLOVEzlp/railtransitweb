import styled from "@emotion/styled";
import { Navigate, Route, Routes } from "react-router";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "./child/user";
import { Role } from "./child/role";
import { Menu } from "./child/menu";
import { Log } from "./child/log";
import { Department } from "./child/department";
import { DataDictionary } from "./child/dataDictionary";
import { Person } from "./child/person";
import { Warehouse } from "./child/warehouse";
import { MaterialType } from "./child/materialType";
import { Temperature } from "./child/temperature";
export const System = () => {
  const [asid] = useState(JSON.parse(sessionStorage.menu).find((res: any) => res.name === "系统管理").childMenu)
  return (
    <SystemStyle>
      <Left>
        {
          asid.map((item: any, index: number) => <li key={index}>
            <img src={`../../icon/${item.name}.png`} alt="" />
            <NavLink to={item.url} activeStyle={{ color: '#5A7FFA', fontWeight: 'bold' }}>{item.name}</NavLink>
          </li>)
        }
      </Left>
      <Right>
        <Routes>
          <Route path={"/user"} element={<User />} />
          <Route path={"/role"} element={<Role />} />
          <Route path={"/menu"} element={<Menu />} />
          <Route path={"/log"} element={<Log />} />
          <Route path={"/dataDictionary"} element={<Department />} />
          <Route path={"/department"} element={<DataDictionary />} />
          <Route path={"/person"} element={<Person />} />
          <Route path={"/line"} element={<User />} />
          <Route path={"/warehouse"} element={<Warehouse />} />
          <Route path={"/materialType"} element={<MaterialType />} />
          <Route path={"/temperature"} element={<Temperature />} />
          <Navigate to={window.location.pathname + "/user"} />
        </Routes>
      </Right>
    </SystemStyle>
  )
}

const SystemStyle = styled.div`
  display: flex;
  height: 100%;
`

const Left = styled.div`
  width: 27rem;
  background: #FFFFFF;
  border-radius: 14px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-left: 5rem;
  box-sizing: border-box;
  > li {
    font-size: 2rem;
    cursor: pointer;
    width: 100%;
    align-items: center;
    display: flex;
    flex: 1;
    > a {
    color: #747A89;
    margin-left: 1rem;
    }
  }
`

const Right = styled.div`
  border-radius: 14px;
  width: calc(100% - 27rem);
  height: 100%;
  margin-left: 0.5%;
`