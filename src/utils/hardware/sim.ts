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
  return useQuery(['simcard', cleanObject(params)], () => client(`hardware/simcard/list`, { method: "POST", body: JSON.stringify(params) }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`hardware/simcard/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('simcard')
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
  return useMutation((params: any) => client(`hardware/simcard/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('simcard')
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
  return useMutation((id: number) => client(`hardware/simcard/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('simcard')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useSimDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['simDetail', id], () => client(`hardware/simcard/get/${id}`), {
    enabled: Boolean(id),
  })
}