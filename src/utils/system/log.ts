import qs from 'qs'
import { useMemo } from 'react';
import { useQuery } from 'react-query'
import { cleanObject } from '..';
import { useUrlQueryParam } from '../../hook/useUrlQueryParam';
import { useHttp } from '../http';

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["operName", "startTime", "endTime", "index", "size"]);
  return [
    useMemo(
      () => ({ ...param, index: Number(param.index) || undefined, size: Number(param.size) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['log', cleanObject(params)], () => client(`log/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}