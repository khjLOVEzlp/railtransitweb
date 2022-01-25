import styled from "@emotion/styled";
import { useState, createContext, useContext } from "react";
import { useHttp } from "./utils/http";
import logo from "./assets/login/login_logo.png";
import bg from "./assets/home/home-topbg.png";
import on from "./assets/home/home-topbg-btn.png";
// import title from "./assets/home/WechatIMG3.png";
import title from "./assets/home/智慧轨行区数字化维养安全管控系统.png";
import notice from "./assets/home/Email.png";
import userimg from "./assets/home/User.png";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { Avatar, Badge, Button, Dropdown, Menu, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useUnread } from "views/notice/request";
import qs from "qs";

/*
 * 路由
 * */
/*
 * 事务通知弹框
 * */
import { OperModal } from "./views/notice/OperModal";
/*
 * 修改密码弹框
 * */
import { PassModal } from "./components/PassModal";
import { useNoticeModal } from "views/notice/util";
/*
 * 用户信息弹框
 * */
import { useInfoModal, UserInfo } from "./components/UserInfo";
/*
 * 关于、帮助弹框
 * */
import { OnHelp, useOnHelpModal } from "./components/OnHelp";
import { Home } from "views/home";
import { Plan } from "views/work-plan/work-plan";
import { Alarm } from "views/alarm";
import { Statistics } from "views/statistics";
import { Hardware } from "views/hardware";
import { Person } from "views/person";
import { System } from "views/system";
import { Warehouse } from "views/warehouse";
import { Not } from "views/error/404";

const PageBoxContext = createContext<
  | {
      infoId: number | undefined;
      setInfoId: (infoId: number | undefined) => void;
      help: boolean;
      setHelp: (help: boolean) => void;
    }
  | undefined
>(undefined);

