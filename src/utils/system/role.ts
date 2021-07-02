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
  return useQuery(['role', cleanObject(params)], () => client(`role/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`role/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('role')
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
  return useMutation((params: any) => client(`role/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('role')
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
  return useMutation((id: number) => client(`role/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('role')
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
  return useQuery(['roleDetail', id], () => client(`role/get/${id}`), {
    enabled: Boolean(id),
  })
}