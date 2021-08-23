import qs from 'qs'
import { useQuery } from 'react-query'
import { useHttp } from 'utils/http'
import { cleanObject } from "utils/index";
import { Search } from 'utils/typings';
import { PersonMind } from './typings';
import { useStatisticsContext } from 'views/statistics';

/*精神分析统计*/
export const useMindStatistics = (params: Partial<Search>) => {
  const client = useHttp()
  return useQuery<PersonMind>(['MindStatistics', cleanObject(params)], async () => {
    const data = await client(`report/getPersonMind?${qs.stringify(cleanObject(params))}`, { method: "POST" })
    data.data.forEach((key: any) => {
      if (key["temRate"]) {
        key["temRate"] = key["temRate"].replace("%", "")
      } else {
        key["temRate"] = 0
      }
      if (key["alcRate"]) {
        key["alcRate"] = key["alcRate"].replace("%", "")
      } else {
        key["alcRate"] = 0
      }
      if (key["bloodRate"]) {
        key["bloodRate"] = key["bloodRate"].replace("%", "")
      } else {
        key["bloodRate"] = 0
      }
    })
    return data
  }, {
    enabled: Boolean(params?.subwayId) && Boolean(params?.time)
  }
  )
}

/*精神分析统计详情*/
export const useMindStatisticsDetail = (params?: any) => {
  const client = useHttp()
  return useQuery(['MindStatisticsDetail', cleanObject(params)], () =>
    client(`report/getPersonMindMore?${qs.stringify(cleanObject(params))}`, { method: "POST" }), {
    enabled: Boolean(params?.subwayId) && Boolean(params?.time)
  }
  )
}

/*精神分析弹框*/

export const useMindModal = () => {
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