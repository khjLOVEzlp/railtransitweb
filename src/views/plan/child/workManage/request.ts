import qs from 'qs'
import { useQuery } from 'react-query'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { useUrlQueryParam } from "hook/useUrlQueryParam";
import { useMemo } from "react";
import { Search } from 'utils/typings';
import { WorkManage } from './typings';

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "index", "size"]);
  return [
    useMemo(
      () => ({ ...param, index: Number(param.index) || undefined, size: Number(param.size) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

/*
分页查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<WorkManage>(['planWork', cleanObject(params)], () => client(`planWork/historyList?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 查看详情 */
export const useHistoryDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['historyDetail', id], () => client(`planWork/getWeb/${id}`), {
    enabled: Boolean(id)
  })
}