import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['dictType', cleanObject(params)], () => client(`dictType/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`dictType/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('dictType')
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
  return useMutation((params: any) => client(`dictType/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('dictType')
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
  return useMutation((id: number) => client(`dictType/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('dictType')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useDictTypeDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['dictTypeDetail', id], () => client(`dictType/get/${id}`), {
    enabled: Boolean(id),
  })
}