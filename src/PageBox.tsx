import styled from "@emotion/styled";
import { useEffect, useState, createContext, useContext } from "react";
import { useHttp } from "./utils/http";
import logo from './icon/logo.png'
import notice from './icon/通知.png'
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { Avatar, Badge, Button, Dropdown, Menu, message } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useUnread } from 'views/notice/request'
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
import { useNoticeModal } from 'views/notice/util'
/*
* 用户信息弹框
* */
import { useInfoModal, UserInfo } from './components/UserInfo'
/*
* 关于、帮助弹框
* */
import { OnHelp, useOnHelpModal } from './components/OnHelp'
import { Home } from "views/home";
import { Plan } from "views/plan";
import { Alarm } from "views/alarm";
import { Statistics } from "views/statistics";
import { Hardware } from "views/hardware";
import { Person } from "views/person";
import { System } from "views/system";
import { Warehouse } from "views/warehouse";

const PageBoxContext = createContext<{
  infoId: number | undefined
  setInfoId: (infoId: number | undefined) => void
  help: boolean
  setHelp: (help: boolean) => void
} | undefined>(undefined)

export const PageBox = () => {
  const [infoId, setInfoId] = useState<number | undefined>(undefined)
  const [help, setHelp] = useState<boolean>(false)
  const { menu = [] } = useAuth()

  /*菜单列表*/
  /* const [menu, setMenu] = useState([])
  const client = useHttp()
  useEffect(() => {
    client(`info?type=1`, {
      method: "POST"
    }).then(async res => {
      res.data.unshift({ name: '首页', url: '/home' })
      res.data.forEach((item: { [key: string]: unknown }) => {
        let { name } = item
        switch (name) {
          case '设备管理':
            item.url = '/hardware'
            break;
          case '统计分析':
            item.url = '/statistics'
            break;
          case '告警上报':
            item.url = '/alarm'
            break;
          case '作业计划':
            item.url = '/plan'
            break;
          case '人员管理':
            item.url = '/person'
            break;
          case '系统管理':
            item.url = '/system'
            break;
          case '库存管理':
            item.url = '/warehouse'
            break;
          default:
            break;
        }
      })
      setMenu(res.data)
      sessionStorage.setItem('menu', JSON.stringify(res.data))

      
    })
  }, [client]) */

  /*const { data } = res
      // 递归菜单
      const recursionTreeData = (treeData: any) => {
        let nodeData: any = [];
        treeData.forEach((item:  { [key: string]: unknown }) => {
          if (item.childMenu) {
            item.childMenu = recursionTreeData(item.childMenu);
          }
          nodeData.push({
            childMenu: item.childMenu,
            children: item.childMenu,
            path: item.url,
            icon: item.icon,
            element: <item.url />
          });
        });
        return nodeData;
      };*/

  return (
    <PageBoxContext.Provider value={{ infoId, setInfoId, help, setHelp }}>
      <Container>
        <HeaderStyle>
          <Logo>
            <div className="img">
              <img src={logo} alt="" />
            </div>
            <div className="title" onClick={() => window.location.href = window.location.origin + '/home'}>
              <p>智慧轨行区数字化</p>
              <p>维养安全管控系统</p>
            </div>
          </Logo>
          <Nav className={"NavList"}>
            {
              menu?.map((item: any, index: any) => (
                <li key={index}><NavLink activeStyle={{ color: '#5A7FFA' }} to={item.url.replace('/', '')}>{item.name}</NavLink></li>
              ))
            }
          </Nav>
          <User />
        </HeaderStyle>
        <ContentStyle>
          {/* <RouterElement /> */}
          <Routes>
            <Route path={"/home"} element={<Home />} />
            <Route path={"/plan/*"} element={<Plan />} />
            <Route path={"/alarm"} element={<Alarm />} />
            <Route path={"/statistics/*"} element={<Statistics />} />
            <Route path={"/warehouse/*"} element={<Warehouse />} />
            <Route path={"/hardware/*"} element={<Hardware />} />
            <Route path={"/person/*"} element={<Person />} />
            <Route path={"/system/*"} element={<System />} />
            {/* <Navigate to={"/home"} /> */}
            <Navigate to={window.location.pathname + "/home"} replace={true} />
          </Routes>
        </ContentStyle>
        <UserInfo />
        <OnHelp />
      </Container>
    </PageBoxContext.Provider>
  )
}

const User = () => {
  const navigate = useNavigate()
  const { data } = useUnread()
  const { open } = useNoticeModal()
  const { startEdit } = useInfoModal()
  const { logout, user } = useAuth();
  const { open: OnHelpModal } = useOnHelpModal()
  const [visible, setVisible] = useState(false);
  const client = useHttp()
  const onCreate = (values: any) => {
    client(`user/editpassword?${qs.stringify(values)}`, { method: "POST" }).then(() => {
      message.success("修改成功，请重新登陆")
      setVisible(false);
      setTimeout(() => logout(), 3000)
    }).catch(error => {
      message.error(error.msg)
    })
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button type={"link"} onClick={open}>
        {/* @ts-ignore */}
        <Badge size="small" count={data?.data > "99" ? "99+" : data?.data}>
          <Avatar src={notice} shape="square" size="small" />
        </Badge>
      </Button>
      <OperModal />
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key={"user"}>
              <Button onClick={() => startEdit(user?.userId)} type={"link"}>
                用户信息
              </Button>
            </Menu.Item>
            <Menu.Item key={"mod"}>
              <Button onClick={showModal} type={"link"}>
                修改密码
              </Button>
            </Menu.Item>
            <Menu.Item key={"logout"}>
              <Button onClick={() => {
                logout()
                navigate("/login")
              }} type={"link"}>
                登出
              </Button>
            </Menu.Item>
            <Menu.Item key={"help"}>
              <Button onClick={OnHelpModal} type={"link"}>
                关于、帮助
              </Button>
            </Menu.Item>
          </Menu>
        }
      >
        <Button style={{ color: '#3A3D44', fontSize: '2rem', fontWeight: 'bold' }} type={"link"}
          onClick={(e) => e.preventDefault()}>
          {user?.userName}<DownOutlined />
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
  const context = useContext(PageBoxContext)
  if (!context) {
    throw new Error("usePageBoxContext必须在PageBox组件中使用")
  }
  return context
}

const Container = styled.div`
  height: 100vh;
  background: #eee;
`

const HeaderStyle = styled.header`
  height: 8.3vh;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 3rem;
  justify-content: space-between;
`

const Logo = styled.div`
  display: flex;
  align-items: center;

  > .title {
    margin-left: 1rem;
    font-size: 1.8rem;
    font-weight: bold;
    color: #5A7FFA;
    cursor: pointer;

    > p {
      width: 20rem;
      margin: 0;
    }
  }
`

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  width: 100%;
  padding: 0 10rem;
  box-sizing: border-box;

  > li {
    flex: 1;
    text-align: center;

    > a {
      display: block;
      width: 100%;
      color: #3A3D44;

    }
  }
`

const ContentStyle = styled.main`
  height: calc(100vh - 8.3vh);
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
`