import qs from 'qs'
import { useMemo } from 'react';
import { useQuery } from 'react-query'
import { cleanObject } from '..';
import { useUrlQueryParam } from 'hook/useUrlQueryParam';
import { useHttp } from '../http';
import {search} from "types/search";
import {log} from "types/log";

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
export const useInit = (params?: Partial<search>) => {
  const client = useHttp()
  return useQuery<log>(['log', cleanObject(params)], () => client(`log/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}