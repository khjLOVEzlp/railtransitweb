import { useQuery } from "react-query"
import { useHttp } from "utils/http"

/* 首页地铁路线 */
export const useLine = () => {
    const client = useHttp()
    return useQuery(['lineAll'], async () => {
      const data = await client(`line/getIndex`, { method: "POST" })
      data.data = data.data.filter((key: { [key: string]: unknown }) => key.status === 1)
      return data
    })
  }

  // 查询对应城市的地铁路线站点
  export const useSubwayList = () => {
    const client = useHttp()
    return useQuery(['subwayList'], async () => client(`subway/list`, { method: "POST" }))
  }