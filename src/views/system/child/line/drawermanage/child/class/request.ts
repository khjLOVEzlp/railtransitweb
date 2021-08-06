import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['lineClass', cleanObject(params)], () => client(`lineClass/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/*
查询区间
 */
export const useRoad = (params: any) => {
  const client = useHttp()
  return useQuery(['lineClass', cleanObject(params)], () => client(`lineRoad/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`lineClass/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('lineClass')
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
  return useMutation((params: any) => client(`lineClass/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('lineClass')
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
  return useMutation((id: number) => client(`lineClass/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('lineClass')
    },
    onError: () => {
    }
  })
}

/* 
查询详情
*/
export const useLineClassDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['lineClassDetail', id], async () => {
    const data = await client(`lineClass/get/${id}`)
    data.data.warehouseIds.forEach((key: any) => {
      key = parseInt(key)
    })
    console.log(data)
    return data
  }, {
    enabled: Boolean(id),
  })
}