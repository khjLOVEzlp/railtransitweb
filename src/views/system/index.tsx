import styled from "@emotion/styled";
import { Outlet } from "react-router";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from '../../hook/useDocumentTitle'

interface Item {
  name: string,
  url: string
}

export const System = () => {
  const menu = JSON.parse(sessionStorage.menu).find((item: Item) => item.name === "系统管理").childMenu
  const [asid] = useState(menu)

  useDocumentTitle("系统管理")
  return (
    <SystemStyle>
      <Left>
        {
          asid.map((item: Item, index: number) => <li key={index}>
            <img src={`../../icon/${item.name}.png`} alt="" />
            <NavLink to={item.url} activeStyle={{ color: '#5A7FFA', fontWeight: 'bold' }}>{item.name}</NavLink>
          </li>)
        }
      </Left>
      <Right>
        <Outlet />
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
      width: 100%;
    }
  }
`

const Right = styled.div`
  border-radius: 14px;
  width: calc(100% - 27rem);
  height: 100%;
  margin-left: 0.5%;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`