import styled from "@emotion/styled"
import React, {useState} from "react"
import {Navigate, Route, Routes} from "react-router";

import {NavLink} from "react-router-dom"
import {PlanHistory} from "./child/planHistory";
import {PlanTemplate} from "./child/planTemplate";
import {PlanType} from "./child/planType";
import {PlanWork} from "./child/planWork";

export const Plan = () => {
  const [asid] = useState(JSON.parse(sessionStorage.menu).find((res: any) => res.name === '作业计划').childMenu)

  return (
    <PlanStyle>
      <Left>
        {
          asid.map((item: any, index: number) => <li key={index}>
            <img src={`../../icon/${item.name}.png`} alt=""/>
            <NavLink to={item.url} activeStyle={{color: '#5A7FFA', fontWeight: 'bold'}}>{item.name}</NavLink>
          </li>)
        }
      </Left>
      <Right>
        <Routes>
          <Route path={"/plan"} element={<PlanWork/>}/>
          <Route path={"/planType"} element={<PlanType/>}/>
          <Route path={"/planTemplate"} element={<PlanTemplate/>}/>
          <Route path={"/planHistory"} element={<PlanHistory/>}/>
          <Navigate to={window.location.pathname + "/plan"}/>
        </Routes>
      </Right>
    </PlanStyle>
  )
}

const PlanStyle = styled.div`
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
  align-items: center;
  padding-left: 5rem;
  box-sizing: border-box;

  > li {
    font-size: 2rem;
    cursor: pointer;
    width: 100%;
    align-items: center;
    display: flex;
    height: 6rem;

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