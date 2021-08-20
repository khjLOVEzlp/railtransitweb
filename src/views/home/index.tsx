import { createContext, useState, useContext } from 'react'
import styled from "@emotion/styled"
import { useDocumentTitle } from 'hook/useDocumentTitle'
import Page from './child/alarmStatistics'
import PlanWorkPage from './child/taskStatistics'
import PlanType from './child/planType'
import { Subway } from "./child/Subway";
import { Button, Card, Space } from 'antd'
import { useLine } from 'views/system/child/line/request'

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
  const [show, setShow] = useState<boolean>(true)
  const { data, isSuccess } = useLine()

  return (
    <HomeContext.Provider value={{ alarmId, setAlarmId, planId, setPlanId, taskId, setTaskId }}>
      <Container>
        <Left>
          <Title>
            <Button onClick={() => {
              setShow(!show)
            }}>{show ? "放大" : "缩小"}</Button>
          </Title>
          {
            isSuccess ? (
              <Space style={{
                position: "absolute",
                right: 0,
                bottom: "0.1rem",
                zIndex: 1000,
                height: "250px",
                overflow: "auto"
              }} direction={"vertical"}>
                {
                  data.data.map((item: any) => (
                    <Card hoverable={true} style={{ borderColor: `${item.color}`, borderWidth: '0.2rem', width: 120, padding: 0 }} bodyStyle={{ padding: 10 }}>
                      <p>{item.name}</p>
                      <p>人数：{item.personCount || "0"}</p>
                      <p>班别数：{item.classCount || "0"}</p>
                      <p>站台数：{item.platformCount || "0"}</p>
                      <p>仓库数：{item.warehouseCount || "0"}</p>
                    </Card>
                  ))
                }
              </Space>
            ) : (
              <div></div>
            )
          }
          <Subway />
        </Left>
        {
          show ? (
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
          ) : ""
        }
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
flex: 2;
margin-right: 0.5rem;
border-radius: 8px;
position: relative;
`

const Right = styled.div`
/* height: 100%; */
flex: 1;
display: flex;
justify-content: space-between;
flex-direction: column;
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
  z-index: 1000
`
