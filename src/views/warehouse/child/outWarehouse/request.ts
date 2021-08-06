import qs from 'qs'
import { useQuery } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'

/*
分页查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['warehouseOut', cleanObject(params)], () => client(`warehouseOut/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}
