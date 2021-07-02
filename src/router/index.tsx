import { useRoutes } from 'react-router-dom'
import { Home } from "../views/home";
import { Plan } from "../views/plan";
import { PlanWork } from "../views/plan/child/planWork";
import { PlanType } from "../views/plan/child/planType";
import { WorkManage } from "../views/plan/child/workManage";
import { Alarm } from "../views/alarm";
import { Statistics } from "../views/statistics";
import { Person } from "../views/person";
import { System } from "../views/system";
import { User } from "../views/system/child/user";
import { Role } from "../views/system/child/role";
import { Menu } from "../views/system/child/menu";
import { Line } from "../views/system/child/line";
import { Log } from "../views/system/child/log";
import { Department } from "../views/system/child/department";
import { DataDictionary } from "../views/system/child/dataDictionary";
import { MaterialType } from "../views/warehouse/child/materialType";
import { ToolType } from "../views/warehouse/child/toolType";
import { Temperature } from "../views/system/child/temperature";
import {InWarehouse} from "../views/warehouse/child/inWarehouse";
import {OutWarehouse} from "../views/warehouse/child/outWarehouse";
import { Warehouse } from "../views/warehouse";
import { Hardware } from "../views/hardware";
import { Navigate } from "react-router";
import { PersonManage } from '../views/person/child/personManage';
import { SpiritStatus } from '../views/person/child/spiritStatus';

export const RouterElement = () => {
  const element = useRoutes([
    /* 首页 */
    {
      path: "/home", element: <Home />
    },
    /* 作业计划 */
    {
      path: "/plan", element: <Plan />, children: [
        {
          path: "planType", element: <PlanType />
        },
        {
          path: "planWork", element: <PlanWork />
        },
        {
          path: "workManage", element: <WorkManage />
        },
        {
          path: "/", element: <Navigate to={"/plan/planWork"} />
        }
      ]
    },
    /* 告警上报 */
    {
      path: "/alarm", element: <Alarm />
    },
    /* 统计分析 */
    {
      path: "/statistics", element: <Statistics />
    },
    /* 设备管理 */
    {
      path: "/hardware", element: <Hardware />
    },
    /* 人员管理 */
    {
      path: "/person", element: <Person />, children: [
        {
          path: "personManage", element: <PersonManage />
        },
        {
          path: "spiritStatus", element: <SpiritStatus />
        },
        {
          path: "/", element: <Navigate to={"/person/personManage"} />
        }
      ]
    },
    /* 库存管理 */
    {
      path: "/warehouse", element: <Warehouse />, children: [
        {
          path: "materialType", element: <MaterialType />
        },
        {
          path: "toolType", element: <ToolType />
        },
        {
          path: "inWarehouse", element: <InWarehouse />
        },
        {
          path: "outWarehouse", element: <OutWarehouse />
        },
        {
          path: "/", element: <Navigate to={"/warehouse/toolType"} />
        }
      ]
    },
    /* 系统管理 */
    {
      path: "/system", element: <System />, children: [
        {
          path: "user", element: <User />
        },
        {
          path: "role", element: <Role />
        },
        {
          path: "menu", element: <Menu />
        },
        {
          path: "line", element: <Line />
        },
        {
          path: "log", element: <Log />
        },
        {
          path: "department", element: <Department />
        },
        {
          path: "dataDictionary", element: <DataDictionary />
        },
        {
          path: "temperature", element: <Temperature />
        },
        {
          path: "/", element: <Navigate to={"/system/user"} />
        }
      ]
    },
    {
      path: "/", element: <Navigate to={window.location.pathname + "home"} replace={true} />
    },
    {
      path: "*", element: <Not />
    }
  ])

  return element
}

const Not = () => {
  return (
    <h1>404 error</h1>
  )
}