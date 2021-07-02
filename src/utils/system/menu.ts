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

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['menu', cleanObject(params)], () => client(`menu/getAll?${qs.stringify(cleanObject(params))}&type=1`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`menu/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('menu')
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
  return useMutation((params: any) => client(`menu/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('menu')
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
  return useMutation((id: number) => client(`menu/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('menu')
    },
    onError: () => {
    }
  })
}
