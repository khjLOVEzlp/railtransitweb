import styled from "@emotion/styled"
import { useEffect, useState } from "react";
import { useDocumentTitle } from 'hook/useDocumentTitle'
import Page from './child/alarmStatistics'
import PlanWorkPage from './child/taskStatistics'
import * as echarts from 'echarts';
import PlanType from './child/planType'
import { option } from './subwayRoute'
import { useLine } from 'views/system/child/line/request'

export const Home = () => {
  useDocumentTitle('首页')

  const { data: lineList, isSuccess } = useLine()

  /* const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  }; */

  /*绑定DOM*/
  useEffect(() => {

    // @ts-ignore
    echarts.init(document.getElementById('track') as HTMLElement).setOption(option)
  }, [])

  return (
    <Container>
      <Left>
        <div id="track" style={{ height: "100%" }} />
        {/*  onClick={showDrawer} */}
        {/* <div id="mysubway"></div> */}
        {/* <Drawer
            title={"地铁线路"}
            width={"100%"}
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <div id="mysubway" style={{ width: "100%", height: "100%" }}></div>
          </Drawer> */}
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
  )
}

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* background: #eee; */
`

const Left = styled.div`
/* height: 100vh; */
height: 100%;
background: #fff;
width: 49.9%;
border-radius: 8px;
`

const Right = styled.div`
width: 49.9%;
height: 100%;
display: flex;
justify-content: space-between;
flex-direction: column;
overflow-y: auto;
> * {
  /* flex: 1; */
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