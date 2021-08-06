import qs from 'qs'
import { useQuery } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Search } from 'utils/typings';
import { Spirit } from './typings';

/*
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Spirit>(['record/list', cleanObject(params)], () => client(`record/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}
