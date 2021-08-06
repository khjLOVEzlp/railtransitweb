import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['linePlatform', cleanObject(params)], () => client(`linePlatform/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`linePlatform/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('linePlatform')
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
  return useMutation((params: any) => client(`linePlatform/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('linePlatform')
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
  return useMutation((id: number) => client(`linePlatform/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('linePlatform')
    },
    onError: () => {
    }
  })
}

/* 详情 */
export const useLinePlatformDetail = (id: number) => {
  const client = useHttp()
  return useQuery(['linePlatformDetail', id], () => client(`linePlatform/get/${id}`), {
    enabled: Boolean(id),
  })
}