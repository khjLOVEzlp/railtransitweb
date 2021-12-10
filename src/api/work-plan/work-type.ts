import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { Search } from 'utils/typings';

/* 查所有 */
export const usePlanType = () => {
  const client = useHttp()
  return useQuery(['planType'], () => client(`planType/getAll`, { method: "POST" }))
}

/*
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<any>(['planType', cleanObject(params)], () => client(`planType/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`planType/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('planType')
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
  return useMutation((params: any) => client(`planType/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('planType')
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
  return useMutation((id: number) => client(`planType/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('planType')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const usePlanTypeDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['planTypeDetail', id], () => client(`planType/get/${id}`), {
    enabled: Boolean(id),
  })
}