import styled from "@emotion/styled"
import { useCallback, useEffect, useState } from "react";
import { useDocumentTitle } from '../../hook/useDocumentTitle'
import { track, options, task } from './subwayRoute'
import { MyEcharts } from "../../components/MyEcharts";
import { useHttp } from "../../utils/http";
import { Steps } from 'antd';
import { DownCircleOutlined } from '@ant-design/icons';
import { useLineIndex } from "./home";
const { Step } = Steps;

export const Home = () => {
  const [data] = useState(track)
  const [alertData, setAlertData] = useState({})
  const [planData] = useState(options)
  const [taskData] = useState(task)
  useDocumentTitle('首页')
  const [list] = useState([
    {
      name: '站台数',
      count: '28'
    },
    {
      name: '班别数',
      count: '34'
    },
    {
      name: '仓库数',
      count: '30'
    },
    {
      name: '人员数',
      count: '50'
    },
  ])

  const client = useHttp()

  const getAlertData = useCallback(() => {
    client(`alarm/statistic/list`, { method: "POST", body: JSON.stringify({ index: 1, size: 10 }) }).then(res => {
      res.data.forEach((key: { [key in string]: unknown }) => {
        key["value"] = key.num
        key["name"] = key.title
      })
      const data = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "告警",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: res.data
          },
        ],
      }
      setAlertData(data)
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
          {/*<div className="title">*/}
          {/*  轨行图*/}
          {/*</div>*/}
          {/* <MyEcharts id="track" data={data} style={{ width: '80%', height: '50vh' }} />

          <div className="data">
            {
              list.map((item: { name: string, count: string }, index: number) => (
                <li key={index}>
                  <div>
                    <span className="icon">
                      <img src={`../../icon/${item.name}.png`} alt="" />
                    </span>
                    <span className="name">{item.name}</span>
                  </div>
                  <div className="count">
                    {item.count}
                  </div>
                </li>
              ))
            }
          </div> */}
          {
            lineList?.data.map((item: any) => (
              <div key={item.id} style={{ height: "12.3rem", border: '1px solid #ccc', width: "100%", borderRadius: "5px", marginBottom: "2rem", padding: "1rem", boxSizing: "border-box" }}>
                <div style={{ marginBottom: "0.3rem" }}>地铁线名称：<i style={{ fontSize: '2rem', color: "#4ab4ff" }}>{item?.name || "无"}</i></div>
                <div style={{ marginBottom: "0.3rem" }}>
                  <span style={{ marginRight: "1rem" }}>班别数：<i style={{ fontSize: '2rem', color: "#4ab4ff" }}>{item?.classCount || "无"}</i></span>
                  <span style={{ marginRight: "1rem" }}>仓库数：<i style={{ fontSize: '2rem', color: "#4ab4ff" }}>{item?.warehouseCount || "无"}</i></span>
                  <span style={{ marginRight: "1rem" }}>站台数：<i style={{ fontSize: '2rem', color: "#4ab4ff" }}>{item?.platformCount || "无"}</i></span>
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

          }


        </div>
        <div className="right">
          {/* <div className="title">
            告警展示
          </div> */}
          <MyEcharts id="alert" data={alertData} style={{ width: '100%', height: '50vh' }} />
        </div>
      </Header>
      <Footer>
        <div className="left">
          <div className="title">
            计划统计
          </div>
          <MyEcharts id="plan" data={planData} style={{ width: '80%', height: '30rem' }} />
        </div>
        <div className="right">
          <div className="title">
            作业统计
          </div>
          <MyEcharts id="task" data={taskData} style={{ width: '100%', height: '30rem' }} />
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
    padding-top: 3rem;
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
    padding-top: 3rem;
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
    padding-top: 3rem;
    box-sizing: border-box;

    > .title {
      margin-left: 2rem;
      font-size: 2rem;
      font-weight: bold;
      color: #3A3D44;
    }
  }
`