export const PageBox = () => {
  const [infoId, setInfoId] = useState<number | undefined>(undefined);
  const [help, setHelp] = useState<boolean>(false);
  const { menu = [] } = useAuth();

  return (
    <PageBoxContext.Provider value={{ infoId, setInfoId, help, setHelp }}>
      <Container>
        <HeaderStyle className="handerStyle">
          <p>
            <img src={title} alt="" />
          </p>
          <Logo>
            <img src={logo} alt="" />
          </Logo>
          <Nav className={"NavList"}>
            <div className="left">
              {menu?.find((item: any) => item.name === "首页") ? (
                <li>
                  <NavLink
                    to={"home"}
                    activeStyle={
                      document.title === "首页"
                        ? { fontWeight: "bold", color: "#FFF" }
                        : {}
                    }
                  >
                    首页
                  </NavLink>
                </li>
              ) : (
                <></>
              )}

              {menu?.find((item: any) => item.name === "作业计划") ? (
                <li>
                  <NavLink
                    to={"plan"}
                    activeStyle={
                      document.title === "作业计划"
                        ? { fontWeight: "bold", color: "#FFF" }
                        : {}
                    }
                  >
                    作业计划
                  </NavLink>
                </li>
              ) : (
                <></>
              )}

              {menu?.find((item: any) => item.name === "告警上报") ? (
                <li>
                  <NavLink
                    to={"alarm"}
                    activeStyle={
                      document.title === "告警上报"
                        ? { fontWeight: "bold", color: "#FFF" }
                        : {}
                    }
                  >
                    告警上报
                  </NavLink>
                </li>
              ) : (
                <></>
              )}

              {menu?.find((item: any) => item.name === "统计分析") ? (
                <li>
                  <NavLink
                    to={"statistics"}
                    activeStyle={
                      document.title === "统计分析"
                        ? { fontWeight: "bold", color: "#FFF" }
                        : {}
                    }
                  >
                    统计分析
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
            </div>

            <div className="placeholder" style={{ margin: "0 400px" }}></div>

            <div className="right">
              {menu?.find((item: any) => item.name === "库存管理") ? (
                <li>
                  <NavLink
                    to={"warehouse"}
                    activeStyle={
                      document.title === "库存管理"
                        ? { fontWeight: "bold", color: "#FFF" }
                        : {}
                    }
                  >
                    库存管理
                  </NavLink>
                </li>
              ) : (
                <></>
              )}

              {menu?.find((item: any) => item.name === "人员管理") ? (
                <li>
                  <NavLink
                    to={"person"}
                    activeStyle={
                      document.title === "人员管理"
                        ? { fontWeight: "bold", color: "#FFF" }
                        : {}
                    }
                  >
                    人员管理
                  </NavLink>
                </li>
              ) : (
                <></>
              )}

              {menu?.find((item: any) => item.name === "设备管理") ? (
                <li>
                  <NavLink
                    to={"hardware"}
                    activeStyle={
                      document.title === "设备管理"
                        ? { fontWeight: "bold", color: "#FFF" }
                        : {}
                    }
                  >
                    设备管理
                  </NavLink>
                </li>
              ) : (
                <></>
              )}

              {menu?.find((item: any) => item.name === "系统管理") ? (
                <li>
                  <NavLink
                    to={"system"}
                    activeStyle={
                      document.title === "系统管理"
                        ? { fontWeight: "bold", color: "#FFF" }
                        : {}
                    }
                  >
                    系统管理
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
            </div>

            {/* {
              menu?.map((item: any, index: number) => (
                <li key={index}>
                  <NavLink activeClassName="on" to={item.url.replace('/', '')}>
                    {item.name}
                  </NavLink>
                </li>
              ))
            } */}
          </Nav>
          <User />
        </HeaderStyle>
        <ContentStyle>
          <Routes>
            <Route path={"/home"} element={<Home />} />
            <Route path={"/plan/*"} element={<Plan />} />
            <Route path={"/alarm"} element={<Alarm />} />
            <Route path={"/statistics/*"} element={<Statistics />} />
            <Route path={"/warehouse/*"} element={<Warehouse />} />
            <Route path={"/hardware/*"} element={<Hardware />} />
            <Route path={"/person/*"} element={<Person />} />
            <Route path={"/system/*"} element={<System />} />
            <Navigate to={window.location.pathname + "/home"} replace={true} />
            <Route path={"*"} element={<Not />} />
          </Routes>
        </ContentStyle>
        <UserInfo />
        <OnHelp />
      </Container>
    </PageBoxContext.Provider>
  );
};

const User = () => {
  const navigate = useNavigate();
  const { data = {} } = useUnread();
  const { open } = useNoticeModal();
  const { startEdit } = useInfoModal();
  const { logout, user } = useAuth();
  const { open: OnHelpModal } = useOnHelpModal();
  const [visible, setVisible] = useState(false);
  const client = useHttp();
  const onCreate = (values: any) => {
    client(`user/editpassword?${qs.stringify(values)}`, { method: "POST" })
      .then(() => {
        message.success("修改成功，请重新登陆");
        setVisible(false);
        setTimeout(() => {
          sessionStorage.clear();
          logout();
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        message.error(error.msg);
      });
  };

  const showModal = () => {
    setVisible(true);
  };

  const onClick = ({ key }: any) => {
    if (key === "user") {
      startEdit(user?.userId);
    }

    if (key === "mod") {
      showModal();
    }

    if (key === "logout") {
      logout().then(() => {
        navigate("/login");
      });
    }

    if (key === "help") {
      OnHelpModal();
    }
  };

  return (
    <div
      className="userRight"
      style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}
    >
      <Badge
        size="small"
        // @ts-ignore
        count={data?.data > "99" ? "99+" : data?.data}
      >
        {/* @ts-ignore */}
        <Avatar src={notice} shape="square" size="small" onClick={open} />
      </Badge>

      <OperModal />
      <Dropdown
        overlay={
          <Menu onClick={onClick}>
            <Menu.Item key={"user"}>
              <Button type={"link"}>用户信息</Button>
            </Menu.Item>
            <Menu.Item key={"mod"}>
              <Button type={"link"}>修改密码</Button>
            </Menu.Item>
            <Menu.Item key={"logout"}>
              <Button type={"link"}>登出</Button>
            </Menu.Item>
            <Menu.Item key={"help"}>
              <Button type={"link"}>关于、帮助</Button>
            </Menu.Item>
          </Menu>
        }
      >
        <Button
          style={{
            color: "#FFF",
            fontSize: "1.6rem",
            fontWeight: "bold",
            lineHeight: "100%",
          }}
          type={"link"}
          onClick={(e) => e.preventDefault()}
        >
          <Avatar
            src={userimg}
            shape="square"
            size="small"
            style={{ marginLeft: "5px" }}
          />
          {user?.userName}
          <DownOutlined />
        </Button>
      </Dropdown>
      <PassModal
        passwd={"mod"}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export const usePageBoxContext = () => {
  const context = useContext(PageBoxContext);
  if (!context) {
    throw new Error("usePageBoxContext必须在PageBox组件中使用");
  }
  return context;
};

const Container = styled.div`
  height: 100vh;
  background: #eee;
`;

const HeaderStyle = styled.header`
  position: relative;
  z-index: 2;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  background: url(${bg}) center center no-repeat;
  p {
    margin: 0 auto;
    width: 460px;
    position: absolute;
    left: 0;
    right: 0;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  margin-right: 50px;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  // width: 100%;
  box-sizing: border-box;

  .on {
    background: url(${on}) center center no-repeat;
  }

  .left {
    display: flex;
    > li {
      margin-right: 20px;
      > a {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #67acff;
      }
    }
  }

  .right {
    display: flex;
    > li {
      margin-right: 20px;
      > a {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #67acff;
      }
    }
  }
`;

const ContentStyle = styled.main`
  height: calc(100vh - 50px + 10px);
  margin-top: -10px;
  position: relative;
  box-sizing: border-box;
`;
