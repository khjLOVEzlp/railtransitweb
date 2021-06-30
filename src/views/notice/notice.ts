import qs from "qs"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { cleanObject } from "../../utils"
import { useHttp } from "../../utils/http"

/*
分页查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['transactionNotice', cleanObject(params)], () => client(`transactionNotice/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 反馈 */
export const useFeedBack = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`plan/shareBack`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('plan')
    },
    onError: () => {
    }
  })
}

/* 修改 */
export const useMod = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((id: number) => client(`transactionNotice/updateState/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('transactionNotice')
    },
    onError: () => {
    }
  })
}