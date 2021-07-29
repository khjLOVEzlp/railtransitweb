import qs from 'qs'
import { useQuery } from 'react-query'
import { useHttp } from '../http'
import { cleanObject } from "../index";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useMemo } from "react";
/*项目列表搜索的参数*/
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["subwayId", "time", "index", "size"]);
  return [
    useMemo(
      () => ({ ...param, index: Number(param.index) || undefined, size: Number(param.size) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

const getType = (type: number) => {
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

/*告警统计*/
export const useAlarmStatistics = (params?: any) => {
  const client = useHttp()
  return useQuery(['AlarmStatistics', cleanObject(params)], async () => {
    const data = await client(`report/getWorkWarn?${qs.stringify(cleanObject(params))}`, { method: "POST" })
    data.data.forEach((key: any) => {
      key["name"] = getType(key["type"])
    })
    return data
  }
  )
}

/*告警统计分页查询*/
export const useAlarmPagination = (params?: any) => {
  const client = useHttp()
  return useQuery(['AlarmPagination', cleanObject(params)], async () =>
    client(`report/getWorkWarnMore?${qs.stringify(cleanObject(params))}`, { method: "POST" })
  )
}

/*告警统计弹框*/

export const useAlarmModal = () => {
  const setUrlParams = useSetUrlSearchParam()

  const [{ subwayId, time, openAlarm }, setOpenAlarm] = useUrlQueryParam([
    'subwayId', "time", "openAlarm"
  ])

  const open = (subwayId: number | string, time: number | string) =>
    setOpenAlarm({ subwayId: subwayId, time: time, openAlarm: true });

  const close = () => setUrlParams({ subwayId: "", time: "", openAlarm: "" })

  return {
    ModalOpen: Boolean(subwayId) && Boolean(time) && openAlarm === "true",
    open,
    close
  }
}