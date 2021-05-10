import styled from "@emotion/styled"
import { useDocumentTitle } from "../../hook"
import { useEffect, useState } from "react";
import * as echarts from 'echarts';
import { MyModal } from '../../components/MyModal'
import { track, mounthConfigData } from './subwayRoute'
export const Home = () => {
  const [data] = useState(track)
  const [alertData] = useState(mounthConfigData)
  useEffect(() => {
    echarts.init(document.getElementById('track') as HTMLElement).setOption(data)
    echarts.init(document.getElementById('alert') as HTMLElement).setOption(alertData)
  }, [data, alertData])
  useDocumentTitle('首页')
  return (
    <div>
      <Header>
        <div className="left">
          {/*<div className="title">*/}
          {/*  轨行图*/}
          {/*</div>*/}

          <div id="track" style={{ width: '100%', height: '100%' }}></div>
        </div>
        <div className="right">
          <div className="title">
            告警展示
          </div>

          <div id="alert" style={{ width: '60rem', height: '42rem' }}>

          </div>
        </div>
      </Header>
      <Footer>
        <div className="left">
          <div className="title">
          </div>
        </div>
        <div className="right">
          <div className="title">
            作业统计
          </div>
        </div>
      </Footer>
    </div>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  > .left {
    height: 50vh;
    background: #FFFFFF;
    border-radius: 14px;
    width: 64%;
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
    height: 50vh;
    background: #FFFFFF;
    border-radius: 14px;
    width: 35%;
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

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .left {
    height: 38vh;
    background: #FFFFFF;
    border-radius: 14px;
    width: 49.5%;
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
    height: 38vh;
    background: #FFFFFF;
    border-radius: 14px;
    width: 49.5%;
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