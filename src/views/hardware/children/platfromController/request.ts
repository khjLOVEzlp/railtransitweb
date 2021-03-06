import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Pla } from './typings';
import { Search } from 'utils/typings';

/*
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Pla>(['platform', cleanObject(params)], () => client(`hardware/platform/list`, { method: "POST", body: JSON.stringify(params) }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`hardware/platform/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('platform')
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
  return useMutation((params: any) => client(`hardware/platform/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('platform')
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
  return useMutation((id: number) => client(`hardware/platform/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('platform')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const usePlaDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['plaDetail', id], () => client(`hardware/platform/get/${id}`), {
    enabled: Boolean(id),
  })
}