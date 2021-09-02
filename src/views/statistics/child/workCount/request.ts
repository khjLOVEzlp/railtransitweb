import qs from 'qs'
import { useQuery, useMutation } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Search } from 'utils/typings'
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

/* 所有地铁路线 */
export const useLineList = () => {
  const client = useHttp()
  return useQuery(['listLineAndPlatform'], () =>
    client(`line/listLineAndPlatform`, { method: "POST" }))
}

/*
日报
 */
export const useDay = (params: Partial<Search>, value: number) => {
  const client = useHttp()
  return useQuery(['getDay', cleanObject(params)], async () => {
    const data = await client(`report/getDay?${qs.stringify(cleanObject(params))}`, { method: "POST" })
    if (data.data?.personDayVoList && data.data?.personDayVoList.length > 0) {
      data.data?.personDayVoList?.forEach((key: any, index: number) => {
        key["key"] = index
      })
    }

    if (data.data?.toolDayVoList && data.data?.toolDayVoList.length > 0) {
      data.data?.toolDayVoList.forEach((key: any, index: number) => {
        key["key"] = index
      })
    }

    return data
  }, {
    enabled: Boolean(params.date) && Boolean(params.subwayId) && value === 0
  })
}

/*
月报
 */
export const useMonth = (params: any, value: number) => {
  const client = useHttp()
  return useQuery(['getMonth', cleanObject(params)], async () => {
    const data = await client(`report/getMonth?${qs.stringify(cleanObject(params))}`, { method: "POST" })
    if (data.data?.personMonthVoList && data.data?.personMonthVoList.length > 0) {
      data.data?.personMonthVoList.forEach((key: any, index: number) => {
        key["key"] = index
      })
    }

    if (data.data?.toolMonthVoList && data.data?.toolMonthVoList.length > 0) {
      data.data?.toolMonthVoList.forEach((key: any, index: number) => {
        key["key"] = index
      })
    }
    return data
  }, {
    enabled: Boolean(params.date) && Boolean(params.subwayId) && value === 1
  })
}

/*
下载日报
*/
export const useDownloadDay = () => {
  const { user } = useAuth()
  return useMutation((params: any) => fetch(`${apiUrl}report/downloadDay?${qs.stringify(params)}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `${user?.jwtToken}`
    },
  }).then((res) => {
    return res.blob();
  }))
}

/*
下载月报
*/
export const useDownloadMonth = () => {
  const { user } = useAuth()
  return useMutation((params: any) => fetch(`${apiUrl}report/downloadMonth?${qs.stringify(params)}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `${user?.jwtToken}`
    },
  }).then((res) => {
    return res.blob();
  }))
}