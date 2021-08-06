import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Rfi } from './typings';
import { Search } from 'utils/typings';

/*
查询所有工卡
 */
export const useAllRfi = () => {
  const client = useHttp()
  return useQuery(['rfidcard'], () => client(`hardware/rfidcard/getAll`))
}

/*
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Rfi>(['rfidcard', cleanObject(params)], () => client(`hardware/rfidcard/list`, { method: "POST", body: JSON.stringify(params) }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`hardware/rfidcard/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('rfidcard')
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
  return useMutation((params: any) => client(`hardware/rfidcard/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('rfidcard')
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
  return useMutation((id: number) => client(`hardware/rfidcard/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('rfidcard')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useRfiDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['rfiDetail', id], () => client(`hardware/rfidcard/get/${id}`), {
    enabled: Boolean(id),
  })
}
