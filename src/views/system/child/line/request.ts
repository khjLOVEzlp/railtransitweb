import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';
import { subwaylist } from 'views/home/child/index'

/* 查所有 */
export const useLine = () => {
  const client = useHttp()
  return useQuery(['lineAll'], async () => {
    const data = await client(`line/getIndex`, { method: "POST" })
    data.data = data.data.filter((key: { [key: string]: unknown }) => key.status === 1)
    data.data.forEach((item: any, index: number) => {
      item["color"] = subwaylist.find((key: any) => item.name === key.name)?.label.color
    })
    return data
  })
}

/*
分页查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['line', cleanObject(params)], () => client(`line/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`line/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('line')
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
  return useMutation((params: any) => client(`line/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('line')
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
  return useMutation((id: number) => client(`line/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('line')
    },
    onError: () => {
    }
  })
}

/* 
查询详情
*/
export const useLineDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['lineDetail', id], () => client(`line/get/${id}`), {
    enabled: Boolean(id),
  })
}