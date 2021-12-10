import { createContext, useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { useDocumentTitle } from "hook/useDocumentTitle";
import Page from "./component/alarmStatistics";
import PlanWorkPage from "./component/taskStatistics";
import PlanType from "./component/planType";
import { Subway } from "./component/Subway";
import { Space } from "antd";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import title from "assets/home/home-left-titlebg.png";
import bg from "assets/home/home-right-bg1.png";
import { useLine } from "api/home/subway";
const style = {
  fontSize: "14px",
  color: "#1BAAFF",
  fontWeight: 400,
};

const styleValue = {
  fontSize: "26px",
  color: "#1BAAFF",
  fontWeight: 400,
};

const HomeContext = createContext<
  | {
      alarmId: number | undefined;
      setAlarmId: (alarmId: number | undefined) => void;
      planId: number | undefined;
      setPlanId: (planId: number | undefined) => void;
      taskId: number | undefined;
      setTaskId: (taskId: number | undefined) => void;
    }
  | undefined
>(undefined);

export const Home = () => {
  useDocumentTitle("首页");
  const [alarmId, setAlarmId] = useState<number | undefined>(undefined);
  const [planId, setPlanId] = useState<number | undefined>(undefined);
  const [taskId, setTaskId] = useState<number | undefined>(undefined);
  const [show, setShow] = useState<boolean>(true);
  const { data, isSuccess } = useLine();

  return (
    <HomeContext.Provider
      value={{ alarmId, setAlarmId, planId, setPlanId, taskId, setTaskId }}
    >
      <div
        style={{
          position: "absolute",
          right: "50px",
          top: "70px",
          zIndex: 1001,
        }}
      >
        {show ? (
          <DoubleRightOutlined
            style={{ color: "#fff", fontSize: "18px" }}
            onClick={() => setShow(!show)}
          />
        ) : (
          <DoubleLeftOutlined
            style={{ color: "#00001B", fontSize: "18px" }}
            onClick={() => setShow(!show)}
          />
        )}
      </div>
      <Container>
        {show ? (
          <Left>
            <div>
              <Title>
                <p>告警统计</p>{" "}
              </Title>
              <Page />
            </div>

            <div>
              <Title>
                <p>计划统计</p>{" "}
              </Title>
              <PlanWorkPage />
            </div>

            <div>
              <Title>
                <p>作业统计</p>{" "}
              </Title>
              <PlanType />
            </div>
          </Left>
        ) : (
          ""
        )}
        <Main>
          <Subway />
        </Main>
        {isSuccess && show ? (
          <Right>
            <Space
              style={{
                position: "absolute",
                right: 0,
                zIndex: 1000,
                height: "100%",
                width: "100%",
                overflow: "auto",
                padding: "50px 15px",
                boxSizing: "border-box",
              }}
              direction={"vertical"}
            >
              {data.data.map((item: any, index: number) => (
                <Card key={index}>
                  <div className="top">
                    <p>{item.name}</p>
                  </div>
                  <div
                    className="bottom"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      height: "75px",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <p style={style}>
                      <p style={styleValue}>{item.personCount || "0"}</p>
                      人数
                    </p>
                    <p style={style}>
                      <p style={styleValue}>{item.classCount || "0"}</p>
                      班别数
                    </p>
                    <p style={style}>
                      <p style={styleValue}>{item.platformCount || "0"}</p>
                      站台数
                    </p>
                    <p style={style}>
                      <p style={styleValue}>{item.warehouseCount || "0"}</p>
                      仓库数
                    </p>
                  </div>
                </Card>
              ))}
            </Space>
          </Right>
        ) : (
          ""
        )}
      </Container>
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext必须在Home组件中使用");
  }
  return context;
};

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* background: #eee; */
`;

const Left = styled.div`
  /* height: 100%; */
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #00225c;
  > * {
    flex: 1;
    // position: relative;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
`;

const Main = styled.div`
  height: 100%;
  background: #fff;
  flex: 3;
  position: relative;
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  background: #00265f;
`;

const Card = styled.div`
  width: 100%;
  height: 130px;
  textalign: center;
  background: url(${bg}) center center no-repeat;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .top {
    p {
      color: #fff;
      font-size: 12px;
      line-height: 26px;
      text-align: center;
    }
  }
`;

const Title = styled.h3`
  padding: 1rem;
  width: 100%;
  font-size: 12px;
  // position: absolute;
  // left: 0.1rem;
  z-index: 1000;
  color: #fff;
  background: url(${title}) center center no-repeat;
  p {
    margin-left: 21%;
  }
`;
