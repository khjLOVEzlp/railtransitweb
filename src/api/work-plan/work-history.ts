import qs from 'qs'
import { useQuery } from 'react-query'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { Search } from 'utils/typings';
const baseUrl = process.env["REACT_APP_API_URL"]
/*
分页查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<any>(['planWork', cleanObject(params)], () => client(`planWork/historyList?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 查看详情 */
export const useHistoryDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['historyDetail', id], async () => {
    // const data = await client(`planWork/getWeb/1`)
    const data = await client(`planWork/getWeb/${id}`)
    data.data.webGroupList.forEach((key: any) => {
      key["personName"] = key["groupName"]
    })
    data.data.documentList.forEach((key: any) => {
      key["name"] = key["documentName"]
      key["url"] = `${baseUrl}file/download/` + key["documentId"]
    })
    return data
  }, {
    enabled: Boolean(id)
  })
}