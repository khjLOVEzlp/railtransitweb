import styled from "@emotion/styled"
import {useEffect} from "react";
import {useDocumentTitle} from 'hook/useDocumentTitle'
import Page from './child/alarmStatistics'
import PlanWorkPage from './child/taskStatistics'
import * as echarts from 'echarts';
import PlanType from './child/planType'
import {MyEcharts} from "components/MyEcharts";
import {option} from './subwayRoute'
export const Home = () => {
  useDocumentTitle('首页')

  /*绑定DOM*/
  useEffect(() => {
    echarts.init(document.getElementById('track') as HTMLElement).setOption(option)
  }, [])

  return (
    <Container>
      <Header>
        <div className="left">
          <MyEcharts id="track" data={option} style={{width: '100%', height: '100%'}}/>
        </div>
        <div className="right">
          {/*告警统计*/}
          <h3 style={{padding: "1rem"}}>告警统计</h3>
            <Page/>
        </div>
      </Header>
      <Footer>
        {/*计划统计*/}
        <div className="left">
          <h3 style={{padding: "1rem"}}>计划统计</h3>
            <PlanType/>
        </div>
        {/*作业统计*/}
        <div className="right">
          <h3 style={{padding: "1rem"}}>作业统计</h3>
            <PlanWorkPage/>
        </div>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  > .left {
    height: 50vh;
    background: #FFFFFF;
    border-radius: 14px;
    width: 64%;
    box-sizing: border-box;
    overflow-y: auto;

    > .data {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;

      > li {
        display: flex;
        align-items: center;
        font-size: 1.8rem;
        color: #3A3D44;

        > .count {
          margin-left: 1rem;
          color: #5A7FFA;
          font-size: 3rem;
        }
      }
    }

    > .title {
      width: 100%;
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      color: #989EAC;
    }
  }

  > .right {
    height: 50vh;
    background: #FFFFFF;
    border-radius: 14px;
    width: 35.5%;
    box-sizing: border-box;
    overflow-y: auto;

    > .title {
      margin-left: 2rem;
      font-size: 2rem;
      font-weight: bold;
      color: #3A3D44;
    }
  }
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .left {
    height: 39vh;
    background: #fff;
    border-radius: 14px;
    width: 49.8%;
    box-sizing: border-box;
    padding: 1rem;
    overflow-y: auto;

    > .title {
      margin-left: 2rem;
      font-size: 2rem;
      font-weight: bold;
      color: #3A3D44;
    }
  }

  > .right {
    height: 39vh;
    background: #fff;
    border-radius: 14px;
    width: 49.8%;
    box-sizing: border-box;
    padding: 1rem;
    overflow-y: auto;

    > .title {
      margin-left: 2rem;
      font-size: 2rem;
      font-weight: bold;
      color: #3A3D44;
    }
  }
`