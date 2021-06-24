import qs from 'qs'
import { useQuery } from 'react-query'
import { useHttp } from '../../utils/http'

/*
分页查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['type', params], () => client(`planWork/getWorkWarn?${qs.stringify(params)}`, { method: "POST" }))
}

/* 统计各个类型告警个数 */
export const useWarnCount = (time: string) => {
  const client = useHttp()
  return useQuery(['alarm', time], () => client(`planWork/getWarnCount/${time}`))
}