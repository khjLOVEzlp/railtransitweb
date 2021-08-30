import qs from "qs"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { cleanObject } from "utils/index"
import { useHttp } from "utils/http"
import { Notice } from "./typing"
import { Search } from "utils/typings"

/*
分页查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Notice>(['transactionNotice', cleanObject(params)], () => client(`transactionNotice/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/**
 * 查询未读消息条数
 *  */

export const useUnread = () => {
  const client = useHttp()
  return useQuery<Notice>(['unread'], () => client(`transactionNotice/unread`, { method: "POST" }))
}

/* 反馈 */
export const useFeedBack = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`plan/shareBack`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('plan')
      queryClient.invalidateQueries('transactionNotice')
      queryClient.invalidateQueries('unread')
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
      queryClient.invalidateQueries('unread')
    },
    onError: () => {
    }
  })
}

/* 批量修改已读状态 */

export const useAllMod = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((ids: any) => client(`transactionNotice/updateStates/${ids}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('transactionNotice')
      queryClient.invalidateQueries('unread')
    },
  })
}