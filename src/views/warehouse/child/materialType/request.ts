import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'

/* 查询所有 */
export const useMaterialType = () => {
  const client = useHttp()
  return useQuery(['materialType'], async () => {
    const data = await client(`materialType/getAll`, { method: "POST" })
    data.data.forEach((key: any, index: number) => {
      key["key"] = index + 1
    })

    return data
  })
}

/*
新增计划小组分页查询
 */
export const useListBy = (params: any) => {
  const client = useHttp()
  return useQuery([cleanObject(params)], async () => {
    const data = await client(`materialType/listBy?${qs.stringify(cleanObject(params))}`, { method: "POST" })
    data.data.forEach((key: any, index: number) => {
      key["key"] = index + 1
    })
    return data
  })
}

/*
分页查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['materialType', cleanObject(params)], () => client(`materialType/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`materialType/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('materialType')
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
  return useMutation((params: any) => client(`materialType/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('materialType')
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
  return useMutation((id: number) => client(`materialType/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('materialType')
    },
    onError: () => {
    }
  })
}

/* 
详情
*/
export const useMaterialDetail = (id: number) => {
  const client = useHttp()
  return useQuery(["materialDetail", id], () => client(`materialType/get/${id}`), {
    enabled: Boolean(id),
  })
}