import {useRoutes} from 'react-router-dom'
import {Home} from "../views/home";
import {Plan} from "../views/plan";
import {PlanWork} from "../views/plan/child/planWork";
import {PlanType} from "../views/plan/child/planType";
import {WorkManage} from "../views/plan/child/workManage";
import {Alarm} from "../views/alarm";
import {Statistics} from "../views/statistics";
import {Person} from "../views/person";
import {System} from "../views/system";
import {User} from "../views/system/child/user";
import {Role} from "../views/system/child/role";
import {Menu} from "../views/system/child/menu";
import {Line} from "../views/system/child/line";
import {Log} from "../views/system/child/log";
import {Department} from "../views/system/child/department";
import {DataDictionary} from "../views/system/child/dataDictionary";
import {MaterialType} from "../views/system/child/materialType";
import {Temperature} from "../views/system/child/temperature";
import {Warehouse} from "../views/system/child/warehouse";
import {Hardware} from "../views/hardware";
import {Navigate} from "react-router";
import React from "react";

export const RouterElement = () => {
  const element = useRoutes([
    {
      path: "/home", element: <Home/>
    },
    {
      path: "/plan", element: <Plan/>, children: [
        {
          path: "planType", element: <PlanType/>
        },
        {
          path: "planWork", element: <PlanWork/>
        },
        {
          path: "workManage", element: <WorkManage/>
        },
        {
          path: "/", element: <Navigate to={"/plan/planWork"}/>
        }
      ]
    },
    {
      path: "/alarm", element: <Alarm/>
    },
    {
      path: "/statistics", element: <Statistics/>
    },
    {
      path: "/hardware", element: <Hardware/>
    },
    {
      path: "/person", element: <Person/>
    },
    {
      path: "/system", element: <System/>, children: [
        {
          path: "user", element: <User/>
        },
        {
          path: "role", element: <Role/>
        },
        {
          path: "menu", element: <Menu/>
        },
        {
          path: "line", element: <Line/>
        },
        {
          path: "log", element: <Log/>
        },
        {
          path: "department", element: <Department/>
        },
        {
          path: "dataDictionary", element: <DataDictionary/>
        },
        {
          path: "materialType", element: <MaterialType/>
        },
        {
          path: "temperature", element: <Temperature/>
        },
        {
          path: "warehouse", element: <Warehouse/>
        },
        {
          path: "/", element: <Navigate to={"/system/user"}/>
        }
      ]
    },
    {
      path: "/", element: <Navigate to={window.location.pathname + "home"} replace={true}/>
    },
    {
      path: "*", element: <Not/>
    }
  ])

  return element
}

const Not = () => {
  return (
    <h1>404 error</h1>
  )
}