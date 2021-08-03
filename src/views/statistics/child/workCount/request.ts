import qs from 'qs'
import { useQuery, useMutation } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Search } from 'utils/typings'

/* 所有地铁路线 */
export const useLineList = () => {
  const client = useHttp()
  return useQuery(['listLineAndPlatform'], () =>
    client(`line/listLineAndPlatform`, { method: "POST" }))
}

/*
日报
 */
export const useDay = (params: Partial<Search>) => {
  const client = useHttp()
  return useQuery(['getDay', cleanObject(params)], () =>
    client(`report/getDay?${qs.stringify(cleanObject(params))}`, { method: "POST" }), {
    enabled: Boolean(params.date) && Boolean(params.subwayId)
  })
}

/*
月报
 */
export const useMonth = (params: any) => {
  const client = useHttp()
  return useQuery(['getMonth', cleanObject(params)], () =>
    client(`report/getMonth?${qs.stringify(cleanObject(params))}`, { method: "POST" }), {
    enabled: Boolean(params.date) && Boolean(params.subwayId)
  })
}

/*
下载日报
*/
export const useDownloadDay = () => {
  const client = useHttp()
  return useMutation((params: any) =>
    client(`report/downloadDay?${qs.stringify(cleanObject(params))}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }))
}

/*
下载月报
*/
export const useDownloadMonth = () => {
  const client = useHttp()
  return useMutation((params: any) => client(`report/downloadMonth?${qs.stringify(cleanObject(params))}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }))
}