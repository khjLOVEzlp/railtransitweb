import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from '..'
import { useHttp } from '../http'

/*
查询
 */
export const useInit = (params?: any) => {
  const client = useHttp()
  return useQuery(['department', cleanObject(params)], () => client(`department/getAll?${qs.stringify(cleanObject(params))}`))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`department/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('department')
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
  return useMutation((params: any) => client(`department/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('department')
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
  return useMutation((id: number) => client(`department/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('department')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useDepartmentDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['departmentDetail', id], () => client(`department/get/${id}`), {
    enabled: Boolean(id),
  })
}
