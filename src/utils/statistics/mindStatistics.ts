import qs from 'qs'
import {useQuery} from 'react-query'
import {useHttp} from '../http'
import {cleanObject} from "../index";
import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useMemo} from "react";

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

/*到岗统计*/
export const useMindStatistics = (params?: any) => {
  const client = useHttp()
  return useQuery(['MindStatistics', cleanObject(params)], () =>
    client(`report/getPersonMind?${qs.stringify(cleanObject(params))}`, {method: "POST"})
  )
}

/*到岗统计弹框*/

export const useMindModal = () => {
  const setUrlParams = useSetUrlSearchParam()

  const [{mindId}, setMindId] = useUrlQueryParam([
    'mindId'
  ])

  const open = (id: number) => setMindId({mindId: id})

  const close = () => setUrlParams({mindId: ""})

  return {
    ModalOpen: Boolean(mindId),
    mindId,
    open,
    close
  }
}