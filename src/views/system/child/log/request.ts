import qs from 'qs'
import { useQuery } from 'react-query'
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';
import { search } from "types/search";
import { log } from "types/log";

/*
查询
 */
export const useInit = (params?: Partial<search>) => {
  const client = useHttp()
  return useQuery<log>(['log', cleanObject(params)], () =>
    client(`log/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}