import qs from 'qs'
import { useQuery } from 'react-query'
import { cleanObject } from '../../../../utils'
import { useHttp } from '../../../../utils/http'

/*
分页查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['planWork', cleanObject(params)], () => client(`planWork/historyList?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 查看详情 */
export const useShare = (id?: number) => {
  const client = useHttp()
  return useQuery(['planWork', id], () => client(`planWork/get/${id}`))
}