import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from '../../../../utils'
import { useHttp } from '../../../../utils/http'

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['seperate', cleanObject(params)], () => client(`hardware/seperate/list`, { method: "POST", body: JSON.stringify(params) }))
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
