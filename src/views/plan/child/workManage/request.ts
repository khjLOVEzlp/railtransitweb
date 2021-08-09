import qs from 'qs'
import { useQuery } from 'react-query'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { Search } from 'utils/typings';
import { WorkManage } from './typings';

/*
分页查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<WorkManage>(['planWork', cleanObject(params)], () => client(`planWork/historyList?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 查看详情 */
export const useHistoryDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['historyDetail', id], async () => {
    const data = await client(`planWork/getWeb/${id}`)
    data.data.webGroupList.forEach((key: any) => {
      key["personName"] = key["groupName"]
    })
    return data
  }, {
    enabled: Boolean(id)
  })
}