import { useQuery } from 'react-query'
import { cleanObject } from '../../utils'
import { useHttp } from '../../utils/http'

/*
分页查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['alarm', cleanObject(params)], () => client(`alarm/list`, { method: "POST", body: JSON.stringify(params) }))
}

/* 告警统计 */
export const useStatistic = (params: any) => {
  const client = useHttp()
  return useQuery(['statistic', cleanObject(params)], () => client(`alarm/statistic/list`, { method: "POST", body: JSON.stringify(params) }))
}

/* 类型 */
export const useType = () => {
  const client = useHttp()
  return useQuery('type', () => client(`dictItem/list?index=1&size=100&typeId=002`, { method: "POST" }))
}
