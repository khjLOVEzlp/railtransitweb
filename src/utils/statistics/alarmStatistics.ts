import qs from 'qs'
import {useQuery} from 'react-query'
import {useHttp} from '../http'
import {cleanObject} from "../index";
import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useMemo} from "react";
import {getType} from "views/home/child/alarmStatistics";

/*项目列表搜索的参数*/
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["subwayId", "time"]);
  return [
    useMemo(
      () => ({...param}),
      [param]
    ),
    setParam,
  ] as const;
};

/*告警统计*/
export const useAlarmStatistics = (params?: any) => {
  const client = useHttp()
  return useQuery(['AlarmStatistics', cleanObject(params)], async () => {
      const data = await client(`report/getWorkWarn?${qs.stringify(cleanObject(params))}`, {method: "POST"})
      data.data.forEach((key: any) => {
        key["name"] = getType(key["type"])
      })
      return data
    }
    /*{
      const data = await client(`report/getWorkWarn?${qs.stringify(cleanObject(params))}`, {method: "POST"})
      data.data.forEach((key: any) => {
        key["name"] = getType(key["type"])
      })
      return data
    }*/
  )
}

/*告警统计弹框*/

export const useAlarmModal = () => {
  const setUrlParams = useSetUrlSearchParam()

  const [{alarmId}, setAlarmId] = useUrlQueryParam([
    'alarmId'
  ])

  const open = (id: number) => setAlarmId({alarmId: id})

  const close = () => setUrlParams({alarmId: ""})

  return {
    ModalOpen: Boolean(alarmId),
    alarmId,
    open,
    close
  }
}