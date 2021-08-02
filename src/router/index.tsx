import { useRoutes } from 'react-router-dom'
/*首页*/
import { Home } from "../views/home";
/*作业计划*/
import { Plan } from "../views/plan";
import { PlanWork } from "../views/plan/child/planWork";
/*作业类型*/
import { PlanType } from "../views/plan/child/planType";
/*作业历史*/
import { WorkManage } from "../views/plan/child/workManage";
/*告警上报*/
import { Alarm } from "../views/alarm";
/*统计分析*/
import { Statistics } from "../views/statistics";
/*作业统计*/
import { WorkCount } from "../views/statistics/child/workCount";
/*告警统计*/
import { WorkWarn } from "../views/statistics/child/workWarn";
/*到岗统计*/
import { WorkPerson } from "../views/statistics/child/workPerson";
/*精神分析*/
import { PersonMind } from "../views/statistics/child/personMind";
/*人员管理*/
import { Person } from "../views/person";
import { PersonManage } from '../views/person/child/personManage';
/*精神状态*/
import { SpiritStatus } from '../views/person/child/spiritStatus';
/*系统管理*/
import { System } from "../views/system";
/*用户管理*/
import { User } from "../views/system/child/user";
/*角色管理*/
import { Role } from "../views/system/child/role";
/*菜单管理*/
import { Menu } from "../views/system/child/menu";
/*地铁管理*/
import { Line } from "../views/system/child/line";
/*日志管理*/
import { Log } from "../views/system/child/log";
/*部门管理*/
import { Department } from "../views/system/child/department";
/*数据字典*/
import { DataDictionary } from "../views/system/child/dataDictionary";
/*工具类型*/
import { MaterialType } from "../views/warehouse/child/materialType";
/*仓库管理*/
import { ToolType } from "../views/warehouse/child/toolType";
/**/
// import { Temperature } from "../views/system/child/temperature";
/*入库记录*/
import { InWarehouse } from "../views/warehouse/child/inWarehouse";
/*出库记录*/
import { OutWarehouse } from "../views/warehouse/child/outWarehouse";
/*库存管理*/
import { Warehouse } from "../views/warehouse";
/*设备管理*/
import { Hardware } from "../views/hardware";

import { Navigate } from "react-router";

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
      path: "/statistics", element: <Statistics />, children: [
        {
          path: "workCount", element: <WorkCount />
        },
        {
          path: "workWarn", element: <WorkWarn />
        },
        {
          path: "workPerson", element: <WorkPerson />
        },
        {
          path: "personMind", element: <PersonMind />
        },
        {
          path: "/", element: <Navigate to={"/statistics/workCount"} />
        }
      ]
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