import qs from 'qs'
import { useQuery } from 'react-query'
import { useHttp } from 'utils/http'
import { cleanObject } from "utils/index";
import { Search } from 'utils/typings';
import { useStatisticsContext } from 'views/statistics';

const getType = (type: number) => {
  switch (type) {
    /* case 1:
      return "遗忘" */
    case 2:
      return "漏带"

    case 3:
      return "漏点"

    case 4:
      return "遗漏"

    case 5:
      return "疫情"

    case 6:
      return "酒精"

    case 7:
      return "分离告警"

    /* case 8:
      return "离线告警" */

    /* case 9:
      return "过时告警" */

    /* case 10:
      return "低电告警" */

    case 11:
      return "血压"

    case 12:
      return "遗留"

    default:
      break;
  }
}

/*告警统计*/
export const useAlarmStatistics = (params: Partial<Search>) => {
  const client = useHttp()
  return useQuery(['AlarmStatistics', cleanObject(params)], async () => {
    const data = await client(`report/getWorkWarn?${qs.stringify(cleanObject(params))}`, { method: "POST" })
    if (data.data === null) {
      data.data = []
    }
    data.data.forEach((key: any) => {
      key["name"] = getType(key["type"])
    })
    return data
  },
    {
      enabled: Boolean(params.subwayId) && Boolean(params.time)
    }
  )
}

/*告警统计分页查询*/
export const useAlarmPagination = (params?: any) => {
  const client = useHttp()
  return useQuery(['AlarmPagination', cleanObject(params)], async () => {
    const data = await client(`report/getWorkWarnMore?${qs.stringify(cleanObject(params))}`, { method: "POST" })
    data.data.forEach((key: { [key: string]: unknown }, index: number) => {
      key["key"] = index
    })
    return data
  }, {
    enabled: Boolean(params.subwayId) && Boolean(params.time) && Boolean(params.type)
  }
  )
}

/*告警统计弹框*/
export const useAlarmModal = () => {
  const { visible, setVisible, param, setParam } = useStatisticsContext()
  const open = (subwayId: string, time: string, type: string) => {
    setParam({ subwayId, time, type })
    setVisible(true)
  }

  console.log(param);


  const close = () => {
    setParam({ subwayId: "", time: "", type: "" })
    setVisible(false)
  }

  return {
    ModalOpen: visible,
    open,
    close,
    param
  }
}
