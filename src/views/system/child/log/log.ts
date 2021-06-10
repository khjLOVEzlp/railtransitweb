import qs from 'qs'
import { useQuery } from 'react-query'
import { cleanObject } from '../../../../utils'
import { useHttp } from '../../../../utils/http'

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['log', cleanObject(params)], () => client(`log/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}