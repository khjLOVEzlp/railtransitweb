import styled from "@emotion/styled"
import { useCallback, useEffect, useState } from "react";
import { useDocumentTitle } from '../../hook/useDocumentTitle'
import { track, options, task } from './subwayRoute'
import { MyEcharts } from "../../components/MyEcharts";
import { useHttp } from "../../utils/http";
import { Steps } from 'antd';
import { DownCircleOutlined } from '@ant-design/icons';
import { useLineIndex } from "./home";
import Page from './alarmPage'
import PlanWorkPage from './planWork'
import PlanType from './planType'

export const Home = () => {
  const [data, setData] = useState([])
  useDocumentTitle('首页')

  const client = useHttp()

  const getAlertData = useCallback(() => {
    client(`alarm/statistic/list`, { method: "POST", body: JSON.stringify({ index: 1, size: 10 }) }).then(res => {
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

  const { data: lineList } = useLineIndex()

  return (
    <Container>
      <Header>
        <div className="left">
          {/* {
            lineList?.data.map((item: any) => (
              <div key={item.id} style={{ height: "12.3rem", border: '1px solid #ccc', width: "100%", borderRadius: "5px", marginBottom: "2rem", padding: "1rem", boxSizing: "border-box" }}>
                <div style={{ marginBottom: "0.3rem" }}>地铁线名称：<span style={{ fontSize: '16px', color: "#4ab4ff" }}>{item?.name || "无"}</span></div>
                <div style={{ marginBottom: "0.3rem" }}>
                  <span style={{ marginRight: "1rem" }}>班别数：<span style={{ fontSize: '16px', color: "#4ab4ff" }}>{item?.classCount || "无"}</span></span>
                  <span style={{ marginRight: "1rem" }}>仓库数：<span style={{ fontSize: '16px', color: "#4ab4ff" }}>{item?.warehouseCount || "无"}</span></span>
                  <span style={{ marginRight: "1rem" }}>站台数：<span style={{ fontSize: '16px', color: "#4ab4ff" }}>{item?.platformCount || "无"}</span></span>
                </div>
                <Steps>
                  {
                    item.platformList.map((key: any) => (
                      < Step status="finish" title={key.name} icon={<DownCircleOutlined />} />
                    ))
                  }
                </Steps>
              </div>
            ))

          } */}


        </div>
        <div className="right">
          {/* <div className="title">
            告警展示
          </div> */}
          {/* <MyEcharts id="alert" data={alertData} style={{ width: '100%', height: '50vh' }} /> */}
          <Page data={data} />
        </div>
      </Header>
      <Footer>
        <div className="left">
          {/* <div className="title">
            计划统计
          </div>
          <MyEcharts id="plan" data={planData} style={{ width: '80%', height: '30rem' }} /> */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <PlanWorkPage />
            <div></div>
          </div>
        </div>
        <div className="right">
          {/* <div className="title">
            作业统计
          </div>
          <MyEcharts id="task" data={taskData} style={{ width: '100%', height: '30rem' }} /> */}
          <PlanType />
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
    padding: 1rem;
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

    //> .title {
    //  margin-left: 2rem;
    //  font-size: 2rem;
    //  font-weight: bold;
    //  color: #3A3D44;
    //}
  }

  > .right {
    height: 50vh;
    background: #FFFFFF;
    border-radius: 14px;
    width: 35.5%;
    box-sizing: border-box;

    > .title {
      margin-left: 2rem;
      font-size: 2rem;
      font-weight: bold;
      color: #3A3D44;
    }
  }
`

const Line = styled.div`
  height: "12.3rem";
  border: '1px solid #ccc';
  width: "100%";
  border-radius: "5px";
  margin-bottom: "2rem";
  padding: "1rem";
  box-sizing: "border-box";
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

    > .title {
      margin-left: 2rem;
      font-size: 2rem;
      font-weight: bold;
      color: #3A3D44;
    }
  }
`