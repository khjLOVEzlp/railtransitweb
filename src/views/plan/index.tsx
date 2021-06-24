import styled from "@emotion/styled"
import React, { useState } from "react"
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom"
/*import {PlanType} from "./child/planType";
import {PlanWork} from "./child/planWork";
import {WorkManage} from "./child/workManage";*/
import { useDocumentTitle } from '../../hook/useDocumentTitle'

export const Plan = () => {
  const [asid] = useState(JSON.parse(sessionStorage.menu).find((res: any) => res.name === '作业计划').childMenu)

  useDocumentTitle("作业计划")
  return (
    <PlanStyle>
      <Left>
        {
          asid.map((item: any, index: number) => <li key={index}>
            <img src={`../../icon/${item.name}.png`} alt="" />
            <NavLink to={item.url} activeStyle={{ color: '#5A7FFA', fontWeight: 'bold' }}>
              {item.name}
            </NavLink>
          </li>)
        }
      </Left>
      <Right>
        <Outlet />
        {/*<Routes>
          <Route path={"planWork"} element={<PlanWork/>}/>
          <Route path={"planType"} element={<PlanType/>}/>
          <Route path={"workManage"} element={<WorkManage/>}/>
          <Navigate to={window.location.pathname + "/planWork"} replace={true}/>
        </Routes>*/}
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
  height: 100%;
  margin-left: 0.5%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`