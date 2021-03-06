import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Sep } from './typings';
import { Search } from 'utils/typings';

/**
 * 查询未使用防分离器
 *  */
export const useGetNotUseList = () => {
  const client = useHttp()
  return useQuery(['person'], () => client(`hardware/seperate/getNotUseList`))
}

/*
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Sep>(['seperate', cleanObject(params)], () => client(`hardware/seperate/list`, { method: "POST", body: JSON.stringify(params) }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`hardware/seperate/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('seperate')
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
  return useMutation((params: any) => client(`hardware/seperate/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('seperate')
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
  return useMutation((id: number) => client(`hardware/seperate/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('seperate')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useSepDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['sepDetail', id], () => client(`hardware/seperate/get/${id}`), {
    enabled: Boolean(id),
  })
}
