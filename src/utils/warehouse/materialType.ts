import qs from 'qs'
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

/* 查询所有 */
export const useMaterialType = () => {
  const client = useHttp()
  return useQuery(['materialType'], () => client(`materialType/getAll`, { method: "POST" }))
}

/*
分页查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['materialType', cleanObject(params)], () => client(`materialType/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`materialType/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('materialType')
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
  return useMutation((params: any) => client(`materialType/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('materialType')
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
  return useMutation((id: number) => client(`materialType/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('materialType')
    },
    onError: () => {
    }
  })
}

/* 
详情
*/
export const useDetail = (id: number) => {
  const client = useHttp()
  return useQuery(["materialType"], () => client(`materialType/get/${id}`))
}