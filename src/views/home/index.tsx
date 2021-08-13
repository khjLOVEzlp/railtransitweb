import { createContext, useState, useContext } from 'react'
import styled from "@emotion/styled"
import { useDocumentTitle } from 'hook/useDocumentTitle'
import Page from './child/alarmStatistics'
import PlanWorkPage from './child/taskStatistics'
import PlanType from './child/planType'
import { Subway } from "./child/Subway";

const HomeContext = createContext<
  {
    alarmId: number | undefined
    setAlarmId: (alarmId: number | undefined) => void
    planId: number | undefined
    setPlanId: (planId: number | undefined) => void
    taskId: number | undefined
    setTaskId: (taskId: number | undefined) => void
  } | undefined
>(undefined)

export const Home = () => {
  useDocumentTitle('首页')
  const [alarmId, setAlarmId] = useState<number | undefined>(undefined)
  const [planId, setPlanId] = useState<number | undefined>(undefined)
  const [taskId, setTaskId] = useState<number | undefined>(undefined)

  return (
    <HomeContext.Provider value={{ alarmId, setAlarmId, planId, setPlanId, taskId, setTaskId }}>
      <Container>
        <Left>
          <Subway />
        </Left>
        <Right>
          <div className="top">
            {/*告警统计*/}
            <Title>告警统计</Title>
            <Page />
          </div>

          {/*计划统计*/}
          <div className="main">
            <Title>计划统计</Title>
            <PlanType />

          </div>
          {/*作业统计*/}
          <div className="bottom">
            <Title>作业统计</Title>
            <PlanWorkPage />
          </div>
        </Right>
      </Container>
    </HomeContext.Provider>
  )
}

export const useHomeContext = () => {
  const context = useContext(HomeContext)
  if (!context) {
    throw new Error("useHomeContext必须在Home组件中使用")
  }
  return context
}

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* background: #eee; */
`

const Left = styled.div`
height: 100%;
background: #fff;
width: 59.8%;
border-radius: 8px;
`

const Right = styled.div`
width: 39.8%;
height: 100%;
display: flex;
justify-content: space-between;
flex-direction: column;
overflow-y: auto;
> * {
  height: 100%;
  background: #fff;
  border-radius: 8px;
  position: relative;
}

> .main {
  margin: 0.5rem 0;
}
`

const Title = styled.h3`
  padding: 1rem;
  font-weight: 800;
  position: absolute;
  left: 0.1rem;
  top: 0.1rem;
`

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;

//   > .left {
//     /* height: 50vh; */
//     background: #FFFFFF;
//     border-radius: 14px;
//     width: 69%;
//     box-sizing: border-box;
//     overflow: hidden;
//     position: relative;

//     > .data {
//       display: flex;
//       align-items: center;
//       justify-content: space-around;
//       flex-direction: column;

//       > li {
//         display: flex;
//         align-items: center;
//         font-size: 1.8rem;
//         color: #3A3D44;

//         > .count {
//           margin-left: 1rem;
//           color: #5A7FFA;
//           font-size: 3rem;
//         }
//       }
//     }

//     > .title {
//       width: 100%;
//       text-align: center;
//       font-size: 2rem;
//       font-weight: bold;
//       color: #989EAC;
//     }
//   }

//   > .right {
//     height: 50vh;
//     background: #FFFFFF;
//     border-radius: 14px;
//     width: 30.5%;
//     box-sizing: border-box;
//     position: relative;

//     > .title {
//       margin-left: 2rem;
//       font-size: 2rem;
//       font-weight: bold;
//       color: #3A3D44;
//     }
//   }
// `

// const Footer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   > .left {
//     height: 39vh;
//     background: #fff;
//     border-radius: 14px;
//     width: 49.8%;
//     box-sizing: border-box;
//     position: relative;

//     > .title {
//       margin-left: 2rem;
//       font-size: 2rem;
//       font-weight: bold;
//       color: #3A3D44;
//     }
//   }

//   > .right {
//     height: 39vh;
//     background: #fff;
//     border-radius: 14px;
//     width: 49.8%;
//     box-sizing: border-box;
//     position: relative;
//   }
// `