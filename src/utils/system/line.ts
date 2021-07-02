import qs from 'qs'
import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from '..';
import { useUrlQueryParam } from '../../hook/useUrlQueryParam';
import { useHttp } from '../http';

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

/* 查所有 */
export const useLine = () => {
  const client = useHttp()
  return useQuery(['line'], () => client(`line/listLineAndPlatform`, { method: "POST" }))
}

/*
分页查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['line', cleanObject(params)], () => client(`line/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`line/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('line')
    },
    onError: () => {
    }
  })
}

/* 
修改
*/
export const useMod = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`line/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('line')
    },
    onError: () => {
    }
  })
}

/* 
删除
*/
export const useDel = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((id: number) => client(`line/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('line')
    },
    onError: () => {
    }
  })
}

/* 
查询详情
*/
export const useDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['lineDetail', id], () => client(`line/get/${id}`), {
    enabled: Boolean(id),
  })
}