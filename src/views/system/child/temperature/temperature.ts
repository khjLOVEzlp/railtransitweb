import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from '../../../../utils'
import { useHttp } from '../../../../utils/http'

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(["record", params], () => client(`record/list?${qs.stringify(params)}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`record/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('record')
    },
    onError: () => {
    }
  })
}