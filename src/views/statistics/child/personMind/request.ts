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
    if (data.data && data.data.length > 0) {
      data.data.forEach((key: { [key: string]: any }) => {
        key["体温异常率"] = key["temRate"].replace("%", "")
        key["血压异常率"] = key["bloodRate"].replace("%", "")
        key["酒精异常率"] = key["alcRate"].replace("%", "")
      })
    }
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
  const { visible, setVisible, setParam, param } = useStatisticsContext()
  const open = (subwayId: string, time: string) => {
    setParam({ ...param, subwayId, time })
    setVisible(true)
  }

  const close = () => {
    setParam({ ...param, subwayId: "", time: "" })
    setVisible(false)
  }

  return {
    ModalOpen: visible === true,
    open,
    close
  }
}