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
export const useWorkStatistics = (params?: any) => {
  const client = useHttp()
  return useQuery(['WorkStatistics', cleanObject(params)], () =>
    client(`report/getPersonWork?${qs.stringify(cleanObject(params))}`, {method: "POST"})
  )
}

/*到岗统计弹框*/

export const useWorkModal = () => {
  const setUrlParams = useSetUrlSearchParam()

  const [{workId}, setWorkId] = useUrlQueryParam([
    'workId'
  ])

  const open = (id: number) => setWorkId({workId: id})

  const close = () => setUrlParams({workId: ""})

  return {
    ModalOpen: Boolean(workId),
    workId,
    open,
    close
  }
}