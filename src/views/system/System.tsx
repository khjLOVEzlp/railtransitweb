import styled from "@emotion/styled";
import {useMount} from "../../hook";
import {Navigate, Route, Routes} from "react-router";
import {Home} from "../home";
import React from "react";

export const System = () => {
  const asid = JSON.parse(sessionStorage.menu)

  useMount(() => {
    console.log(    asid.find((res: any) => res.name === "系统管理").childMenu
    )
  })
  return (
    <SystemStyle>
      <Left>
        {
          asid.find((res: any) => res.name === "系统管理").childMenu.map((item: any, index: number) => <li key={index}>
            {item.name}
          </li>)
        }
      </Left>
      <Right>
        <Routes>
          <Route path={"/system/user"} element={<Home/>}/>
          <Navigate to={"/system"}/>
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
  > li {
    font-size: 2rem;
    color: #747A89;
    cursor: pointer;
  }
`

const Right = styled.div`
  border-radius: 14px;
  width: calc(100% - 27rem);
  height: 100%;
  background: #FFFFFF;
  margin-left: 0.5%;
`