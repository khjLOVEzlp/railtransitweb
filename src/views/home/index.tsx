import styled from "@emotion/styled"
import {useCallback, useEffect, useState} from "react";
import {useDocumentTitle} from 'hook/useDocumentTitle'
import {useHttp} from "utils/http";
import Page from './alarmPage'
import PlanWorkPage from './planWork'
import * as echarts from 'echarts';
import PlanType from './planType'
import {MyEcharts} from "components/MyEcharts";
import {option} from './subwayRoute'

export const Home = () => {
  const [data, setData] = useState([])
  useDocumentTitle('首页')

  useEffect(() => {
    echarts.init(document.getElementById('track') as HTMLElement).setOption(option)
  })

  const client = useHttp()

  const getAlertData = useCallback(() => {
    client(`alarm/statistic/list`, {method: "POST", body: JSON.stringify({})}).then(res => {
      res.data.forEach((key: { [key in string]: unknown }) => {
        key["star"] = key.num
        key["name"] = key.title
      })
      setData(res.data)
    })
  }, [client])

  useEffect(() => {
    getAlertData()
  }, [getAlertData])

  return (
    <Container>
      <Header>
        <div className="left">
          <MyEcharts id="track" data={option} style={{width: '100%', height: '100%'}}/>
        </div>
        <div className="right">
          <div>
            <Page data={data}/>
          </div>
        </div>
      </Header>
      <Footer>
        <div className="left">
          <div>
            <PlanType/>
          </div>
        </div>
        <div className="right">
          {/* <div className="title">
            作业统计
          </div>
          <MyEcharts id="task" data={taskData} style={{ width: '100%', height: '30rem' }} /> */}
          <div>
            <PlanWorkPage/>
          </div>
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
    padding: 2rem;
    box-sizing: border-box;

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

    > .title {
      margin-left: 2rem;
      font-size: 2rem;
      font-weight: bold;
      color: #3A3D44;
    }
  }
`