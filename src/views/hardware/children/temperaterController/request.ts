import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Search } from 'utils/typings';
import { Tem } from './typing';

/*
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Tem>(['temperater', cleanObject(params)], () => client(`hardware/temperater/list`, { method: "POST", body: JSON.stringify(params) }))
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

/*
查询详情
*/
export const useTemDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['temDetail', id], () => client(`hardware/temperater/get/${id}`), {
    enabled: Boolean(id),
  })
}
