import qs from 'qs'
import { useMemo } from 'react';
import { useQuery } from 'react-query'
import { useUrlQueryParam } from 'hook/useUrlQueryParam';
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["date", "index", "size"]);
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
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['warehouseIn', cleanObject(params)], () => client(`warehouseIn/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}
