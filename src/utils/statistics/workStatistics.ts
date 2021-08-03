import qs from 'qs'
import { useQuery } from 'react-query'
import { useHttp } from '../http'
import { cleanObject } from "../index";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useMemo } from "react";

/*项目列表搜索的参数*/
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["subwayId", "time"]);
  return [
    useMemo(
      () => ({ ...param }),
      [param]
    ),
    setParam,
  ] as const;
};

/*到岗统计*/
export const useWorkStatistics = (params?: any) => {
  const client = useHttp()
  return useQuery(['WorkStatistics', cleanObject(params)], () =>
    client(`report/getPersonWork?${qs.stringify(cleanObject(params))}`, { method: "POST" }), {
    enabled: Boolean(params.subwayId) && Boolean(params.time)
  }
  )
}

/*到岗详情*/
export const useWorkStatisticsDetail = (params?: any) => {
  const client = useHttp()
  return useQuery(['WorkStatisticsDetail', cleanObject(params)], () =>
    client(`report/getPersonWorkMore?${qs.stringify(cleanObject(params))}`, { method: "POST" }), {
    enabled: Boolean(params.subwayId) && Boolean(params.time)
  }
  )
}

/*到岗统计弹框*/
export const useWorkModal = () => {
  const setUrlParams = useSetUrlSearchParam()

  const [{ subwayId, time, openWork }, setOpenWork] = useUrlQueryParam([
    'subwayId', 'time', 'openWork'
  ])

  const open = (subwayId: number | string, time: number | string) => setOpenWork({ subwayId, time, openWork: true })

  const close = () => setUrlParams({ subwayId: "", time: "", openWork: "" })

  return {
    ModalOpen: Boolean(subwayId) && Boolean(time) && openWork === 'true',
    open,
    close
  }
}