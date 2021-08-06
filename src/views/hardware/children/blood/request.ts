import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Alc } from './typings';
import { Search } from 'utils/typings'

/*
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Alc>(['blood', cleanObject(params)], () => client(`hardware/blood/list`, { method: "POST", body: JSON.stringify(params) }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`hardware/blood/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('blood')
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
  return useMutation((params: any) => client(`hardware/blood/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('blood')
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
  return useMutation((id: number) => client(`hardware/blood/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('blood')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useBloodDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['bloodDetail', id], () => client(`hardware/blood/get/${id}`), {
    enabled: Boolean(id),
  })
}
