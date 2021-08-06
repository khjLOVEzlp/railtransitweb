import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['dictItem', cleanObject(params)], () => client(`dictItem/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`dictItem/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('dictItem')
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
  return useMutation((params: any) => client(`dictItem/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('dictItem')
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
  return useMutation((id: number) => client(`dictItem/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('dictItem')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useDictItemDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['dictItemDetail', id], () => client(`dictItem/get/${id}`), {
    enabled: Boolean(id),
  })
}