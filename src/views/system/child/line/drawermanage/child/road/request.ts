import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['lineRoad', cleanObject(params)], () => client(`lineRoad/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`lineRoad/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('lineRoad')
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
  return useMutation((params: any) => client(`lineRoad/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('lineRoad')
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
  return useMutation((id: number) => client(`lineRoad/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('lineRoad')
    },
    onError: () => {
    }
  })
}

/* 详情 */
export const useLineRoadDetail = (id: number) => {
  const client = useHttp()
  return useQuery(['lineRoadDetail', id], () => client(`lineRoad/get/${id}`), {
    enabled: Boolean(id),
  })
}
