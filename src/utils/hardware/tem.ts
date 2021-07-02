import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUrlQueryParam } from '../../hook/useUrlQueryParam';
import { cleanObject } from '../index'
import { useHttp } from '../http'

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
  return useQuery(['temperater', cleanObject(params)], () => client(`hardware/temperater/list`, { method: "POST", body: JSON.stringify(params) }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`hardware/temperater/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('temperater')
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
  return useMutation((params: any) => client(`hardware/temperater/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('temperater')
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
  return useMutation((id: number) => client(`hardware/temperater/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('temperater')
    },
    onError: () => {
    }
  })
}
