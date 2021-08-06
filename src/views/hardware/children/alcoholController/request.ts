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
  return useQuery<Alc>(['alcohol', cleanObject(params)], () => client(`hardware/alcohol/list`, { method: "POST", body: JSON.stringify(params) }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`hardware/alcohol/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('alcohol')
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
  return useMutation((params: any) => client(`hardware/alcohol/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('alcohol')
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
  return useMutation((id: number) => client(`hardware/alcohol/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('alcohol')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useAlcDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['alcDetail', id], () => client(`hardware/alcohol/get/${id}`), {
    enabled: Boolean(id),
  })
}
