import qs from 'qs'
import { useMemo } from 'react';
import { useQuery } from 'react-query'
import { useUrlQueryParam } from 'hook/useUrlQueryParam';
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Search } from 'utils/typings';
import { Spirit } from './typings';

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
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Spirit>(['record/list', cleanObject(params)], () => client(`record/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}
