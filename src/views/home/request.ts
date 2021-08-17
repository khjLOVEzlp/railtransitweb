import { useQuery } from 'react-query'
import { useHttp } from "utils/http"
import qs from "qs";
import { cleanObject, context } from "utils/index";
import { useHomeContext } from './index'

/*
查询
 */
export const useLineIndex = () => {
  const client = useHttp()
  return useQuery(['line'], () => client(`line/getIndex`, { method: "POST" }))
}

/*首页计划统计*/
export const usePlanStatistics = () => {
  const client = useHttp()
  return useQuery(['planStatistics'], async () => {
    const data = await client(`report/webPlan`)
    data.data.forEach((key: any) => {
      key["name"] = context(key["type"])
    })
    return data
  })
}

/*首页计划统计分页查询*/
export const usePlanPagination = (params?: any) => {
  const p = params.type ? true : false
  const client = useHttp()
  return useQuery(['planPagination', cleanObject(params)], () =>
    client(`report/webPlanMore?${qs.stringify(cleanObject(params))}`, { method: "POST" }), {
    enabled: p
  })
}

export const Type = (type: number) => {
  switch (type) {
    case 1:
      return "遗忘"
    case 2:
      return "漏带"

    case 3:
      return "漏点"

    case 4:
      return "遗漏"

    case 5:
      return "疫情"

    case 6:
      return "酒精"

    case 7:
      return "分离告警"

    case 8:
      return "离线告警"

    case 9:
      return "过时告警"

    case 10:
      return "低电告警"

    case 11:
      return "血压"

    case 12:
      return "遗留"

    default:
      break;
  }
}

/*首页告警统计*/
export const useAlarmStatistics = () => {
  const client = useHttp()
  return useQuery(['alarmStatistics'], async () => {
    const data = await client(`report/webWarn`)
    data.data.forEach((key: any) => {
      key["name"] = Type(key["type"])
    })
    return data
  })
}

/*首页告警统计分页查询*/
export const useAlarmPagination = (params?: any) => {
  const p = params.type ? true : false

  const client = useHttp()
  return useQuery(['alarmPagination', cleanObject(params)], () =>
    client(`report/webWarnMore?${qs.stringify(cleanObject(params))}`, { method: "POST" }), {
    enabled: p
  })
}

/*首页作业统计*/
export const useTaskStatistics = () => {
  const client = useHttp()
  return useQuery(['taskStatistics'], async () => {
    const data = await client(`report/webWork`)
    data.data.forEach((key: any) => {
      key["name"] = context(key["type"])
    })
    return data
  })
}

/*首页作业统计分页查询*/
export const useTaskPagination = (params?: any) => {
  const p = params.type ? true : false
  const client = useHttp()
  return useQuery(['taskPagination', cleanObject(params)], () =>
    client(`report/webWorkMore?${qs.stringify(cleanObject(params))}`, { method: "POST" }), {
    enabled: p
  })
}

/*
* 计划统计弹框
* */

export const usePlanModal = () => {
  const { planId, setPlanId } = useHomeContext()

  const open = (id: number) => setPlanId(id)

  const close = () => setPlanId(undefined)

  return {
    ModalOpen: Boolean(planId),
    open,
    close,
    planId,
  }
}

/*
* 告警统计弹框
* */

export const useAlarmModal = () => {
  const { alarmId, setAlarmId } = useHomeContext()

  const open = (id: number) => setAlarmId(id)

  const close = () => setAlarmId(undefined)

  return {
    ModalOpen: Boolean(alarmId),
    open,
    close,
    alarmId,
  }
}

/*
* 作业统计弹框
* */

export const useTaskModal = () => {
  const { taskId, setTaskId } = useHomeContext()

  const open = (id: number | undefined) => setTaskId(id)

  const close = () => setTaskId(undefined)

  return {
    ModalOpen: Boolean(taskId),
    open,
    close,
    taskId,
  }
}

