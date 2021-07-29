import styled from "@emotion/styled"
import { useEffect, useState } from "react";
import { useDocumentTitle } from 'hook/useDocumentTitle'
import Page from './child/alarmStatistics'
import PlanWorkPage from './child/taskStatistics'
import * as echarts from 'echarts';
import PlanType from './child/planType'
import { option } from './subwayRoute'
import { Drawer } from "antd";

export const Home = () => {
  useDocumentTitle('首页')
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  /*绑定DOM*/
  useEffect(() => {
    // @ts-ignore
    let subway = window.subway

    var mysubway = subway('mysubway', {
      adcode: 4401,
      theme: "colorful",
      client: 0,
      doubleclick: {
        switch: true
      },
      easy: true
    });

    mysubway.event.on("subway.complete", function () {
    });

    //点击站点，显示此站点的信息窗体
    /* mysubway.event.on("station.touch", function (ev: any, info: any) {
      var id = info.id;
      mysubway.stopAnimation();
      mysubway.addInfoWindow(id, {});
      var center = mysubway.getStCenter(id);
      mysubway.setCenter(center);
    }); */

    // @ts-ignore
    // echarts.init(document.getElementById('track') as HTMLElement).setOption(option)
  }, [window])

  return (
    <Container>
      <Header>
        <div className="left">
          {/* <div id="track" style={{ width: '100%', height: '100%' }} onClick={() => { }} /> */}
          {/*  onClick={showDrawer} */}
          <div id="mysubway"></div>
          {/* <Drawer
            title={"地铁线路"}
            width={"100%"}
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <div id="mysubway" style={{ width: "100%", height: "100%" }}></div>
          </Drawer> */}
        </div>
        <div className="right">
          {/*告警统计*/}
          <Title>告警统计</Title>
          <div style={{ padding: "0 10rem 0" }}>
            <Page />
          </div>
        </div>
      </Header>
      <Footer>
        {/*计划统计*/}
        <div className="left">
          <Title>计划统计</Title>
          <div style={{ padding: "0 10rem 0" }}>
            <PlanType />
          </div>
        </div>
        {/*作业统计*/}
        <div className="right">
          <Title>作业统计</Title>
          <div style={{ padding: "0 10rem 0" }}>
            <PlanWorkPage />
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
const Title = styled.h3`
  padding: 2rem;
  font-size: 2rem;
  font-weight: 800;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  > .left {
    /* height: 50vh; */
    background: #FFFFFF;
    border-radius: 14px;
    width: 69%;
    box-sizing: border-box;
    overflow-y: hidden;

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
    width: 30.5%;
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
    overflow-y: auto;

    > .title {
      margin-left: 2rem;
      font-size: 2rem;
      font-weight: bold;
      color: #3A3D44;
    }
  }
`