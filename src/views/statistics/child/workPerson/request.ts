import qs from 'qs'
import { useQuery } from 'react-query'
import { useHttp } from 'utils/http'
import { cleanObject } from "utils/index";
import { Search } from 'utils/typings';
import { useStatisticsContext } from 'views/statistics';

/*到岗统计*/
export const useWorkStatistics = (params: Partial<Search>) => {
  const client = useHttp()
  return useQuery(['WorkStatistics', cleanObject(params)], async () => {
    const data = await client(`report/getPersonWork?${qs.stringify(cleanObject(params))}`, { method: "POST" })
    if (data.data === null) {
      data.data = []
    }

    data.data.forEach((item: { [item: string]: any }) => {
      item["dutyRate"] = parseFloat(item["dutyRate"])
    })

    return data
  },
    {
      enabled: Boolean(params.subwayId) && Boolean(params.time)
    }
  )
}

/*到岗详情*/
export const useWorkStatisticsDetail = (params?: any) => {
  const client = useHttp()
  return useQuery(['WorkStatisticsDetail', cleanObject(params)], () =>
    client(`report/getPersonWorkMore?${qs.stringify(cleanObject(params))}`, { method: "POST" }), {
    enabled: Boolean(params.subwayId) && Boolean(params.time)
  }
  )
}

/*到岗统计弹框*/
export const useWorkModal = () => {
  const { visible, setVisible, setParam } = useStatisticsContext()
  const open = (subwayId: string, time: string) => {
    setParam({ subwayId, time })
    setVisible(true)
  }

  const close = () => {
    setParam({ subwayId: "", time: "" })
    setVisible(false)
  }

  return {
    ModalOpen: visible === true,
    open,
    close
  }
}
