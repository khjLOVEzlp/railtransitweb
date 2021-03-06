import qs from 'qs'
import { useQuery } from 'react-query'
import { useHttp } from 'utils/http'
import { Search } from 'utils/typings'
import { Alarm } from './typings'

/*
分页查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Alarm>(['type', params], () => client(`planWork/getWorkWarn?${qs.stringify(params)}`, { method: "POST" }))
}

/* 统计各个类型告警个数 */
export const useWarnCount = (time: string) => {
  const client = useHttp()
  return useQuery(['alarm', time], async () => {
    const data = await client(`planWork/getWarnCount/${time}`)
    const newData = data.data.filter((key: { [key: string]: unknown }) => key.type != 9)
    data.data = newData
    return data
  })
}
